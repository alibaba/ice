use builder_swc::remove_multiple_ends_code::{remove_multiple_ends_code, RemoveMutipleEndsCode};
use std::path::PathBuf;
use swc_ecma_transforms_testing::{test, test_fixture};
use swc_ecmascript::parser::{EsConfig, Syntax};
use testing::fixture;

fn syntax() -> Syntax {
    Syntax::Es(EsConfig {
        jsx: true,
        dynamic_import: true,
        ..Default::default()
    })
}

#[fixture("tests/fixture/remove_multiple_ends_code/**/input.js")]
fn amp_attributes_fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    let config = RemoveMutipleEndsCode {
        platforms: vec![String::from("web")],
    };
    test_fixture(
        syntax(),
        &|_tr| remove_multiple_ends_code(config.clone()),
        &input,
        &output,
    );
}
