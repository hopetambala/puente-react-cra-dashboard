import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Query, withApollo, graphql } from 'react-apollo';

//Components
import { StatsBox } from '../components/widget/StatsBox/StatsBox';
import { ThreeDimenEnvComponent } from '../components/recharts/Scatter_Env';

//Query
import { env_age_latrines_clinic as ealc, allEnvsByOrganization} from '../queries/records';


const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		//alignItems: 'flex-center',
		alignContent: 'flex-start',
		paddingTop: '5%'
		
	},
	row: {
		//height:'100vh',	
		justifyContent: 'center',
		flex:1,
		marginBottom:0,
		paddingBottom:0
	}
}


class EnvironHealthAnalytics extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			results:null,
			organization:"Puente"
		}
		
	}
	/*https://github.com/apollographql/react-apollo/issues/1411*/
	componentWillMount = async () => {
		const {client} = this.props;
		let res = await client.query({query: allEnvsByOrganization,variables: {organization:this.state.organization }});
		this.setState({results: res.data.getEnvByOrganization})
		console.log(this.state.results);
	}

	componentDidMount(){
		
	}

	dataWrangle(){
		var data = this.state.results

	}
	render() {
		return (
			<Container style={styles.container}>
				<Row style={styles.row}>
				{/**
					<StatsBox/>
					<StatsBox/>  */}
				</Row>
				<Row style={styles.row}>
					<Query query={ealc}>
						{({ data, loading, error }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							//console.log(data.getEvalMedicalRecords);
							return (
								<ThreeDimenEnvComponent data={data} />
							);
						}}
					</Query>
				</Row>
			</Container>
		);
	}
}

export default withApollo(EnvironHealthAnalytics);
 