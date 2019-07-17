import React from 'react';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';

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
	}

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