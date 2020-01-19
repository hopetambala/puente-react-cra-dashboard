import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from './data_dashboard.json';
// import animationData1 from './people_chilling.json';

class DataDashboardLottie extends Component {


  render(){

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    // const defaultOptions1 = {
    //     loop: true,
    //     autoplay: true, 
    //     animationData: animationData1,
    //     rendererSettings: {
    //       preserveAspectRatio: 'xMidYMid slice'
    //     }
    //   };

    return(
      <div>
        {/* <h1>Lottie</h1>
        <p>Base animation free from external manipulation</p> */}
        <Lottie options={defaultOptions}
              height={400}
              width={400}
        />
        {/* <Lottie options={defaultOptions1}
              height={400}
              width={400}
        /> */}
      </div>
      
    )
  }
}

export default DataDashboardLottie