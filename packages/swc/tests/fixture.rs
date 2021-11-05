use builder_swc::remove_multiple_ends_code::{remove_multiple_ends_code, RemoveMultipleEndsCode};
use std::path::PathBuf;
use swc_ecma_transforms_testing::{test, test_fixture};
use swc_ecmascript::parser::{EsConfig, Syntax};
use testing::fixture;

fn unminify_syntax() -> Syntax {
    Syntax::Es(EsConfig {
        ..Default::default()
    })
}

#[fixture("tests/fixture/remove_mutilple_ends_code/web/input.js")]
fn transform_web_flag_fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    let config = RemoveMultipleEndsCode {
        platform: String::from("web"),
    };
    test_fixture(
        unminify_syntax(),
        &|_tr| remove_multiple_ends_code(config.clone()),
        &input,
        &output,
    );
}

#[fixture("tests/fixture/remove_mutilple_ends_code/kraken/input.js")]
fn transform_kraken_flag_fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    let config = RemoveMultipleEndsCode {
        platform: String::from("kraken"),
    };
    test_fixture(
        unminify_syntax(),
        &|_tr| remove_multiple_ends_code(config.clone()),
        &input,
        &output,
    );
}
