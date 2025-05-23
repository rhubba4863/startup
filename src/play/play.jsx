import React from 'react';
//import React, { useState, useEffect } from 'react';

// Figure CSS format later
import './play1.css';

//Return the main functions of each site to later call below
import { PlayState } from './playState';
import { Playing } from './playing';
import { Finished } from './finished';
import { PreGame } from './preGame';
import { Players } from './players';

/*
*RPH - suggest ways to enhance the user experience (UX)
* Color/audio/(motion of hands)(Fireworks) if right/wrong answer
*
* Column for number of times/games played. switch filter on username, highest score,
* or who played the most
*/
const roundNumber = 1;
const totalRounds = 10;
const totalRightAnswers = 0;

//Slide-in Method 2
// Sliding attempts

let productShown = false;
async function slideObject(){
  const element = document.getElementsByClassName('new-high-score');

  //changeObjectview();
  if (productShown){
    //Move out
    //element[0].style.transform = 'translateX(200px)'; // Move right off-screen
    element[0].style.animation = 'fly-off-right 5s ease-out'; // Move right off-screen
    element[0].style.backgroundColor = "blue";

    productShown = false;
  }else{
    productShown = true;

    //Bring in
     element[0].style.animation =  'fly-from-right 5s ease-out';
     element[0].style.backgroundColor = "red";

    //element[0].style.transform = 'translateX(-200px)'; // Move right off-screen
  }
}

setInterval(slideObject, 5000);

/*
Maybe add background hehind the question box
responsive design 
 */
export function Play({ userName, playState, onPlayChange }) {

  document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('sliding-text');
    textElement.classList.add('slide-in');
  });

  return (
    <main className="container-fluid bg-secondary text-center">  
      {/* Rph Need to place game notifications */}
          
      {/* Note - Some links Hidden till user logs in*/}
      {/* Slide Atempt 1 */}
      <h2 className="new-high-score">New High Score!</h2>
      
      {/* Display all notices between players */}
      <Players/>

      {/* Game box for user to start and play game */}
      <div id="guessing-structure-box">
        {/* Decide which Play page/features to show  */}
        {playState === PlayState.Playing && (        
          <Playing
            userName={userName} 
            roundNumber={roundNumber}
            totalRounds={totalRounds}
            totalRightAnswers={totalRightAnswers}

            // RPH - Here is method sub-page calls on to switch sub-pages
            onGameCompletion={() => {
              onPlayChange( PlayState.Finished);
            }}

            onGameCancel={() => {
              onPlayChange( PlayState.Pregame);
            }}
          />
        )}

        {playState === PlayState.Finished && (        
          <Finished
            userName={userName} 
            totalRightAnswers={totalRightAnswers}

            onStartPlayingGame={() => {
              onPlayChange( PlayState.Playing);
            }}
          />
        )}

        {playState === PlayState.Pregame && (        
          <PreGame
            userName={userName} 
            
            onStartPlayingGame={() => {
              onPlayChange( PlayState.Playing);
            }}

            onGameCompletion={() => {
              onPlayChange( PlayState.Finished);
            }} 
          />
        )}

      </div>
    </main>
  );
}