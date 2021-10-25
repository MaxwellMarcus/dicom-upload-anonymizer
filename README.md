# Dependencies

NodeJS (and NPM) - https://nodejs.org/en/download/

# Available Scripts

## Install app dependencies

### `npm install`

This should install necessary app dependencies as well as packages used for
development, testing, etc.

### `npm start`

BUT FIRST: Set your xnat domain, username and password in .env.development.local file
Runs the app in the development mode.\
Should open [http://127.0.0.1:3000](http://localhost:3000) automatically in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# `Dev Notes`

Stack - React (with hooks) & TypeScript

Main library dependecies:

- react-dropzone - https://react-dropzone.js.org/
- react-pdf - https://react-pdf.org/

Upload.tsx - utilizes a Dedicated worker (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), the worker code is contained in dedicated.worker.js. The _worker_ keyword is explicitly referenced in config-overrides.js. React-pdf also uses ( or pretends to use) a dedicated worker.

Husky pre-commit hook: .husky folder > pre-commiit file - runs cli commands before git commit initializes. Currently runs all tests and ensures they are passing, and then will run lint-staged (which lists its own commands to run - currently enforces formatting consistency via prettier) referenced in package.json.
