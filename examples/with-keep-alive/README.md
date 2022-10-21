# with-keep-alive

Experimental keep-alive with React 18 `<Offscreen />`.

## How to debug

First of all, publish the package to the yalc repo.

```bash
$ cd packages/ice && yalc publish --push

$ cd packages/runtime && yalc publish --push
```

Then, install the example dependencies.

```bash
$ cd examples/with-keep-alive && yarn install

$ yalc add @ice/app @ice/runtime

$ npm run start
```
