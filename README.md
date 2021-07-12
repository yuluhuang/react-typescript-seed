This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 
1. ts 版本
2. node > 12




{
"name": "my-app",
"version": "0.1.0",
"private": true,
"dependencies": {
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10",
"@types/webpack": "^5.28.0",
"@types/webpack-env": "^1.16.2",
"antd": "^4.16.6",
"axios": "^0.21.1",
"classnames": "^2.2.6",
"qs": "^6.9.4",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-loadable": "^5.5.0",
"react-redux": "^7.2.4",
"react-router": "^5.2.0",
"react-router-dom": "^5.2.0",
"react-scripts": "4.0.3",
"redux": "^4.1.0",
"redux-actions": "^2.6.5",
"redux-thunk": "^2.3.0",
"webpack": "^5.42.0",
"webpack-cli": "3.3",
"webpack-dev-server": "^3.11.2"
},
"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "cross-env NODE_ENV=dev webpack-dev-server --mode development  --inline --hot --progress --config build/webpack.dev.conf.js  --host localhost  --open",
"start": "npm run dev",
"build": "cross-env NODE_ENV=production node build/build.js",
"build-pt": "cross-env NODE_ENV=pretest node build/build.js",
"build-test": "cross-env NODE_ENV=test node build/build.js"
},
"eslintConfig": {
"extends": "react-app"
},
"engines": {
"node": ">= 12.0.0",
"npm": ">= 3.0.0"
},
"browserslist": {
"production": [
">0.2%",
"not dead",
"not op_mini all"
],
"development": [
"last 1 chrome version",
"last 1 firefox version",
"last 1 safari version"
]
},
"devDependencies": {
"@babel/core": "^7.14.6",
"@babel/plugin-proposal-decorators": "^7.14.5",
"@babel/plugin-transform-typescript": "^7.14.6",
"@hot-loader/react-dom": "^17.0.1+4.13.0",
"@types/classnames": "^2.2.10",
"@types/history": "^4.7.3",
"@types/jest": "^24.0.0",
"@types/node": "^12.0.0",
"@types/qs": "^6.9.4",
"@types/react": "^16.9.0",
"@types/react-dom": "^16.9.0",
"@types/react-loadable": "^5.5.5",
"@types/react-redux": "^7.1.9",
"@types/react-router": "^5.1.8",
"@types/react-router-dom": "^5.1.5",
"@types/redux-actions": "^2.6.1",
"@types/redux-logger": "^3.0.8",
"babel-loader": "^8.2.2",
"babel-plugin-import": "^1.13.3",
"babel-plugin-transform-decorators-legacy": "^1.3.5",
"babel-preset-es2015": "^6.24.1",
"cache-loader": "^4.1.0",
"clean-webpack-plugin": "^3.0.0",
"copy-webpack-plugin": "^6.1.0",
"cross-env": "^7.0.2",
"css-loader": "^3.4.2",
"eslint-config-airbnb": "^18.2.0",
"eslint-friendly-formatter": "^4.0.1",
"eslint-loader": "^4.0.2",
"extract-text-webpack-plugin": "^4.0.0-beta.0",
"file-loader": "^6.0.0",
"friendly-errors-webpack-plugin": "^1.7.0",
"gh-pages": "^2.1.1",
"hard-source-webpack-plugin": "^0.13.1",
"html-loader": "^1.1.0",
"html-webpack-plugin": "^4.0.0-beta.11",
"less": "^3.12.2",
"less-loader": "^7.0.1",
"mini-css-extract-plugin": "^0.9.0",
"optimize-css-assets-webpack-plugin": "^5.0.4",
"postcss": "^7.0.25",
"postcss-browser-reporter": "^0.6.0",
"postcss-import": "^12.0.1",
"postcss-loader": "^3.0.0",
"postcss-preset-env": "^6.7.0",
"postcss-reporter": "^6.0.1",
"postcss-url": "^8.0.0",
"prettier": "^2.0.2",
"react-hot-loader": "^4.13.0",
"redux-devtools-extension": "^2.13.9",
"redux-logger": "^3.0.6",
"shelljs": "^0.8.4",
"style-loader": "^1.1.3",
"thread-loader": "^2.1.3",
"ts-loader": "^9.2.3",
"typescript": "^4.3.5",
"uglifyjs-webpack-plugin": "^2.2.0",
"url-loader": "^4.1.1",
"vconsole": "^3.8.1",
"webpack-bundle-analyzer": "^3.8.0",
"webpack-merge": "^5.8.0",
"webpack-shell-plugin": "^0.5.0",
"webpack-zip-plugin": "^0.1.6"
}
}
