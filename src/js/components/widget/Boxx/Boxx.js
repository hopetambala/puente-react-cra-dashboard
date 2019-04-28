import React from 'react';
import './Boxx.scss'; 
import styled, { css } from 'styled-components'

const Div = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 20px; 
    width: 250px;
    height: 300px;
    margin: 1%;
    //background: #f8af1e; Puente color

    &:hover {
        border-radius: 20px; 
        //background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg);
        //background: url(${props => props.img && css});
        //background: ${props => props.inputColor && css|| "palevioletred"};
        //background: #f8af1e; Puente color
        background: #1a2a6c;  
        //background: -webkit-linear-gradient(to left, #f8af1e, #b21f1f, #1a2a6c); 
        //background: linear-gradient(20deg, #f8af1e, #b21f1f, #1a2a6c); 

        box-shadow: 1px 12px 20px 1px rgba(0, 0, 0, 0.2);
    }
`;

export class Boxx extends React.Component{
    constructor(props){
        super(props)
    }

    static defaultProps = {
        Cardtitle: "Card title",
        Cardsubtitle: "Card subtitle",
        Cardtext: "Some quick example text to build on the card title and make up the bulk of the card's content."        
    }

    

    render(){
        const style = {
            //onHover: {
                backgroundImage: `url(${this.props.background})`
            //}
            
            //backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg)`
        }
        return(
            <Div style={style}>
                <div className="card-body">
                    <h3 className="card-title">{this.props.Cardtitle}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.Cardsubtitle}</h6>
                    <p className="card-text">{this.props.Cardtext}</p>
                </div>
            </Div>

        )
    }
}