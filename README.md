# Puente React

![](https://img.shields.io/badge/build-success-brightgreen.svg)

Puente React is a web dashboard used to visualize data collected on the ground in developing countries. It's still an early prototype and it's still under development. 

For a live demo, please check out [here](https://puente-dashboard.herokuapp.com/)

![screencap](public/tour_high.gif)
## Project Layout
| Key Folder | Parent Folder | Description |
| - | - | - |
| providers | src/js | Holds the modules for retrieving data and custom functions | 
| pages | src/js | Holds the main layout folders for content | 
| components | src/js | Holds the smaller components that are within layouts | 


## Scripts

### `npm install`

Installs the packages inside the `package.json`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Known Issues
- Initial loading crash (but works after you press refresh once the `Application Error` shows)
- Performance

## Resources

[CSS Boxes](https://www.bypeople.com/css-boxes/)
[Flexbox](http://flexbox.buildwithreact.com/)
[React Router](https://reacttraining.com/react-router/web/example/basic)
