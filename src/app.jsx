import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//RPH Note - import to remove the javascript for the jsx files and have Bootstrap continue
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

//import Modal from "react-bootstrap/Modal";
//https://www.pluralsight.com/resources/blog/guides/working-with-bootstraps-modals-react

// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { UserIdentification } from './login/userIdentification';


export default function App() {
  //RPH - Set initial variables, start at "Not Logged In" version
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentVerification = userName ? UserIdentification.Verified :  UserIdentification.Unverified;
  const [verifiedState, setVerificationState] = React.useState(currentVerification);


  // async function vs function
  function firstTry(){
    console.log("first print");

    // saveScore(7);
    // saveScore(95);
    // saveScore(76);
    // saveScore(20);  
    //RPH - Clear the local storage  
    //localStorage.clear('scores'); 
  }

  firstTry();


  async function saveScore(score) {
    // const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const userName = "Jack";

    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    // console.log("A1) " + newScore.name);
    // console.log("2) " + newScore.date);
    // console.log("3) " + newScore.score);


    //Storage of scores
    let scores = [];
    //Get the scores and split their individual pieces
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    scores.push(newScore);

    // console.log("4) " + scores.length);

    // Let other players know the game has concluded
    // GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

    // updateScoresLocal(newScore);

    //Store the array back into localStorage
    localStorage.setItem('scores', JSON.stringify(scores));

    //RPH - Clear the local storage  
    //localStorage.clear('scores');

  }

  return (
    // BrowserRouter will handle all
    <BrowserRouter>
      {/* // <!-- Figure how to set the minimum size " min-w-700" --> */}
      <div className="body bg-dark text-light">
        {/* <!-- Use header, main, and footer elements to give semantic structure --> */}
        <header className="container-fluid">

          {/* <!-- Note - perhaps remove "fixed-top" if header is to be scrolled out of view --> */}
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to=''>Trivia</NavLink >
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='login'>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to='play'>Play</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to='scores'>Scores</NavLink>
                  </li>

                  {/* <!-- <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                  </li> --> */}
                </ul>
                {/* <!-- <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form> --> */}

                
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" 
                data-bs-target="#exampleModal" id="modal-load-button">
                  Details
                </button>
              </div>
              {/* <!-- Button trigger modal --> */}
              {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" 
              data-bs-target="#exampleModal" id="modal-load-button">
                .....
              </button> */}
            </div>
          </nav>  
          
          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Trivia Instructions</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Trivia is a knowledge game where you receive questions and choose between the possible options for the correct answer.
                  By clicking start/restart you begin a new game. 
                  <br></br>
                  <br></br>
                  <b>“Be brave. Take risks. Nothing can substitute experience.” By Paulo Coelho</b>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* App components go here*/}
        <Routes>
          {/* <Route path='/login' element={<Login />} exact /> */}
          <Route
            path='/login'
            element={
              <Login
                userName={userName}
                verifiedState={verifiedState}
                onVerifyChange={(userName, verifiedState) => {
                  setVerificationState(verifiedState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/play' element={<Play />} />
          <Route path='/scores' element={<Scores />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        {/* <!-- Footer and Link --> */}
        <footer className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="text-reset">Author: Robert (Parker) Hubbard</span>
            <a className="text-reset" href="https://github.com/rhubba4863/startup">GitHub Site</a>
          </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
        crossOrigin="anonymous">
        </script>

      </div>
    </BrowserRouter>
  )
}

// RPH - What to display in Main if wrong website 
function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}