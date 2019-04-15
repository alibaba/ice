# iceworks client

## Quick Start

Runs the app in development mode.
Open http://localhost:4444 to view it in the browser.

```bash
cd iceworks-client
npm start
```

When you’re ready to deploy to production, create a minified bundle with `npm run build`. Builds the app for production to the `build` folder.

```bash
npm run build
```

## What’s Included

Your environment will have everything you need to build a modern single-page React app:

- React, JSX and ES6 syntax support.
- CSS Modules syntax Support.
- react-intl
- react-router-dom@5.0.0
- socket.io-client
- etc

## Project Structure

At this point, your project structure should look like the following:

```
/
├─ public/
├─ src/
│  ├─ components/
│  ├─ layouts/
│  ├─ pages/
│  ├─ index.js
│  ├─ menuConfig.js
│  └─ routerConfig.js
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc
├─ .gitignore
├─ .webpackrc.js
├─ package.json
└─ README.md
```

Of note:

- `public`: contains static assets like the HTML page we're planning to deploy to, or images. You can delete any file in this folder apart from index.html.
- `components`: contains the react components of our project.
- `layouts`: contains the layout of our project.
- `pages`: contains the pages of our project.
- `index.js`: the entry-point for our file.
- `menuConfig.js`: contains the configuration menu of our project.
- `routerConfig.js`: contains the configuration router of our project.
- `package.json`: contains our dependencies, as well as some shortcuts for commands we'd like to run for testing, previewing, and deploying our app.

## License

[MIT](https://github.com/alibaba/ice/blob/master/LICENSE)
