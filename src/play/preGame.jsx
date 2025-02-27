import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
//import './verified.css';

//RPH - Not yet logged in
export function PreGame(input) {
  const navigation = useNavigate();
  //RPH - Carry the variables over
  const [totalRounds, setTotalRounds] = React.useState(input.totalRounds);
  const [roundNumber, setRoundNumber] = React.useState(input.roundNumber);
  const [totalRightAnswers, setTotalRightAnswers] 
    = React.useState(input.totalRightAnswers);
  const [questionGuessed, setQuestionGuessed] = React.useState(false);

  //Save values to "localStorage"
  function saveToLocalStorage(){
    localStorage.roundNumber;
    localStorage.setItem('roundNumber', roundNumber);
    localStorage.setItem('totalRounds', totalRounds);
    localStorage.setItem('totalRightAnswers', totalRightAnswers);
  }

  /*
   * 
   */
  function startGame(){
    //Call to "play.jsx" to shift sub-page
    input.onStartPlayingGame();
  }

  function navToLogin(){
    navigation('/login');
  }

  //Once all questions answered, send user to "finished" subpage
  function reachFinishedPage(){
    saveToLocalStorage();
    //Call to "play.jsx" to shift to sub-page
    input.onGameCompletion();
  }

  /*
  * RPH Note - figure what button to start focus on 
  * Now logged on to main screen. User can reach the game, or log out
  */
  return(
    <div id="guessing-structure">
      <h1>Name That... Actor</h1> <div>  Username: {input.userName}</div>
      <form method="get" action="play.html">
        <div>
          {/* <!-- Hold Image to Display --> */}
          <img alt="Arches" height={150} src="https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg?raw=true" />  
        </div>
        <div id="gameCommands">
          <Button variant='light' onClick={() => navToLogin()}>
              Main Menu
          </Button>
          <Button variant='light' onClick={() => startGame()}>
            Start Game
          </Button>
          <Button variant='light' onClick={() => reachFinishedPage()}>
            Finished
          </Button>
        </div>
      </form>
    </div>
  );
}