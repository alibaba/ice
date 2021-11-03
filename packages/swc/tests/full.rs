use builder_swc::{
  custom_before_pass,
  transform::TransformOptions
};
use serde::de::DeserializeOwned;
use std::path::{Path, PathBuf};
use swc::Compiler;
use swc_ecmascript::{
    parser::{Syntax, TsConfig},
    transforms::pass::noop,
};
use testing::{NormalizedOutput, Tester,fixture};

#[fixture("tests/full/**/input.js")]
fn full(input: PathBuf) {
    test(&input, true);
}

#[fixture("tests/loader/**/input.js")]
fn loader(input: PathBuf) {
    test(&input, false);
}

fn test(input: &Path, minify: bool) {
    let output = input.parent().unwrap().join("output.js");

    Tester::new()
        .print_errors(|cm, handler| {
            let c = Compiler::new(cm.clone());

            let fm = cm.load_file(input).expect("failed to load file");

            let options = TransformOptions {
                swc: swc::config::Options {
                    swcrc: true,
                    is_module: true,
                    output_path: Some(output.to_path_buf()),

                    config: swc::config::Config {
                        jsc: swc::config::JscConfig {
                            minify: if minify {
                                Some(assert_json("{ \"compress\": true, \"mangle\": true }"))
                            } else {
                                None
                            },
                            syntax: Some(Syntax::Typescript(TsConfig {
                                tsx: true,
                                dynamic_import: true,
                                ..Default::default()
                            })),
                            ..Default::default()
                        },
                        minify: minify,
                        ..Default::default()
                    },
                    ..Default::default()
                }
            };

            match c.process_js_with_custom_pass(
                fm.clone(),
                &handler,
                &options.swc,
                custom_before_pass(&fm.name),
                noop(),
            ) {
                Ok(v) => {
                    NormalizedOutput::from(v.code)
                        .compare_to_file(output)
                        .unwrap();
                }
                Err(err) => panic!("Error: {:?}", err),
            };

            Ok(())
        })
        .map(|_| ())
        .expect("failed");
}

/// Using this, we don't have to break code by adding field.s
fn assert_json<T>(json_str: &str) -> T
where
    T: DeserializeOwned,
{
    serde_json::from_str(json_str).expect("failed to deserialize")
}
