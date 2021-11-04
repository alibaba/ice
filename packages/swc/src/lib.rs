#![recursion_limit = "2048"]
//#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
/// Explicit extern crate to use allocator.
extern crate swc_node_base;

use backtrace::Backtrace;
use napi::{CallContext, Env, JsObject, JsUndefined};
use std::{env, panic::set_hook, sync::Arc};
use swc::{Compiler, TransformOutput};
use swc_common::{self, chain, pass::Optional, sync::Lazy, FileName, FilePathMapping, SourceMap};
use swc_ecmascript::transforms::pass::noop;
use swc_ecmascript::visit::Fold;

pub mod amp_attributes;
pub mod minify;
pub mod transform;
mod util;

pub fn custom_before_pass(name: &FileName) -> impl Fold {
    // custom before pass
    noop()
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
