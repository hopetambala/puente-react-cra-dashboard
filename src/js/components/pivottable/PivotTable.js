import React from 'react';

//Plotly
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

export class PivotTableComponent extends React.Component{
    constructor(props){
		super(props)
        this.state = null;
    }

    render(){
        return(
            <PivotTableUI
                data={this.props.data.getVitals}
                onChange={s => this.setState(s)}
                {...this.state}
            />
        )
    }
}