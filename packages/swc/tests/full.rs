use builder_swc::keep_platform::KeepPlatformConfig;
use builder_swc::{custom_before_pass, TransformOptions};
use serde::de::DeserializeOwned;
use std::path::{Path, PathBuf};
use swc::config::{OptimizerConfig, TransformConfig};
use swc::Compiler;
use swc_ecmascript::{
    parser::{Syntax, TsConfig},
    transforms::pass::noop,
};
use testing::{fixture, NormalizedOutput, Tester};

#[fixture("tests/minify/base_syntax/input.js")]
fn base_minify(input: PathBuf) {
    test(&input, true, "".to_string());
}

#[fixture("tests/minify/remove_platform_code/web/input.js")]
fn save_web_code(input: PathBuf) {
    test(&input, true, "web".to_string());
}

#[fixture("tests/minify/remove_platform_code/kraken/input.js")]
fn save_kraken_code(input: PathBuf) {
    test(&input, true, "kraken".to_string());
}

#[fixture("tests/unminify/**/input.js")]
fn unminify(input: PathBuf) {
    test(&input, false, "".to_string());
}

fn test(input: &Path, minify: bool, platform: String) {
    let output = input.parent().unwrap().join("output.js");

    let keep_platform: KeepPlatformConfig;

    if platform == "" {
        keep_platform = KeepPlatformConfig::Bool(false);
    } else {
        keep_platform = KeepPlatformConfig::KeepPlatform(platform);
    }

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
                                Some(assert_json(
                                    "{ \"compress\": { \"dead_code\": true }, \"mangle\": true }",
                                ))
                            } else {
                                None
                            },
                            syntax: Some(Syntax::Typescript(TsConfig {
                                tsx: true,
                                dynamic_import: true,
                                ..Default::default()
                            })),
                            transform: Some(TransformConfig {
                                optimizer: Some(OptimizerConfig {
                                    simplify: minify,
                                    ..Default::default()
                                }),
                                ..Default::default()
                            }),
                            ..Default::default()
                        },
                        minify: minify,
                        ..Default::default()
                    },
                    ..Default::default()
                },
                keep_platform: keep_platform,
                ..Default::default()
            };

            match c.process_js_with_custom_pass(
                fm.clone(),
                &handler,
                &options.swc,
                custom_before_pass(&fm.name, &options),
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
