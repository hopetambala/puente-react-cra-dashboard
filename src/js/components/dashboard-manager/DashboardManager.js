//React
import React from "react";

//Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave, faAngleDoubleDown, faAngleDoubleUp, faAngleDoubleRight, faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import dashboardManagerStyle from './DashboardManager.module.css';

///Redux
import { connect } from "react-redux";
//import { getPosition, getSelectedDatum } from 'domain/controls';
//import { addNote, removeNote, getNotesIndexedByHash } from 'domain/notes';

class DashboardManagerControls extends React.Component {
  constructor(props){
    super(props)
    this.state = this.initialState;
    this.state = {
      ...this,
      show:false
    }
  }

  get initialState(){
    return {
      label:"Labels",
      height:"200px",
      width:"300px",
      currentLabel:"",
      note: {
        id:'',
        note:{
          title: '',
          labels: [],
          content:""
        }
      }
    };
  }

  handleShowHide = () => {
    this.setState({
      show: !this.state.show
    });
  }

  resetBuilder() {
    this.setState(this.initialState);
  }

  handleChangeTitle = (event) => {
    var note = {...this.state.note}
    note.note.title = event.target.value
    this.setState({note});
  }

  handleChangeContent = (event) => {
    var note = {...this.state.note}
    note.note.content = event.target.value
    this.setState({note});
  }

  handleLabels = (event) => {
    this.setState({currentLabel: event.target.value});
  }

  toggleShowNote = () =>{
    this.setState({
      showNote: !this.state.showNote,
    });
  }

  keyPressed = (event) => {
    if (event.key === "Enter") {
      var note = {...this.state.note}
      note.note.labels.push(this.state.currentLabel)
      this.setState({note})
      this.setState({currentLabel:""})
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      var note = {...this.state.note}
      note.id = this.props.data.CRVIZ._SEARCH_KEY
      if (note.id in this.props.notes){          
        this.setState({
          note: this.props.notes[note.id]
        }); 
      }
      else{
        this.resetBuilder()
      }
    } 
  }
  
  render() {

    const showNote = this.state.showNote;


    return (
        <div className={ this.state.show ? dashboardManagerStyle.show : dashboardManagerStyle.hide }>
          <div>
            {!this.state.show && <p className={dashboardManagerStyle.hidden}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleLeft} /> </p>}{this.state.show && <p className={dashboardManagerStyle.shown}><FontAwesomeIcon onClick={this.handleShowHide} icon={faAngleDoubleRight} /></p>}
          </div>
          <div>
            <p>Hello </p>
            <p>Fellow</p>
          </div>
        
          {this.props.data && this.props.data.fieldValue &&
            <div>
              <h3>Header 3</h3>
            </div>
          }
        
          <p onClick={this.toggleShowNote}>
            Notes {!showNote && <FontAwesomeIcon icon={faAngleDoubleDown} />}{showNote && <FontAwesomeIcon  onClick={this.toggleShowNote} icon={faAngleDoubleUp} />}
          </p>

          {showNote === true &&
            <div>
              <p>Hello </p>
              <p>Fellow</p>
              <p>Hello </p>
              <p>Fellow</p>
              <p>Hello </p>
              <p>Fellow</p>
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
  /*addNote,
  removeNote,*/
};

export default connect(mapStateToProps,mapDispatchToProps)(DashboardManagerControls);

