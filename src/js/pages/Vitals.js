import React from 'react';
import { Row, Container } from 'react-bootstrap';

//Query
import { withApollo } from 'react-apollo';
import { allVitalsByOrganization } from '../queries/records';

import { styles } from '../../styles';

class VitalsAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data:null
		}
	}

	componentDidMount = async () => {
		const { client, organization } = this.props;
		let res = await client.query({query: allVitalsByOrganization ,variables: {organization: organization }});
		this.setState({data: res.data.getVitalByOrganization});
		await this.dataWrangle();
		await this.setState({
			progress: 100
		});
	
	}

	componentDidUpdate = async(prevProps) => {
		if((this.props.organization !== prevProps.organization)){
			const { client, organization } = this.props;
			let res = await client.query({query: allVitalsByOrganization ,variables: {organization: organization }});
			this.setState({data: res.data.getVitalByOrganization});
			await this.dataWrangle();
			await this.setState({
				progress: 100
			});
		}
	}

	dataWrangle = () =>{
		console.log('Vitals')
	}
	
	render() {
		return (
				<Container >
					{/* <Row style={styles.row}>
						<Query query={allVitalsByOrganization} variables={{organization:this.props.organization}}>
							{({ data, loading, error }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								//console.log(data.getVitals);
								return (
									<PivotTableComponent data={data} />
								);
							}}
						</Query>
						</Row> */}
					<Row style={styles.row}>
						<h1>Coming Soon!</h1>
					</Row>
				</Container>		
		);
	}
}

export default withApollo(VitalsAnalytics);
