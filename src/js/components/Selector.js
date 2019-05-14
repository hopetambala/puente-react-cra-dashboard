import React from 'react';
import { Container, Row, Dropdown } from 'react-bootstrap';
import { BrowserRouter as Route, Link } from "react-router-dom";

export class Selector extends React.Component {
  constructor(props){
    super(props)
  }
  
  static defaultProps = {
    username: "User"       
}

  render() {
    return (
      <>
            <Dropdown >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Form Select
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/demographicanalytics">Demographics</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/medicalanalytics">Medical Evaluation</Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <Link to="/vitalanalytics">Vitals</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/envalanalytics">Environmental Analytics</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          
          {/*<Row>
            <Dropdown style={{margin:"2px"}}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Puente
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">One World Surgery</Dropdown.Item>
                <Dropdown.Item href="#/action-2">World Outreach Foundation</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Constanza Medical Mission</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>*/}
          </>
    )}
   
}


/*
 <style type="text/css">
          {`
          .btn-flat {
            background-color: purple;
            color: white;
          }

          .btn-xxl {
            padding: 1rem 1.5rem;
            font-size: 1.5rem;
          }
          `}
        </style>
*/