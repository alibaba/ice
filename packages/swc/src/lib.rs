#![recursion_limit = "2048"]
//#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
extern crate lazy_static;
/// Explicit extern crate to use allocator.
extern crate swc_node_base;

use backtrace::Backtrace;
use lazy_static::lazy_static;
use napi::{CallContext, Env, JsObject, JsUndefined};
use serde::Deserialize;
use std::{env, panic::set_hook, sync::Arc};
use swc::{Compiler, TransformOutput};
use swc_common::{self, chain, pass::Optional, sync::Lazy, FileName, FilePathMapping, SourceMap};
use swc_ecmascript::transforms::pass::noop;
use swc_ecmascript::visit::Fold;

use crate::remove_multiple_ends_code::{
    remove_multiple_ends_code, RemoveMultipleEndsCodeConfig,
};

pub mod minify;
pub mod remove_multiple_ends_code;
pub mod transform;
mod util;

#[derive(Debug, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct TransformOptions {
    #[serde(flatten)]
    pub swc: swc::config::Options,
    #[serde(default)]
    pub remove_multiple_ends_code: RemoveMultipleEndsCodeConfig,
}

pub fn custom_before_pass(name: &FileName, options: &TransformOptions) -> impl Fold {
    let mut remove_multiple_ends_code_options = RemoveMultipleEndsCodeConfig::Bool(false);
    let enable_remove_multiple_ends_code: bool = match options.remove_multiple_ends_code.clone() {
        RemoveMultipleEndsCodeConfig::RemoveMultipleEndsCode { platform } => {
            remove_multiple_ends_code_options = RemoveMultipleEndsCodeConfig::RemoveMultipleEndsCode { platform };
            true
        }
        RemoveMultipleEndsCodeConfig::Bool(val) => {
            val
        },
    };

    // custom before pass
    chain!(
        Optional::new(
            remove_multiple_ends_code(remove_multiple_ends_code_options),
            enable_remove_multiple_ends_code
        ),
        noop()
    )
}

static COMPILER: Lazy<Arc<Compiler>> = Lazy::new(|| {
    let cm = Arc::new(SourceMap::new(FilePathMapping::empty()));

    Arc::new(Compiler::new(cm.clone()))
});

#[module_exports]
fn init(mut exports: JsObject) -> napi::Result<()> {
    if cfg!(debug_assertions) || env::var("SWC_DEBUG").unwrap_or_default() == "1" {
        set_hook(Box::new(|panic_info| {
            let backtrace = Backtrace::new();
            println!("Panic: {:?}\nBacktrace: {:?}", panic_info, backtrace);
        }));
    }

    exports.create_named_method("transform", transform::transform)?;
    exports.create_named_method("transformSync", transform::transform_sync)?;
    exports.create_named_method("minify", minify::minify)?;
    exports.create_named_method("minifySync", minify::minify_sync)?;

    Ok(())
}

fn get_compiler(_ctx: &CallContext) -> Arc<Compiler> {
    COMPILER.clone()
}

#[js_function]
fn construct_compiler(ctx: CallContext) -> napi::Result<JsUndefined> {
    // TODO: Assign swc::Compiler
    ctx.env.get_undefined()
}

pub fn complete_output(env: &Env, output: TransformOutput) -> napi::Result<JsObject> {
    env.to_js_value(&output)?.coerce_to_object()
}

pub type ArcCompiler = Arc<Compiler>;
