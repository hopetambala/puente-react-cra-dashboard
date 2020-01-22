//React
import React from "react";

///Redux
import { connect } from "react-redux";
import { setQuery, setVariables, setMapType } from '../../reducers/mapControls';
import { allRecordsByOrganization,
  allVitalsByOrganization,
  allEnvsByOrganization,
  allEvalMedicalsByOrganization,
  allHistoryMedicalsByOrganization,

} from '../../queries/records';

//Components
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDoubleRight, faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
// import { Dropdown } from 'react-bootstrap';

//Styling
import dashboardManagerStyle from './MapManager.module.css';
import labelStyle from './Label.module.css';
import { cardStyle, styles } from "../../../styles";

class MapManagerControls extends React.Component {
  constructor(props){
    super(props)
    this.state = this.initialState;
    this.state = {
      ...this,
      show:false
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {

    } 
  }

  get initialState(){
    return {
      query: null,
      variables:{}
    }
  }

  handleShowHide = () => {
    this.setState({
      show: !this.state.show
    });
  }

  toggleShowNote = () =>{
    this.setState({
      showNote: !this.state.showNote,
    });
  }
  sendQuery = (value) => {
    this.props.setQuery(value);
  }
  sendVariables = (value) => {
    this.props.setVariables(value);
  }

  sendMapType = (value) => {
    this.props.setMapType(value);
  }

  render() {
    return (
        <Card className={ this.state.show ? dashboardManagerStyle.hide : dashboardManagerStyle.show } style={cardStyle.card}>
            {/* <div>
              {!this.state.show && <p className={dashboardManagerStyle.hidden}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleLeft} /> </p>}{this.state.show && <p className={dashboardManagerStyle.shown}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleRight} /></p>}
            </div> */}

            <CardContent>
              <Typography  variant="h6" >
                <div style={{color:styles.theme.primaryAppColor}}>Type of Map</div>
              </Typography>
              <div className={labelStyle.tags}>
                <span className={labelStyle.tag} onClick={()=>{this.sendMapType("scatter")}}>scatter</span>
                <span className={labelStyle.tag} onClick={()=>{this.sendMapType("hex")}}>3d-heatmap</span>
              </div>
              <Typography  variant="h6" >
                <div style={{color:styles.theme.primaryAppColor}}>Form</div>
              </Typography>
              <div className={labelStyle.tags}>
                <span className={labelStyle.tag} onClick={()=>{this.sendQuery(allRecordsByOrganization)}}>all</span>
                <span className={labelStyle.tag} onClick={()=>{this.sendQuery(allEnvsByOrganization)}}>enviromental-health</span>
                <span className={labelStyle.tag} onClick={()=>{this.sendQuery(allVitalsByOrganization)}}>vitals</span>
                <span className={labelStyle.tag} onClick={()=>{this.sendQuery(allEvalMedicalsByOrganization)}}>medical-evaluation</span>
                <span className={labelStyle.tag} onClick={()=>{this.sendQuery(allHistoryMedicalsByOrganization)}}>medical-history</span>
                
              </div>
           
            </CardContent>
          </Card>	
    );
  }
}
const mapStateToProps = () => {
  return {
    /*position: getPosition(state),
    data: getSelectedDatum(state),
    notes: getNotesIndexedByHash(state),*/
  };
};

const mapDispatchToProps = {
  setQuery,
  setVariables,
  setMapType
};

export default connect(mapStateToProps,mapDispatchToProps)(MapManagerControls);

