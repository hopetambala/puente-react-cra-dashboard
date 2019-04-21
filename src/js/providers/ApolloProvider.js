import React from 'react';
import { ApolloProvider } from 'react-apollo';
import  ApolloClient   from "apollo-boost";

export class Provider extends React.Component {
    
    constructor(props){
        super(props)

    }
    
    render() {
        const client = new ApolloClient({
            uri: "https://puente-graphql.herokuapp.com/"
        });
        return (
            <ApolloProvider client={client}>

            </ApolloProvider>
        )
    }

}

