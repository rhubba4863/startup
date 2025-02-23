import React from 'react';
//import React, { useState, useEffect } from 'react';

// Figure CSS format later
import './play1.css';

//Return the main functions of each site to later call below
import { PlayState } from './playState';
import { Playing } from './playing';
import { Finished } from './finished';

/*
*RPH - suggest ways to enhance the user experience (UX)
* Color/audio/(motion of hands)(Fireworks) if right/wrong answer

* Column for number of times/games played. switch filter on username, highest score,
* or who played the most
*/
const roundNumber = 1;
const totalRounds = 10;
const totalRightAnswers = 0;
let text = 'people';

//Slid-in Method 2
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

//Timer wait



/*
Maybe add background hehind the question box
responsive design 
 */
export function Play({ playState, onPlayChange }) {
  function currentValues(){
    console.log("Play Page");
    console.log("D"+onPlayChange+"D");
    console.log("D"+playState+"D");  

    console.log("D"+roundNumber+"D"); 
    console.log("D"+totalRounds+"D"); 
    console.log("D"+totalRightAnswers+"D"); 
  }
  
  currentValues();

  document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('sliding-text');
    textElement.classList.add('slide-in');
  });

  return (
    <main className="container-fluid bg-secondary text-center">  
          
      {/* <!-- Note - Some links Hidden till user logs in --> */}
      <h2 className="new-high-score">New High Score!</h2>
      {/* Slide Atempt 2 */}
      {SlidingText('John')}

      <div>
        {/* Decide which Play page/features to show  */}
        {playState === PlayState.Playing && (        
          <Playing
            roundNumber={roundNumber}
            totalRounds={totalRounds}
            totalRightAnswers={totalRightAnswers}

            onLogin={() => {
              onPlayChange( PlayState.Finished);
            }}
          />
        )}

        {playState === PlayState.Finished && (        
          <Finished
            onLogin={() => {
              onPlayChange( PlayState.Playing);
            }}
          />
        )}

      </div>
    </main>
  );

// export function Play() {
//   return (
//     // <main className='container-fluid bg-secondary text-center'>
//     //   <div>play displayed here</div>
//     // </main>

//     <main>
//       {/* <!-- Note - Some links Hidden till user logs in --> */}
//       <h2 className="new-high-score">New High Score!</h2>
//       <div id="guessing-structure">
//         <h1>Name That... Actor</h1> <div>  Username</div>
//         <form method="get" action="play.html">
//           <div>
//             {/* <!-- Hold Image to Display --> */}
//             <img alt="Arches" height={150} src="https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg?raw=true" />  
//           </div>
//           <div id="step-and-score">
//             <div style={{'width' : '40%', textAlign: 'right' }} /*float={right}*/>Round 0/10</div>
//             <div style={{'width' : '40%', textAlign: 'right'}} /*float={right}*/>Score 0/10</div>
//           </div>

//           <div className="button-row">
//             <button id="option1" style={{'width' : '45%'}} /*type="submit"*/>John Wayne</button>
//             <button id="option2" style={{'width' : '45%'}} type="submit">Gary Cooper</button>
//           </div>
//           <div className="button-row">
//             <button id="option3" style={{'width' : '45%'}} type="submit">Clint Eastwood</button>
//             <button id="option4" style={{'width' : '45%'}} type="submit">Henry Fonda</button>
//           </div> 

//           <button id="restart-button" type="submit">Restart</button>
//           <button id="next-button" type="submit">Next</button>
//         </form>
//       </div>
//     </main>
//   );
}