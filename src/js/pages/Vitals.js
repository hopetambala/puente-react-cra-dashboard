import React from 'react';
import { Row, Container, Col, ProgressBar, Dropdown } from 'react-bootstrap';
import { Query } from 'react-apollo';

//Components
import { PivotTableComponent } from '../components/pivottable/PivotTable';

//Query
import { vitals as vits} from '../queries/records';

//Styles
import { styles } from '../components/styles/Theme';

export class VitalsAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data:null
		}
	}

	async onSubmit(value){
		await this.setState({
			organization: value
		})
		console.log(this.state.organization)
	}
	
	render() {
		return (
				<Container >
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{this.state.organization}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={()=>{this.onSubmit("All")}}>All</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.onSubmit("Puente")}}>Puente</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.onSubmit("One World Surgery")}}>One World Surgery</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.onSubmit("WOF")}}>World Outreach Foundation</Dropdown.Item>
							<Dropdown.Item onClick={()=>{this.onSubmit("Constanza Medical Mission")}}>Constanza Medical Mission</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Row style={styles.row}>
						<Query query={vits}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								//console.log(data.getVitals);
								return (
									<PivotTableComponent data={data} />
								);
							}}
						</Query>
					</Row>
				</Container>		
		);
	}
}