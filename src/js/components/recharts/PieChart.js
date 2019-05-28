import React from 'react';
import * as func from '../../providers/Functions';
import * as d3 from 'd3'

import * as _ from 'underscore';

import { PieChart, Pie, Sector, Cell, Tooltip, LabelList, ResponsiveContainer} from 'recharts';

const data = [
	{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
	{ name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


//http://recharts.org/en-US/examples/BrushBarChart
export class Pie180ChartComponent extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title: null,
			data : null,
			valueKey : null
		}
		//console.log(this.props.valueKey)
		//console.log(this.props.data)
	}

	/*static defaultProps = {
        data: data,
        valueKey: "value",
    }*/

	async componentDidMount(){
		this.state.data = this.props.data;
		this.state.valueKey = this.props.valueKey;

		this.setState({
			data: this.props.data,
			valueKey: this.props.valueKey,
		})
	}



	render () {
		return (
			<>
			<h1>{this.state.title}</h1>
			{/*<BarChart width={800} height={500} data={this.state.modded}
					margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis  height={40} label={{ value: 'Age', position: 'insideBottom', dy:0 }} dataKey="age"/>
				<YAxis  label={{ value: 'Count of Chronic Diseases Reported', angle: -90, position: 'center', dx: -20}}/>
				<Tooltip/>
				<Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
				<ReferenceLine y={0} stroke='#000'/>
				<Brush dataKey='age' height={40} stroke="#8884d8"/>
				<Bar dataKey="diabetes_count" fill="#8884d8" />
				<Bar dataKey="hypertension_count" fill="#82ca9d" />
			</BarChart>*/}
			<ResponsiveContainer width="100%" height={200}>
				<PieChart >
					<Pie dataKey={this.props.valueKey} startAngle={180} endAngle={0} data={this.props.data} outerRadius={60} fill="#8884d8" label nameKey="key">
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
			</>
		);
	}
}