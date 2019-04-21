import React from 'react';
import './Boxx.scss'; 

export class Boxx extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="cardz">
                <div className="card-body">
                    <h3 className="card-title">Card title</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

        )
    }
}