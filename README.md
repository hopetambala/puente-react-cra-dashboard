# Puente React Dashboard

[![Build Status](https://travis-ci.com/hopetambala/puente-react-dashboard.svg?branch=master)](https://travis-ci.com/hopetambala/puente-react-dashboard)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/505de309137b4acabb8def858cf7a6e8)](https://www.codacy.com/app/hopetambala/puente-react-dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hopetambala/puente-react-dashboard&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/hopetambala/puente-react-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/hopetambala/puente-react-dashboard)
![](https://img.shields.io/badge/react-✓-blue.svg)
![](https://img.shields.io/badge/apollo_server-✓-blueviolet.svg)
![](https://img.shields.io/badge/parse_server-✓-blueviolet.svg)

Puente React is a web dashboard used to visualize data collected on the ground in LMIC countries. It's an early prototype and it's still under development. 

For more details, please see our [website](https://puente-dr.com) to see how we build technology to equip the resource-challenged.

For a live demo, please check out [here](https://puente-dashboard.herokuapp.com/) 
Use the credentials 
Username: Test
Password: test

For the AWS Implementation, please checkout
[AWS S3 URL](http://dashboard-react-cra-clientside.s3-website.us-east-1.amazonaws.com/)

![screencap](public/tour_high.gif)

## Project Layout
| Key Folder | Parent Folder | Description |
| - | - | - |
| providers | src/js | Holds the modules for retrieving data and custom functions | 
| pages | src/js | Holds the main layout folders for content | 
| components | src/js | Holds the smaller components that are within layouts | 


## Development

This project is built with [ReactJS](https://reactjs.org), [Redux](https://redux.js.org/), and [Apollo's GraphQL](https://www.apollographql.com/docs/) using a [JAM Stack architecture](https://jamstack.org/). The visualizations are built using [Recharts](http://recharts.org/).

This project is a bootstrapped using [create-react-app](https://github.com/facebook/create-react-app). It uses client-side rendering.

Here are some quick npm commands to get started:

- `npm install`: Install Node dependencies
- `npm start-local`: Start the hot reloading development server.
- `npm start`: Start the Node + Express server.
- `npm test`: Run the test suit and watch for changes.
- `npm build`: Build a production optimized bundle of the app.
- `npm lint`: Run the ESLinter.

### AWS + s3

Get this React App working on AWS by [installing the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html#cliv2-mac-install-cmd).

#### Deploy in your terminal

Create a s3 bucket
```
$ aws s3 mb s3://your-bucket-name
```

List to see your s3 buckets.
```
$ aws s3 ls
```

Build and deploy your app!

Dev
```
npm run build-local && aws s3 sync build/ s3://your-bucket-name-dev
```

Prod
```
$ npm run build && aws s3 sync build/ s3://your-bucket-name
```

#### Permissions and Settings
There's a decent amount that'll be necessary to get this publically consumed on the AWS website itself. Follow [this](https://www.newline.co/fullstack-react/articles/deploying-a-react-app-to-s3/) guide to get those hammered out.

## Resources

- [CSS Boxes](https://www.bypeople.com/css-boxes/)
- [Flexbox](http://flexbox.buildwithreact.com/)
- [React Router](https://reacttraining.com/react-router/web/example/basic)

## Standards
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

