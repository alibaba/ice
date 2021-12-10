use builder_swc::keep_platform::{keep_platform, KeepPlatformConfig};
use std::path::PathBuf;
use swc_ecma_transforms_testing::{test, test_fixture};
use swc_ecmascript::parser::{EsConfig, Syntax};
use testing::fixture;

fn unminify_syntax() -> Syntax {
    Syntax::Es(EsConfig {
        ..Default::default()
    })
}

#[fixture("tests/fixture/keep_platform/web/input.js")]
fn transform_web_flag_fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    let config = KeepPlatformConfig::KeepPlatform(String::from("web"));
    test_fixture(
        unminify_syntax(),
        &|_tr| keep_platform(config.clone()),
        &input,
        &output,
    );
}

#[fixture("tests/fixture/keep_platform/kraken/input.js")]
fn transform_kraken_flag_fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    let config = KeepPlatformConfig::KeepPlatform(String::from("kraken"));
    test_fixture(
        unminify_syntax(),
        &|_tr| keep_platform(config.clone()),
        &input,
        &output,
    );
}
