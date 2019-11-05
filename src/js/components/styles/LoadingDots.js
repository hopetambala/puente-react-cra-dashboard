import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Typography from '@material-ui/core/Typography';
import { styles } from '../../../styles';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 10px;
`;
const Dot = styled.div`
  background-color: ${styles.theme.primaryAppColor};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;
class LoadingDots extends Component {
  render() {
    return (
    <>
        {/* <Typography  variant="h2" >
            <div style={{color:styles.theme.primaryAppColor}}>Loading</div>
        </Typography> */}
      <DotWrapper>
        <Typography  variant="h4" style={{color:styles.theme.primaryAppColor}} >
            <div >Loading</div>
        </Typography>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    </>
    )
  }
}
export default LoadingDots