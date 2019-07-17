//React 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

//Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider} from "react-apollo";

import Layout from './js/components/Layout';
import configureStore from "./configure-store";

//Style
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";








//REACT
const app =  document.getElementById('root')

//REDUX
const store = configureStore();

//APOLLO
const client = new ApolloClient({
    uri: "https://puente-graphql.herokuapp.com/"
  });

//This renders the layout
ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Layout />
        </Provider>
    </ApolloProvider>
    ,app
);

/*
const app =  document.getElementById('root')

ReactDOM.render(React.createElement('div', null, 'Hello World'),app)
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();