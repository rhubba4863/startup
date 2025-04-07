import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { PlayState, GameNotification } from './gameNotification';

//import './verified.css';

//RPH - User begins playing the game
export function Playing(input) {
  //RPH - Carry the variables over
  const [totalRounds, setTotalRounds] = React.useState(input.totalRounds);
  const [roundNumber, setRoundNumber] = React.useState(input.roundNumber);
  const [totalRightAnswers, setTotalRightAnswers] = React.useState(0);
  const [questionGuessed, setQuestionGuessed] = React.useState(false);

  //Question Segments
  const [correctAnswer, setCorrectAnswer] = React.useState("Loading...");
  const [finalCode, setFinalCode] = React.useState('Loading...'); 
  const [buttonOptions, setButtonOptions] = React.useState(["Z","Y","X","W"]); 

  /**
   * React useState to edit the array
   */
  React.useEffect(() => {
    localStorage.setItem('totalRightAnswers', totalRightAnswers);
  }, [totalRightAnswers]);

  //Initially grab all data
  React.useEffect(() => {
    // Grab first question data
    fetch('/api/question/reset', {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFinalCode(data);
      setCorrectAnswer(data.answer);
      setButtonOptions([data.answer, data.wrong1, data.wrong2, data.wrong3]);

      // console.log("My New ANSWER"+data.answer);
      // console.log("My New Wrong"+data.wrong2);
      // console.log("XXMy New ANSWER"+correctAnswer);
    })
  }, []);

  /**
   * Compare the answer to the button selected
   */
  function checkAnswer(guess){
    // Only edit if user has not yet guessed
    if(questionGuessed == false){
      changeDisplay();
      setQuestionGuessed(true); 
      //Compare guess to the right answer
      if (guess.option.toString().toLowerCase().includes(correctAnswer.toString().toLowerCase())){
        setTotalRightAnswers(prevTotal => prevTotal+ 1);
        changeDisplay();
        setQuestionGuessed(true);
      }
    }
  }

  /**
   * RPH - 2 STEPS TO BEGIN CALLING ON NEW QUESTIONS
   *  Bring up next question, or show final score/page 
   */
  async function nextQuestion(){
    setRoundNumber(roundNumber+1);
    //Change buttons to white
    resetDisplay();
    
    //Determine when to return the values to the parent 
    if(roundNumber >= totalRounds){
      saveToLocalStorage();
      //Note - broadcasting event alreading within "reachFinishedPage() method"
      //Send news/notification to other players that a game has just finished
      reachFinishedPage();
    }else{
      //Setup new 10 questions data
      const response = await fetch('/api/question/set', {
        method: 'post',
        body: JSON.stringify({ number: (roundNumber-1) }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
      .then((data) => {
      })

      //Grab new question data
      await fetch('/api/question/get', {
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
      .then((data) => {
        setFinalCode(data);
        setCorrectAnswer(data.answer);

        let buttonOptions2 = [data.answer, data.wrong1, data.wrong2, data.wrong3];
        setButtonOptions(shuffleArray(buttonOptions2));
      })
    }
  }

  
/**
 * Save Values and reset display
 */
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

  //Change color of buttons to Green/Red - OLD
  function changeDisplay(){
    setCorrectAnswer(finalCode.answer);
    // console.log("ANSWER"+finalCode.answer);
    // console.log("ANSWER"+correctAnswer);

    for (let x = 1; x<5; x++){
      let option = document.getElementById("option0"+x);
      let text = option.textContent;

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
      if (text.toLowerCase().includes(correctAnswer.toString().toLowerCase())){
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

    GameNotification.broadcastEvent(input.userName, PlayState.Playing, {});
  }

  //Save values to "localStorage"
  function saveToLocalStorage(){
    //Reach using "localStorage.roundNumber";
    localStorage.setItem('roundNumber', roundNumber);
    localStorage.setItem('totalRounds', totalRounds);
    localStorage.setItem('totalRightAnswers', totalRightAnswers);
  }

  /**
   * Navigation
   */
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

    //Send news/notification to other players that a game has just finished
    GameNotification.broadcastEvent(input.userName, PlayState.Finished, {totalRightAnswers});
  }

   
  /**1 Option */
  function makeOption(option, optionId){
    return(
      <Button id={optionId} variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer({option})}>
       {/* <Button id={optionId} variant='light' style={{'width' : '45%'}}> */}
        {option}
      </Button>
    )
  } 

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function presentQuestionBox(){
    //const buttonOptions = [finalCode.answer, finalCode.wrong1, finalCode.wrong2, finalCode.wrong3];
    let shuffledArray = buttonOptions;

    //Checks that the data is not null    
    if(!finalCode){
      return (
        <div>loading...</div>
      )
    }  

    return( 
      <div className="Movie">
        <div>{finalCode.question}</div>
        <div className="button-row">
          {makeOption(shuffledArray[0]+"", "option01")}
          {makeOption(shuffledArray[1]+"", "option02")}
        </div> 
        <div className="button-row">
          {makeOption(shuffledArray[2]+"", "option03")}
          {makeOption(shuffledArray[3]+"", "option04")}
        </div>      
      </div>)

      // Example of adding rows with values
      {/* <div className="button-row">
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
      </div>  */}
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
          <div style={{'width' : '40%', textAlign: 'right' }}>
            Round {roundNumber}/{totalRounds}</div>
          <div style={{'width' : '40%', textAlign: 'right'}}>
            Score {totalRightAnswers}/{totalRounds}</div>
        </div>

        {presentQuestionBox()}

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