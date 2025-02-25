import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
//import './verified.css';

//RPH - Not yet logged in
export function Finished(input) {
  const navigation = useNavigate();
  //RPH - Carry the variables over
  const [totalRounds, setTotalRounds] = React.useState(input.totalRounds);
  const [roundNumber, setRoundNumber] = React.useState(input.roundNumber);
  const [totalRightAnswers, setTotalRightAnswers] 
    = React.useState(localStorage.totalRightAnswers);

  // function saveToLocalStorage(){
  //   localStorage.roundNumber;
  //   localStorage.setItem('roundNumber', roundNumber);
  //   localStorage.setItem('totalRounds', totalRounds);
  //   localStorage.setItem('totalRightAnswers', totalRightAnswers);
  // }
  
  function restartGame(){
    //Call to "play.jsx" to shift sub-page
    input.onStartPlayingGame();
    
  }

  function navToLogin(){
    restartGame();
    navigation('/login');
  }

  /*
  * RPH Note - figure what button to start focus on 
  * Now logged on to main screen. User can reach the game, or log out
  */
  return(
    <div id="guessing-structure">

      <h1>Game Over</h1>
 
      <form method="get" action="play.html">
        <div>
          {/* <!-- Hold Image to Display --> */}
          <img alt="Arches" height={150} src="https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg?raw=true" />  
        </div>
     <div>Username: {input.userName}</div>
      <div>You Scored: {totalRightAnswers} Points!</div>

        <Button variant='light' onClick={() => restartGame()}>
            Restart
        </Button>
        <Button variant='light' onClick={() => navToLogin()}>
            Main Menu
        </Button>
      </form>
    </div>
  );
}