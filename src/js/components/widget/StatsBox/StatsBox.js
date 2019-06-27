import React from 'react';
import './Boxx.scss'; 
import styled, { css } from 'styled-components'

const Div = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 10px; 
    //width: 300px;
    //height: ${props => props.Height};
    margin: 1%;
    //background: #f8af1e; Puente color
    background: white;

    &:hover {
        border-radius: 20px; 
        //background: #f8af1e; Puente color
        background: #1a2a6c;  
        color: #f8af1e;
        //color: #1a2a6c;

        box-shadow: 1px 12px 20px 1px rgba(0, 0, 0, 0.2);
    }
`;

export class StatsBox extends React.Component{
    static defaultProps = {
        Cardtitle: "Card title",
        Cardsubtitle: "Card subtitle",
        Cardtext: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        height:"200px",
        width:"300px"
    }

    

    render(){
        const style = {
            backgroundImage: `url(${this.props.background})`,
            height:this.props.height,
            width:this.props.width
        }
        return(
            <Div style={style}>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.Cardsubtitle}</h6>
                    <h3 className="card-title">{this.props.Cardtitle}</h3>
                    <p className="card-text">{this.props.Cardtext}</p>
                    
                </div>
                <div>
                    {this.props.children}
                </div>
            </Div>

        )
    }
}