//React
import React from "react";

//Components
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

//Styling
import dashboardManagerStyle from './MapManager.module.css';
import { styles, cardStyle } from "../../../styles";

///Redux
import { connect } from "react-redux";
import { setSex, setEducation } from '../../reducers/mapControls';

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
      sex:''
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
  sendSex = (value) => {
    this.props.setSex(value);
  }
  sendEducation = (value) => {
    this.props.setEducation(value);
  }

  render() {
    return (
        // <div className={ this.state.show ? dashboardManagerStyle.show : dashboardManagerStyle.hide }>
        //   <div>
        //     {!this.state.show && <p className={dashboardManagerStyle.hidden}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleLeft} /> </p>}{this.state.show && <p className={dashboardManagerStyle.shown}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleRight} /></p>}
        //   </div>

        //   <Dropdown style={{marginBottom:"1em"}}>
				// 		<Dropdown.Toggle variant="success" id="dropdown-basic">
				// 			Sex
				// 		</Dropdown.Toggle>
				// 		<Dropdown.Menu>
        //     <Dropdown.Item onClick={()=>{this.sendSex('')}}>All</Dropdown.Item>
				// 			<Dropdown.Item onClick={()=>{this.sendSex('Male')}}>Male</Dropdown.Item>
				// 			<Dropdown.Item onClick={()=>{this.sendSex('Female')}}>Female</Dropdown.Item>
				// 		</Dropdown.Menu>
				// 	</Dropdown>
        // </div>
        <Card className={ this.state.show ? dashboardManagerStyle.hide : dashboardManagerStyle.show }>
            <div>
              {!this.state.show && <p className={dashboardManagerStyle.hidden}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleLeft} /> </p>}{this.state.show && <p className={dashboardManagerStyle.shown}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleRight} /></p>}
            </div>

            <CardContent>
              <Typography  variant="h6" component="h6"  color="textSecondary" gutterBottom>
                Metrics on Records
              </Typography>
              <Typography variant="h4" component="h4">
                Hello
              </Typography>
              <Dropdown style={{marginBottom:"1em"}}>
				 		<Dropdown.Toggle variant="success" id="dropdown-basic">
							Sex
				 		</Dropdown.Toggle>
				 		<Dropdown.Menu>
             <Dropdown.Item onClick={()=>{this.sendSex('')}}>All</Dropdown.Item>
				 			<Dropdown.Item onClick={()=>{this.sendSex('Male')}}>Male</Dropdown.Item>
				 			<Dropdown.Item onClick={()=>{this.sendSex('Female')}}>Female</Dropdown.Item>
				 		</Dropdown.Menu>
				 	</Dropdown>
            </CardContent>
          </Card>	
    );
  }
}
const mapStateToProps = (state) => {
  return {
    /*position: getPosition(state),
    data: getSelectedDatum(state),
    notes: getNotesIndexedByHash(state),*/
  };
};

const mapDispatchToProps = {
  setSex,
  setEducation
};

export default connect(mapStateToProps,mapDispatchToProps)(MapManagerControls);

