import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
//import './verified.css';

//RPH - User begins playing the game
export function Playing(input) {
  const navigation = useNavigate();
  //RPH - Carry the variables over
  const [totalRounds, setTotalRounds] = React.useState(input.totalRounds);
  const [roundNumber, setRoundNumber] = React.useState(input.roundNumber);
  const [totalRightAnswers, setTotalRightAnswers] 
    = React.useState(0);
  const [questionGuessed, setQuestionGuessed] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState("John Wayne");

  React.useEffect(() => {
    console.log("0Score "+ totalRightAnswers);
    localStorage.setItem('totalRightAnswers', totalRightAnswers);
  }, [totalRightAnswers]);

  function checkAnswer(guess){
    // Only edit if user has not yet guessed
    if(questionGuessed == false){
      changeDisplay();
      setQuestionGuessed(true); 
      //Compare guess to the right answer
      if (guess.toLowerCase().includes(correctAnswer.toString().toLowerCase())){
        setTotalRightAnswers(prevTotal => prevTotal+ 1);

        changeDisplay();
        setQuestionGuessed(true);
      }
    }
  }

  //Bring up next question, or show final score/page 
  function nextQuestion(){
    setRoundNumber(roundNumber+1);

    resetDisplay();
    
    //Determine when to return the values to the parent 
    if(roundNumber >= totalRounds){
      saveToLocalStorage();
      reachFinishedPage();
    }
  }

  //Save the score among high scores
  async function saveScore(score) {
    //const userName = "Jack and Jill";
    const userName = localStorage.getItem('userName');

    const date = new Date().toLocaleDateString();
    const newScore = { userName: userName, score: score, date: date };

    await fetch('/api/score', { 
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newScore),
    });

    saveToLocalStorage();
  }

  //Change color of buttons to Green/Red
  function changeDisplay(buttonClicked, answer){
    //let myButton = document.getElementById("myButton");
    let finalAnswer = "John Wayne";

    for (let x = 1; x<5; x++){
      let option = document.getElementById("option0"+x);
      let text = option.textContent;

      //console.log("G"+text+"G");
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
      if (text.toLowerCase().includes(finalAnswer.toString().toLowerCase())){
        option.className='btn btn-success answer';
      }else{
        option.className='btn btn-danger wrong';
      }
    }
  }

  //Change color of buttons to White
  function resetDisplay(){
    //https://getbootstrap.com/docs/4.0/components/buttons/

    for (let x = 1; x<5; x++){
      let option = document.getElementById("option0"+x);
      option.className='btn btn-light';
    }

    setQuestionGuessed(false);
  }

  //Reset values and display to original (10/0/1)
  function restartGame(){
    setTotalRounds(10);
    setRoundNumber(1);
    setTotalRightAnswers(0)

    saveToLocalStorage();
    resetDisplay();
  }

  //Save values to "localStorage"
  function saveToLocalStorage(){
    //localStorage.roundNumber;
    localStorage.setItem('roundNumber', roundNumber);
    localStorage.setItem('totalRounds', totalRounds);
    localStorage.setItem('totalRightAnswers', totalRightAnswers);
  }

  //Cancel Game, send user to "PreGame" subpage
  function reachPreGamePage(){
    restartGame();
    //Call to "play.jsx" to shift to sub-page
    input.onGameCancel();
  }

  //Once all questions answered, send user to "finished" subpage
  function reachFinishedPage(){
    saveScore(totalRightAnswers);
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
        <div id="step-and-score">
          <div style={{'width' : '40%', textAlign: 'right' }}
           /*float={right}*/>Round {roundNumber}/{totalRounds}</div>
          <div style={{'width' : '40%', textAlign: 'right'}} 
           /*float={right}*/>Score {totalRightAnswers}/{totalRounds}</div>
        </div>

        <div className="button-row">
          <Button id="option01" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer("John Wayne")}>
            John Wayne
          </Button>
          <Button id="option02" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer("Gary Cooper")}>
            Gary Cooper
          </Button>
        </div> 
        <div className="button-row">
          <Button id="option03" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer("Clint Eastwood")}>
            Clint Eastwood
          </Button>
          <Button id="option04" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer("Henry Fonda")}>
            Henry Fonda
          </Button>
        </div> 

        <div id="gameCommands">
          <Button variant='light' onClick={() => reachPreGamePage()}>
            Cancel Game
          </Button>
          <Button variant='light' onClick={() => restartGame()}>
            Restart
          </Button>
          <Button variant='light' onClick={() => nextQuestion()}>
            Next
          </Button>

          {/* Perhaps remove "Finished" once game completed */}
          <Button variant='light' onClick={() => reachFinishedPage()}>
            Finished
          </Button>
        </div>
      </form>
    </div>
  );
}