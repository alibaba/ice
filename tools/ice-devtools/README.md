# ice-devtools

Creates a materials application using the command line, is the Standard Tooling for ICE material Development.

## Installation

Prerequisites: Node.js (>=8.x), npm version 5+.

```bash
$ npm i ice-devtools -g
```

## Quick Start

```bash
$ mkdir my-materials && cd my-materials
$ ice-devtools init
```

It will create a directory called my-materials inside the current folder.

Inside that directory, it will generate the initial project structure:

```
my-materials/
    │
    ├── blocks
    │      └── Greeting
    │
    ├── scaffolds
    │      └── lite
    │
    ├── .editorconfig
    ├── .eslintignore
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── LICENSE
    ├── README.md
    └── package.json
```

No configuration or complicated folder structures, just the files you need to build your materials app.

Inside the newly created project, you can run some built-in commands:

```
$ npm run deploy //  equal to： ice-devtools generate && ice-devtools sync
```

It will be automatically generate materials JSON data in build folder，The build folder is ready to be deployed，return a material source interface.

## Add Materilas

You can add materials, including blocks and templates：

```
$ ice-devtools add
```

## Documentation

Docs are available at [intro-materials](https://alibaba.github.io/ice/docs/materials/intro-materials) - we are still working on refining it and contributions are welcome!

## License

MIT
