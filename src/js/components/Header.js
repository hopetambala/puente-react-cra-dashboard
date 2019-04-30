import React from 'react';
import { Nav } from 'react-bootstrap';


export default class Header extends React.Component {
  constructor(props){
    super(props)
  }
  

  render() {
    return (
      <Nav style={{background:'white'}} className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <div className="navbar-brand h1 mb-0 text-large font-medium">
            Puente
          </div>
          <div className="navbar-nav ml-auto">
              <span className="pr-2">Dashboard</span>
              <span className="pr-2">Maps</span>
              <span className="pr-2">Export Manager</span>
              <span className="pr-2">Hi, {this.props.username}</span>
              <span className="img-container">
                {/*<img src={myMan} className="rounded-circle" alt="user" /> */}
            </span>
        </div>
      </Nav>
    )}
   
}

Header.defaultProps = {
  username : 'Username'
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