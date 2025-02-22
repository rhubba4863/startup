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
  const [questionGuessed, setQuestionGuessed] = React.useState(false);

  function logout() {
    //localStorage.removeItem('userName');
    input.onLogout();
  }

  function checkAnswer(){
    // Only edit if user has not yet guessed
    if(questionGuessed == false){
      setTotalRightAnswers(totalRightAnswers+1);
      changeDisplay();
      setQuestionGuessed(true);
    }
  }

  function nextQuestion(){
    setRoundNumber(roundNumber+1);

    resetDisplay();
    
    //console.log("E"+input.totalRounds+"E"); 
    //console.log("E"+totalRounds+"E");
    //console.log("F"+input.totalRightAnswers+"G"); 
    //console.log("F"+totalRightAnswers+"G"); 

    //Determine when to return the values to the parent 
    // if(roundNumber >=10){
    //   localStorage.setItem('userName', userName);
    // }
  }

  function changeDisplay(buttonClicked, answer){
    // document.getElementById("option1").className="correct";
    // document.getElementById("option2").className="wrong";
    // document.getElementById("option3").className="wrong";
    // document.getElementById("option4").className="wrong";

    //document.getElementById("option03").variant='success';
    // document.getElementById("option02").variant='success';
    // document.getElementById("option03").className='btn btn-danger wrong';
    // document.getElementById("option04").className='btn btn-success answer';

    //let myButton = document.getElementById("myButton");
    let finalAnswer = "John Wayne";

    for (let x = 1; x<5; x++){
      let option = document.getElementById("option0"+x);
      let text = option.textContent;

      console.log("G"+text+"G");
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
      if (text.toLowerCase().includes(finalAnswer.toString().toLowerCase())){
        option.className='btn btn-success answer';
      }else{
        option.className='btn btn-danger wrong';
      }
    }
  }

  function resetDisplay(){
    //https://getbootstrap.com/docs/4.0/components/buttons/

    for (let x = 1; x<5; x++){
      let option = document.getElementById("option0"+x);
      option.className='btn btn-light';
    }

    setQuestionGuessed(false);
  }

  function restartGame(){
    setTotalRounds(10);
    setRoundNumber(1);
    setTotalRightAnswers(0)

    localStorage.setItem('roundNumber', roundNumber);
    localStorage.setItem('totalRounds', totalRounds);
    localStorage.setItem('totalRightAnswers', totalRightAnswers);
   
    resetDisplay();
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
          <Button id="option01" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer()}>
            John Wayne
          </Button>
          <Button id="option02" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer()}>
            Gary Cooper
          </Button>
        </div> 
        <div className="button-row">
          <Button id="option03" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer()}>
            Clint Eastwood
          </Button>
          <Button id="option04" variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer()}>
            Henry Fonda
          </Button>
        </div> 

        <Button variant='light' onClick={() => restartGame()}>
            Restart
        </Button>
        <Button variant='light' onClick={() => nextQuestion()}>
          Next
        </Button>
      </form>
    </div>
  );
}