import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
//import './verified.css';

//RPH - Not yet logged in
export function Playing(input) {
  const navigation = useNavigate();
  //RPH - Carry the variables over
  const [totalRounds, setTotalRounds] = React.useState(input.totalRounds);
  const [roundNumber, setRoundNumber] = React.useState(input.roundNumber);
  const [totalRightAnswers, setTotalRightAnswers] 
    = React.useState(input.totalRightAnswers);

  function logout() {
    //localStorage.removeItem('userName');
    input.onLogout();
  }

  function nextQuestion(){
    //console.log("E"+input.totalRounds+"E"); 
    console.log("E"+totalRounds+"E"); 

    setTotalRightAnswers(totalRightAnswers+1);
    setRoundNumber(roundNumber+1);

    //totalRightAnswers = totalRightAnswers+1;

    //console.log("F"+input.totalRightAnswers+"G"); 
    console.log("F"+totalRightAnswers+"G"); 

    //Determine when to return the values to the parent 
    // if(x>=10){
       localStorage.setItem('userName', userName);
    // }
  }

  /*
  * RPH Note - figure what button to start focus on 
  * Now logged on to main screen. User can reach the game, or log out
  */
  return(
    <div id="guessing-structure">
      <h1>Name That... Actor</h1> <div>  Username</div>
      <form method="get" action="play.html">
        <div>
          {/* <!-- Hold Image to Display --> */}
          <img alt="Arches" height={150} src="https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg?raw=true" />  
        </div>
        <div id="step-and-score">
          <div style={{'width' : '40%', textAlign: 'right' }}
           /*float={right}*/>Round {roundNumber}/{totalRounds}</div>
          <div style={{'width' : '40%', textAlign: 'right'}} 
          /*float={right}*/>Score {totalRightAnswers}/{totalRounds}</div>
        </div>

        <div className="button-row">
          <button id="option1" style={{'width' : '45%'}} /*type="submit"*/>John Wayne</button>
          <button id="option2" style={{'width' : '45%'}} type="submit">Gary Cooper</button>
        </div>
        <div className="button-row">
          <button id="option3" style={{'width' : '45%'}} type="submit">Clint Eastwood</button>
          <button id="option4" style={{'width' : '45%'}} type="submit">Henry Fonda</button>
        </div> 

        <button id="restart-button" type="submit">Restart</button>
        <button id="next-button" type="submit">Next</button>
        <Button variant='secondary' onClick={() => nextQuestion()}>
          Next
        </Button>
      </form>
    </div>
  );
}