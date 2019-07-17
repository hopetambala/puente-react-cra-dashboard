import React from 'react';
import * as func from '../../providers/Functions';
import * as d3 from 'd3'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import styled from "styled-components";

const Div = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
		border-radius: 10px; 
		background: white;

    margin: 1%;

    &:hover {
        border-radius: 20px; 
        box-shadow: 1px 12px 20px 1px rgba(0, 0, 0, 0.2);
    }
`;

//http://recharts.org/en-US/examples/ThreeDimScatterChart
export class ThreeDimenEnvComponent extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data,
			modded : null,
			clinicYes : null,
			clinicNo : null
		}
	}

	async dataWrangle(){
		var modData = this.state.data

		//get ages from date of births
		for(let i =0; i< modData.length; i++ ){
			modData[i].age = func.get_age(modData[i]['dob']);
			modData[i].individualsInHouse = parseInt(modData[i].numberofIndividualsLivingintheHouse);
			modData[i].childrenInHouse = parseInt(modData[i].numberofChildrenLivinginHouseUndertheAgeof5);
		}


		var dataByClinicAccess = d3.nest()
			.key(function(d) { return d.clinicAccess; })
			.entries(modData);

		var yes = dataByClinicAccess[1].values
		var no = dataByClinicAccess[2].values
		
		this.setState({
			modded: modData,
			clinicYes: yes,
			clinicNo: no
		})
	}

	componentWillMount(){
		this.dataWrangle();
	}



	render () {
		return (
			<Div>
				<ResponsiveContainer width="100%" height={600}>
					<ScatterChart
						margin={{
							//top: 20, right: 20, bottom: 20, left: 20,
							right: 20
						}}>
						<CartesianGrid />
						<XAxis type="number" dataKey="age" name="Age" unit="years" />
						<YAxis type="number" dataKey="individualsInHouse" name="Individuals In the House" />
						{/*<ZAxis type="number" dataKey="childrenInHouse" range={[0, 12]} name="Children in House" />*/}
						<Tooltip cursor={{ strokeDasharray: '3 3' }} />
						<Legend verticalAlign="top"/>
						<Scatter name="Clinic Access" data={this.state.clinicYes} fill="#8884d8" />
						<Scatter name="No Clinic Access" data={this.state.clinicNo} fill="#82ca9d" />
					</ScatterChart>
				</ResponsiveContainer>
			</Div>
		);
	}
}