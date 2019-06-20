import React from 'react';
import { withApollo } from 'react-apollo';

//UI
import { Row, Container, Col } from 'react-bootstrap';
import { StatsBox } from '../../components/widget/StatsBox/StatsBox';
import MaterialTable from 'material-table';

//Queries
import { personalEnvironmentalHealth, personalEvaluationMedical, personalVitals } from '../../queries/records'

const styles = {
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		//justifyContent: 'center',
		alignContent: 'flex-center',
		
	},
	row: {
		justifyContent: 'center',
		flex:1,
        //marginBottom:"5px",
        paddingTop:"5px",
		paddingBottom:"5px"
	}, 

}

class Patient extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            personalResults : this.props.data,
            evalMedicalresults: null,
            vitalresults: null,
            envHlthresults: null
        }

        
    }

    async componentDidMount() {
        await this.getData();
        await this.dataWrangle();

        
    }

    async getData(){
        const {client} = this.props;
        
        let [ evalMedical, vitals, envHealth ] = await Promise.all(
            [client.query({query: personalEvaluationMedical, variables: {id:this.state.personalResults.objectId }}),

            client.query({query: personalVitals, variables: {id:this.state.personalResults.objectId }}),

            client.query({query: personalEnvironmentalHealth, variables: {id:this.state.personalResults.objectId }})

        ])
        console.log(evalMedical,vitals,envHealth)

        this.setState({
            vitalresults: vitals.data.getPersonVitals,
            evalMedicalresults: evalMedical.data.getPersonEvalMedical,
            envHlthresults: envHealth.data.getPersonEnv
        })
        //return[vitals, evalMedical,envHealth]
    }
    
    dataWrangle(){
        if(this.state.vitalresults.length > 0){
            let latestBloodPressure = this.state.vitalresults[0].bloodPressure
            this.setState({latestBloodPressure:latestBloodPressure})

            let latestbloodOxygen = this.state.vitalresults[0].bloodOxygen
            this.setState({bloodOxygen:latestbloodOxygen})

            let latestpulse = this.state.vitalresults[0].pulse
            this.setState({pulse:latestpulse})

            let latestbloodSugar = this.state.vitalresults[0].bloodSugar
            this.setState({bloodSugar:latestbloodSugar})
        }

        /*if(this.state.evalMedicalresults.length > 0){
            let latestBloodPressure = this.state.vitalresults[0].bloodPressure
            this.setState({latestBloodPressure:latestBloodPressure})

            let latestbloodOxygen = this.state.vitalresults[0].bloodOxygen
            this.setState({bloodOxygen:latestbloodOxygen})

            let latestpulse = this.state.vitalresults[0].pulse
            this.setState({pulse:latestpulse})

            let latestbloodSugar = this.state.vitalresults[0].bloodSugar
            this.setState({bloodSugar:latestbloodSugar})
        }*/
       
        
        //console.log(this.state.evalMedicalresults)

    }

    render(){

        return(
            <Container style={styles.container}>
                <Row style={styles.row}>
                    <h1>{this.state.personalResults.fname}</h1>
                    <Col>
                        <div><b>Birth:</b> {this.state.personalResults.dob}</div>
                        <div><b>License:</b> {this.state.personalResults.cedulaNumber}</div>
                    </Col>
                    <Col>
                        <div><b>Sex:</b> {this.state.personalResults.sex}</div>
                        <div><b>Phone:</b> {this.state.personalResults.telephoneNumber}</div>
                    </Col>
                    <Col>
                        <div><b>Community:</b> {this.state.personalResults.communityname}</div>
                        <div><b>Province:</b> {this.state.personalResults.province}</div>
                    </Col>
                </Row>
                {this.state.vitalresults === null && 
                    <div>Loading Vitals</div>
                }
                {this.state.vitalresults && 
                <Row style={styles.row}>
                    {this.state.latestBloodPressure &&
                        <Col>
                        <StatsBox
                            Cardsubtitle={"Blood Pressure"}
                            Cardtitle={this.state.latestBloodPressure}
                            Cardtext={"Normal (mmHg)"}
                            height="200px"
                            width="250px"
                            >
                            
                            {/*<Pie180ChartComponent 
                                data={this.state.sexes}
                                valueKey="value" 
                            />*/}
                        </StatsBox>
                    </Col>
                    }
                    {this.state.bloodOxygen &&
                        <Col>
                            <StatsBox
                                Cardsubtitle={"Blood Oxygen"}
                                Cardtitle={this.state.bloodOxygen}
                                Cardtext={"Normal (mmHg)"}
                                height="200px"
                                width="250px">

                                {/*<Pie180ChartComponent 
                                    data={this.state.sexes}
                                    valueKey="value" 
                                />*/}
                            </StatsBox>
                        </Col>
                    }
                    {this.state.pulse &&
                    <Col>
                        <StatsBox
                            Cardsubtitle={"Heart Rate"}
                            Cardtitle={this.state.pulse}
                            Cardtext={"Normal (bpm)"}
                            height="200px"
                            width="250px">

                            {/*<Pie180ChartComponent 
                                data={this.state.sexes}
                                valueKey="value" 
                            />*/}
                        </StatsBox>
                    </Col>
                    }
                    {this.state.bloodSugar &&
                    <Col>
                        <StatsBox
                            Cardsubtitle={"Glucose"}
                            Cardtitle={this.state.bloodSugar}
                            Cardtext={"Normal (mg/dL)"}
                            height="200px"
                            width="250px">

                            {/*<Pie180ChartComponent 
                                data={this.state.sexes}
                                valueKey="value" 
                            />*/}
                        </StatsBox>
                    </Col>
                    }
                </Row>
                }
                {this.state.evalMedicalresults === null && 
                    <div>Loading Medical Evaluations</div>
                }
                {this.state.evalMedicalresults &&
                <Row style={styles.row}>
                    <Col>
                        <MaterialTable
                            title={'Medical Evaluations'}
                            columns={[
                                { title: 'General Consult Required', field: 'AssessmentandEvaluation' },
                                { title: 'Surgical Consult Required', field: 'AssessmentandEvaluation_Surgical' },
                                { title: 'Part of Body Examined', field: 'part_of_body' },
                                { title: 'Description of Problem', field: 'part_of_body_description' },
                                { title: 'Plan of Action', field: 'planOfAction' },
                                { title: 'Created At', field: 'createdAt' },
                                { title: 'Updated At', field: 'updatedAt' },
                            ]}
                            data={this.state.evalMedicalresults}        
                            options={{
                                //filtering: true,
                                //grouping: true
                            }}
                        />
                    </Col>
                </Row>
                }
                {this.state.envHlthresults === null && 
                    <div>Loading Environmental Histories</div>
                }
                {this.state.envHlthresults &&
                <Row style={styles.row}>
                    <Col>
                        <MaterialTable
                            title={'Environmental Health Histories'}
                            columns={[
                                { title: 'Biggest Problem of the Community', field: 'biggestproblemofcommunity' },
                                { title: 'Condition of Floor in the house', field: 'conditionoFloorinyourhouse' },
                                { title: 'Condition of Roof in the house', field: 'conditionoRoofinyourhouse' },
                                { title: 'Number of Individuals in the House', field: 'numberofIndividualsLivingintheHouse' },
                                { title: 'Number of Individuals in the House Under Age of Five', field: 'numberofChildrenLivinginHouseUndertheAgeof5' },
                                { title: 'Clinic Access', field: 'clinicAccess' },
                                { title: 'Latrine Access', field: 'latrineAccess' },
                                { title: 'Water Frequency', field: 'waterAccess' },
                                { title: 'Created At', field: 'createdAt' },
                                { title: 'Updated At', field: 'updatedAt' },
                            ]}
                            data={this.state.envHlthresults}        
                            options={{
                                //filtering: true,
                                //grouping: true
                            }}
                        />
                    </Col>
                </Row>
                }
                
            </Container>
        )
    }
}

export default withApollo(Patient);
