//React 
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from './js/components/Layout';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import * as serviceWorker from './serviceWorker';

//REACT
const app =  document.getElementById('root')


//This renders the layout
ReactDOM.render(<Layout/>, app);

/*
const app =  document.getElementById('root')

ReactDOM.render(React.createElement('div', null, 'Hello World'),app)
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();