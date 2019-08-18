//React
import React from "react";

//Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

import dashboardManagerStyle from './MapManager.module.css';

///Redux
import { connect } from "react-redux";
import { setSex } from '../../reducers/mapControls';


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
    /*const filters = {
      sex: value
    }*/
    this.props.setSex(value);
  }
  render() {
    /*const showNote = this.state.showNote;*/
    return (
        <div className={ this.state.show ? dashboardManagerStyle.show : dashboardManagerStyle.hide }>
          <div>
            {!this.state.show && <p className={dashboardManagerStyle.hidden}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleLeft} /> </p>}{this.state.show && <p className={dashboardManagerStyle.shown}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleRight} /></p>}
          </div>

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
        
          {/*<p onClick={this.toggleShowNote}>
            Additional Filters {!showNote && <FontAwesomeIcon icon={faAngleDoubleDown} />}{showNote && <FontAwesomeIcon  onClick={this.toggleShowNote} icon={faAngleDoubleUp} />}
          </p>

          {showNote === true &&
            <div>
              <p>Community</p>
              <p>Age</p>
            </div>
            /*<div>
              <b><h1><input className={dashboardManagerStyle.inputStyle} type="text" value={this.state.note.note.title} onChange={this.handleChangeTitle} placeholder="Title"/></h1></b>
              <p><textarea className={dashboardManagerStyle.inputStyle} type="text" value={this.state.note.note.content} onChange={this.handleChangeContent} placeholder="Take a note..."/></p>
              <div style={{textAlign:"center"}}>
                <label className="button circular">
                  <FontAwesomeIcon style={{margin:"2.5px"}} icon={faSave} />
                </label>
                <label className="button circular">
                  <FontAwesomeIcon style={{margin:"2.5px"}} icon={faTrashAlt}/>
                </label>
              </div>
            </div>*/
          }
        </div>
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
  setSex
};

export default connect(mapStateToProps,mapDispatchToProps)(MapManagerControls);

