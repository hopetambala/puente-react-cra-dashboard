# Puente React

[![Build Status](https://travis-ci.org/hopetambala/puente-react-dashboard.svg?branch=master)](https://travis-ci.org/hopetambala/puente-react-dashboard)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/505de309137b4acabb8def858cf7a6e8)](https://www.codacy.com/app/hopetambala/puente-react-dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hopetambala/puente-react-dashboard&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/hopetambala/puente-react-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/hopetambala/puente-react-dashboard)
![](https://img.shields.io/badge/react-✓-blue.svg)
![](https://img.shields.io/badge/apollo_server-✓-blueviolet.svg)
![](https://img.shields.io/badge/parse_server-✓-blueviolet.svg)

Puente React is a web dashboard used to visualize data collected on the ground in developing countries. It's still an early prototype and it's still under development. 

For more details, please see our [blog website](https://puente-dr.com) to see how we build technology to equip the resource-challenged.

For a live demo, please check out [here](https://puente-dashboard.herokuapp.com/) 

![screencap](public/tour_high.gif)

## Project Layout
| Key Folder | Parent Folder | Description |
| - | - | - |
| providers | src/js | Holds the modules for retrieving data and custom functions | 
| pages | src/js | Holds the main layout folders for content | 
| components | src/js | Holds the smaller components that are within layouts | 


## Development

This project is built with [ReactJS](https://reactjs.org), [Redux](https://redux.js.org/), and [Apollo's GraphQL](https://www.apollographql.com/docs/). The visualizations are built using [Recharts](http://recharts.org/).

This project is a bootstrapped using [create-react-app](https://github.com/facebook/create-react-app).

Here are some quick commands to get started:

- `npm install`: Install Node dependencies
- `npm start`: Start the hot reloading development server.
- `npm test`: Run the test suit and watch for changes.
- `npm build`: Build a production optimized bundle of the app.
- `npm lint`: Run the ESLinter.

# Known Issues
- Performance with Graphql

## Resources

- [CSS Boxes](https://www.bypeople.com/css-boxes/)
- [Flexbox](http://flexbox.buildwithreact.com/)
- [React Router](https://reacttraining.com/react-router/web/example/basic)

## Standards
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

