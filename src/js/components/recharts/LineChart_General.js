import React from 'react';
import * as func from '../../providers/Functions';
import * as d3 from 'd3'

import * as _ from 'underscore';
import styled from 'styled-components';

import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer
} from 'recharts';

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

export class LineChartGeneralComponent extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data.getPeople,
			modded : null,
			Puente : null,
			OWS : null,
			WOF: null
		}
	}

	async dataWrangle(){

		/* I need
			const data = [
			{
				date: '09/11/1992', Puente: 4000, WOF: 2400, OWS: 2400,
			},
			{
				date: '09/11/2001', WOF: 3000, OWS: 1398, Puente: 2210,
			},

		*/
		var modData = this.state.data

		for(let i =0; i< modData.length; i++ ){
			modData[i].age = func.get_age(modData[i]['dob'], new Date()); //get ages from date of births
			modData[i].betterDate = func.formatDate(modData[i]['createdAt'])
			//convert to dates
		}


		var dataByOrgByDay = d3.nest()
			.key(function(d) { return d.betterDate; })
			.key(function(d) { return d.surveyingOrganization; })
			//.key(function(d) { return d.betterDate; })
			.rollup(function(v) { return v.length; })
			//.entries(modData);
			.object(modData);

		var res = Object.entries(dataByOrgByDay).map(([name, values]) => ({name, values}));

		var resSorted = _.sortBy(res, 'name').reverse();
		console.log(resSorted);
		//var newArrayDataOfOjbect = Object.values(dataByOrgByDay)
		//console.log(newArrayDataOfOjbect)
		
		
		
		this.setState({
			modded: resSorted,
			//Puente: quien,
			//WOF: sabe
		})
	}

	componentWillMount(){
		this.dataWrangle();
	}



	render () {
		//https://github.com/recharts/recharts/issues/383
		let getXaxis = (x)=>{return x.name;}
		let getPuente = (x)=>{return x.values.Puente;}
		let getOWS = (x)=>{return x.values['One World Surgery'];}
		let getWOF = (x)=>{return x.values.WOF;}
		return (
		<Div>
			<h1>Number of Records Collected Throughout Time</h1>
			  <ResponsiveContainer width="100%"height={400}>
				<LineChart
					data={this.state.modded}
					margin={{
					top: 5, right: 30, left: 20, bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis height={40} label={{ value: 'Date', position: 'insideBottom', dy:0 }} dataKey={getXaxis} reversed />
					<YAxis label={{ value: 'Number of Records Collected That Day', angle: -90, position: 'center', dx: -20}} />
					<Tooltip />
					<Legend verticalAlign="top" />
					<Brush dataKey={getXaxis} height={40} stroke="#8884d8"/>
					<Line connectNulls type="monotone" name="Puente" dataKey={getPuente} stroke="#8b0000" activeDot={{ r: 8 }} />
					<Line connectNulls type="monotone" name="One World Surgery" dataKey={getOWS} stroke="#518651" />
					<Line connectNulls type="monotone" name="World Outreach Foundation" dataKey={getWOF} stroke="#00bfff" />
			</LineChart> 
		  </ResponsiveContainer>

		</Div>
		);
	}
}