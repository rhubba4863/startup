import React from 'react';
//import React, { useState, useEffect } from 'react';

// Figure CSS format later
import './play1.css';

//Return the main functions of each site to later call below
import { PlayState } from './playState';
import { Playing } from './playing';
import { Finished } from './finished';
import { PreGame } from './preGame';

/*
*RPH - suggest ways to enhance the user experience (UX)
* Color/audio/(motion of hands)(Fireworks) if right/wrong answer

* Column for number of times/games played. switch filter on username, highest score,
* or who played the most
*/
const roundNumber = 1;
const totalRounds = 10;
const totalRightAnswers = 0;

//Slide-in Method 2
// Sliding attempts
const SlidingText = ( text ) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Trigger the animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  return (
    <div className={`sliding-text ${isVisible ? 'visible' : ''}`}>
      {text} Happy
    </div>
  );
};

let productShown = false;
async function slideObject(){
  const element = document.getElementsByClassName('new-high-score');

  //changeObjectview();
  if (productShown){
    console.log("1) on  5 seconds "+ productShown);
    console.log("1) called");

    //Move out
    //element[0].style.transform = 'translateX(200px)'; // Move right off-screen
    element[0].style.animation = 'fly-off-right 5s ease-out'; // Move right off-screen
    element[0].style.backgroundColor = "blue";

    productShown = false;
  }else{
    console.log("2) off 5 seconds "+ productShown);
    console.log("2) ");
    productShown = true;

    //Bring in
     element[0].style.animation =  'fly-from-right 5s ease-out';
     element[0].style.backgroundColor = "red";

    //element[0].style.transform = 'translateX(-200px)'; // Move right off-screen
  }
}

setInterval(slideObject, 5000);

//animation: fly-from-right 1s ease-out;
const changeObjectview = () => {
  const element = document.getElementsByClassName('new-high-score');
  console.log("Element 1:",element);
  console.log("Element 2:",element[0]);

  element[0].style.backgroundColor = 'blue';
  element[0].style.animation = 'animation: fly-from-right 4s ease-out';
};




/*
Maybe add background hehind the question box
responsive design 
 */
export function Play({ userName, playState, onPlayChange }) {
  /*function currentValues(){
    console.log("Play Page");
    console.log("D"+onPlayChange+"D");
    console.log("D"+playState+"D");  

    console.log("D"+roundNumber+"D"); 
    console.log("D"+totalRounds+"D"); 
    console.log("D"+totalRightAnswers+"D"); 
  }
  
  currentValues();*/

  document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('sliding-text');
    textElement.classList.add('slide-in');
  });

  return (
    <main className="container-fluid bg-secondary text-center">  
          
      {/* <!-- Note - Some links Hidden till user logs in --> */}
      {/* Slide Atempt 1 */}
      <h2 className="new-high-score">New High Score!</h2>
      {/* Slide Atempt 2 */}
      {/* {SlidingText('John')} */}

      <div>
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
            roundNumber={localStorage.roundNumber}
            totalRounds={localStorage.totalRounds}
            totalRightAnswers={localStorage.totalRightAnswers}
            
            onStartPlayingGame={() => {
              onPlayChange( PlayState.Playing);
            }}
          />
        )}

        {playState === PlayState.Pregame && (        
          <PreGame
            userName={userName} 
            /*roundNumber={localStorage.roundNumber}
            totalRounds={localStorage.totalRounds}
            totalRightAnswers={localStorage.totalRightAnswers}*/
            
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