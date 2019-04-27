import React from 'react';
import * as func from '../../providers/Functions';
import * as d3 from 'd3'

import * as _ from 'underscore';

import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
    {name: '1', uv: 300, pv: 456},
    {name: '2', uv: -145, pv: 230},
    {name: '3', uv: -100, pv: 345},
    {name: '4', uv: -8, pv: 450},
    {name: '5', uv: 100, pv: 321},
    {name: '6', uv: 9, pv: 235},
    {name: '7', uv: 53, pv: 267},
    {name: '8', uv: 252, pv: -378},
    {name: '9', uv: 79, pv: -210},
    {name: '10', uv: 294, pv: -23},
    {name: '12', uv: 43, pv: 45},
    {name: '13', uv: -74, pv: 90},
    {name: '14', uv: -71, pv: 130},
    {name: '15', uv: -117, pv: 11},
    {name: '16', uv: -186, pv: 107},
    {name: '17', uv: -16, pv: 926},
    {name: '18', uv: -125, pv: 653},
    {name: '19', uv: 222, pv: 366},
    {name: '20', uv: 372, pv: 486},
    {name: '21', uv: 182, pv: 512},
    {name: '22', uv: 164, pv: 302},
    {name: '23', uv: 316, pv: 425},
    {name: '24', uv: 131, pv: 467},
    {name: '25', uv: 291, pv: -190},
    {name: '26', uv: -47, pv: 194},
    {name: '27', uv: -415, pv: 371},
    {name: '28', uv: -182, pv: 376},
    {name: '29', uv: -93, pv: 295},
    {name: '30', uv: -99, pv: 322},
    {name: '31', uv: -52, pv: 246},
    {name: '32', uv: 154, pv: 33},
    {name: '33', uv: 205, pv: 354},
    {name: '34', uv: 70, pv: 258},
    {name: '35', uv: -25, pv: 359},
    {name: '36', uv: -59, pv: 192},
    {name: '37', uv: -63, pv: 464},
    {name: '38', uv: -91, pv: -2},
    {name: '39', uv: -66, pv: 154},
    {name: '40', uv: -50, pv: 186}
  ];

//http://recharts.org/en-US/examples/BrushBarChart
export class BrushBarChronicComponent extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data.getEvalMedicalRecords,
			modded : null
		}
		//console.log(this.props.data)
	}

	async dataWrangle(){
		var modData = this.state.data

		//get ages from date of births
		for(let i =0; i< modData.length; i++ ){
			modData[i].age = func.get_age(modData[i]['dob']);

			if(modData[i].chronic_condition_diabetes =='Yes'){
				modData[i].chronic_condition_diabetes = 1
			}

			if(modData[i].chronic_condition_hypertension =='Yes'){
				modData[i].chronic_condition_hypertension = 1
			}
			if(modData[i].chronic_condition_other =='Yes'){
				modData[i].chronic_condition_other = 1
			}
		}

		var sexAgeDiabetes = d3.nest()
			//.key(function(d) { return d.sex; })
			.key(function(d) { return d.age; })
			.rollup(function(v) { return d3.sum(v, function(d) { return d.chronic_condition_diabetes; }); })
			.object(modData);
		var diabs = Object.entries(sexAgeDiabetes).map(([age, diabetes_count]) => ({age, diabetes_count}));




		var sexAgeHypertension = d3.nest()
			//.key(function(d) { return d.sex; })
			.key(function(d) { return d.age; })
			.rollup(function(v) { return d3.sum(v, function(d) { return d.chronic_condition_hypertension; }); })
			.object(modData);
		var hyps = Object.entries(sexAgeHypertension).map(([age, hypertension_count]) => ({age, hypertension_count}));
		
		
		
		
		var sexAgeOther= d3.nest()
			//.key(function(d) { return d.sex; })
			.key(function(d) { return d.age; })
			.rollup(function(v) { return d3.sum(v, function(d) { return d.chronic_condition_other; }); })
			.object(modData); 
		
		var others = Object.entries(sexAgeOther).map(([age, other_count]) => ({age, other_count}));
		//console.log(res3)
		

		var moddedData = _.map(diabs, function(element) {
			var treasure = _.findWhere(hyps, { age: element.age });
	  
			return _.extend(element, treasure);
	  });


	  //console.log(c)
		
		this.setState({
			modded:moddedData
		})
		//console.log(modData);
		
		
	}

	componentWillMount(){
		this.dataWrangle();
	}



	render () {
		return (
			<BarChart width={800} height={500} data={this.state.modded}
					margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="age"/>
				<YAxis/>
				<Tooltip/>
				<Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
				<ReferenceLine y={0} stroke='#000'/>
				<Brush dataKey='age' height={30} stroke="#8884d8"/>
				<Bar dataKey="diabetes_count" fill="#8884d8" />
				<Bar dataKey="hypertension_count" fill="#82ca9d" />
			</BarChart>
		);
	}
}