# React-Redux boilerplate
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

TypeScript template.

## Included

### Packages:
react, react-dom (as npx create-react-app [app-name] --template typescript),
redux, react-redux,
redux-logger,
redux-thunk,
@types/react-redux",
fs-extra (just for `npm run cpbuild`)

### Proxy

### App structure
actions, assets(like imgs), commmon(consts, common types and e.t.c.), components, reducers, store (configured store with logger for dev, 'thunk' and root reducer)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

### `npm run cpbuild`

Copying "build" to cleaned server's "public"
