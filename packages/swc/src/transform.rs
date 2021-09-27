use crate::{
  complete_output, get_compiler,
  util::{CtxtExt, MapErr},
};
use anyhow::{bail, Error};
use napi::{CallContext, Env, JsBoolean, JsObject, JsString, Task};
use std::sync::Arc;
use swc::config::{BuiltConfig, Options};
use swc::{Compiler, TransformOutput};
use swc_common::{comments::Comment, BytePos, FileName, SourceFile, errors::{ Handler, ColorConfig }};
use swc_ecmascript::ast::Program;
use swc_ecmascript::transforms::helpers::{self, Helpers};
use swc_ecmascript::utils::HANDLER;
use swc_ecmascript::visit::FoldWith;

/// Input to transform
#[derive(Debug)]
pub enum Input {
  /// json string
  Program(String),
  /// Raw source code.
  Source(Arc<SourceFile>),
}

pub struct TransformTask {
  pub c: Arc<Compiler>,
  pub input: Input,
  pub options: Options,
}

impl Task for TransformTask {
  type Output = TransformOutput;
  type JsValue = JsObject;

  fn compute(&mut self) -> napi::Result<Self::Output> {
      let handler = Arc::new(Handler::with_tty_emitter(
        ColorConfig::Always,
        true,
        false,
        Some((&self).c.cm.clone()),
      ));
      self.c
          .run(|| match self.input {
              Input::Program(ref s) => {
                  let program: Program =
                      serde_json::from_str(&s).expect("failed to deserialize Program");
                  // TODO: Source map
                  self.c.process_js(&handler, program, &self.options)
              }

              Input::Source(ref s) => process_js_custom(&self.c, &handler, s.clone(), &self.options),
          })
          .convert_err()
  }

  fn resolve(self, env: Env, result: Self::Output) -> napi::Result<Self::JsValue> {
      complete_output(&env, result)
  }
}

/// returns `compiler, (src / path), options, plugin, callback`
pub fn schedule_transform<F>(cx: CallContext, op: F) -> napi::Result<JsObject>
where
  F: FnOnce(&Arc<Compiler>, String, bool, Options) -> TransformTask,
{
  let c = get_compiler(&cx);

  let s = cx.get::<JsString>(0)?.into_utf8()?.as_str()?.to_owned();
  let is_module = cx.get::<JsBoolean>(1)?;
  let options: Options = cx.get_deserialized(2)?;

  let task = op(&c, s, is_module.get_value()?, options);

  cx.env.spawn(task).map(|t| t.promise_object())
}

pub fn exec_transform<F>(cx: CallContext, op: F) -> napi::Result<JsObject>
where
  F: FnOnce(&Compiler, String, &Options) -> Result<Arc<SourceFile>, Error>,
{
  let c = get_compiler(&cx);

  let handler = Arc::new(Handler::with_tty_emitter(
    ColorConfig::Always,
    true,
    false,
    Some(c.cm.clone()),
  ));

  let s = cx.get::<JsString>(0)?.into_utf8()?;
  let is_module = cx.get::<JsBoolean>(1)?;
  let options: Options = cx.get_deserialized(2)?;

  let output = c.run(|| -> napi::Result<_> {
      if is_module.get_value()? {
          let program: Program =
              serde_json::from_str(s.as_str()?).expect("failed to deserialize Program");
          c.process_js(&handler, program, &options).convert_err()
      } else {
          let fm = op(&c, s.as_str()?.to_string(), &options).expect("failed to create fm");
          c.process_js_file(fm, &handler, &options).convert_err()
      }
  })?;

  complete_output(cx.env, output)
}

#[js_function(4)]
pub fn transform(cx: CallContext) -> napi::Result<JsObject> {
  schedule_transform(cx, |c, src, is_module, options| {
      let input = if is_module {
          Input::Program(src)
      } else {
          Input::Source(c.cm.new_source_file(
              if options.filename.is_empty() {
                  FileName::Anon
              } else {
                  FileName::Real(options.filename.clone().into())
              },
              src,
          ))
      };

      TransformTask {
          c: c.clone(),
          input,
          options,
      }
  })
}

#[js_function(4)]
pub fn transform_sync(cx: CallContext) -> napi::Result<JsObject> {
  exec_transform(cx, |c, src, options| {
      Ok(c.cm.new_source_file(
          if options.filename.is_empty() {
              FileName::Anon
          } else {
              FileName::Real(options.filename.clone().into())
          },
          src,
      ))
  })
}

fn process_js_custom(
  compiler: &Arc<Compiler>,
  handler: &Arc<Handler>,
  source: Arc<SourceFile>,
  options: &Options,
) -> Result<TransformOutput, Error> {
  let config = compiler.run(|| compiler.config_for_file(&handler, options, &source.name))?;
  let config = match config {
      Some(v) => v,
      None => {
          bail!("cannot process file because it's ignored by .swcrc")
      }
  };
  let config = BuiltConfig {
      pass: config.pass,
      syntax: config.syntax,
      target: config.target,
      minify: config.minify,
      external_helpers: config.external_helpers,
      source_maps: config.source_maps,
      input_source_map: config.input_source_map,
      is_module: config.is_module,
      output_path: config.output_path,
      source_file_name: config.source_file_name,
      preserve_comments: config.preserve_comments,
  };

  //let orig = compiler.get_orig_src_map(&source,
  // &options.config.input_source_map)?;
  let program = compiler.parse_js(
      source.clone(),
      &handler,
      config.target,
      config.syntax,
      config.is_module,
      true,
  )?;

  //compiler.process_js_inner(program, orig.as_ref(), config)

  compiler.run(|| {
      if config.minify {
          let preserve_excl = |_: &BytePos, vc: &mut Vec<Comment>| -> bool {
              vc.retain(|c: &Comment| c.text.starts_with("!"));
              !vc.is_empty()
          };
          compiler.comments().leading.retain(preserve_excl);
          compiler.comments().trailing.retain(preserve_excl);
      }
      let mut pass = config.pass;
      let program = helpers::HELPERS.set(&Helpers::new(config.external_helpers), || {
          HANDLER.set(&handler, || {
              // Fold module
              program.fold_with(&mut pass)
          })
      });

      compiler.print(
          &program,
          None,
          config.output_path,
          config.target,
          config.source_maps,
          &[], // TODO: figure out sourcemaps
          None,
          config.minify,
          config.preserve_comments
      )
  })
}
