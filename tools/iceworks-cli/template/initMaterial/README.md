# Custom ICE Materials

[Docs](https://ice.work/docs/materials/about).

## Install iceworks

```bash
$ npm i -g iceworks
$ iceworks --help
```

## Install Deps

```bash
$ npm install
```

## Develop materials

```bash
# block
$ cd blocks/ExampleBlock
$ npm install
$ npm run start

# component
$ cd blocks/ExampleBlock
$ npm install
$ npm run start
```

## Add new material

```bash
$ iceworks add  # select block|component|scaffold
```

## Generate materials data

```bash
$ iceworks generate
```

## Publish materials data

```bash
# sync to fusion material center
$ iceworks sync
```

## Use materials in iceworks

Add the materials data url to iceworks.
