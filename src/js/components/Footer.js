import React from 'react';
import PropTypes from 'prop-types'
/*
React is no more shipped with PropTypes. You will need to install it.

First install the prop-types package by running `npm i prop-types --save`.
*/

const User = (props) => {
    return <p>{props.user}</p>
};

function User2(props){
    User2.defaultProps = {
        user: 'CamperBot'
    };
    User2.propTypes = {
        user: PropTypes.string
    };
    return (<h1>{props.user}</h1>)
}

export class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <footer>
                <User2 user='Floppity'/>
                <User user='ZipZop'/>
            </footer>
        )
    }

}