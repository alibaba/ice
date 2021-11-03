use builder_swc::{
    amp_attributes::amp_attributes
};
use std::path::PathBuf;
use swc_ecma_transforms_testing::{test, test_fixture};
use swc_ecmascript::{
    parser::{EsConfig, Syntax},
};
use testing::fixture;

fn syntax() -> Syntax {
    Syntax::Es(EsConfig {
        jsx: true,
        dynamic_import: true,
        ..Default::default()
    })
}

#[fixture("tests/fixture/amp/**/input.js")]
fn amp_attributes_fixture(input: PathBuf) {
    let output = input.parent().unwrap().join("output.js");
    test_fixture(syntax(), &|_tr| amp_attributes(), &input, &output);
}
