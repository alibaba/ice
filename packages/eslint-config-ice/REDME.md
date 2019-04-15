# eslint-config-ice

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for the [Airbnb JavaScript style guide (ES2015+ version)](https://github.com/airbnb/javascript)

## Installation

```
$ npm install eslint-config-ice --save-dev
```

## Usage

Once the `eslint-config-ice` package is installed, you can use it by specifying `ice` in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring).

create a file named `.eslintrc` in your project:

```js
{
  "extends": "ice",
  "rules": {
    // Additional, per-project rules...
  }
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
