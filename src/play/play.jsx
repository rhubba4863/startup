import React from 'react';
// Figure CSS format later
import './play1.css';

export function Play() {
  return (
    // <main className='container-fluid bg-secondary text-center'>
    //   <div>play displayed here</div>
    // </main>

    <main>
      {/* <!-- Note - Some links Hidden till user logs in --> */}
      <h2 className="new-high-score">New High Score!</h2>
      <div id="guessing-structure">
        <h1>Name That... Actor</h1> <div>  Username</div>
        <form method="get" action="play.html">
          <div>
            {/* <!-- Hold Image to Display --> */}
            <img alt="Arches" height={150} src="https://cdn.britannica.com/82/136182-050-6BB308B7/John-Wayne.jpg?raw=true" />  
          </div>
          <div id="step-and-score">
            <div style={{'width' : '40%', textAlign: 'right' }} /*float={right}*/>Round 0/10</div>
            <div style={{'width' : '40%', textAlign: 'right'}} /*float={right}*/>Score 0/10</div>
          </div>

          <div className="button-row">
            <button id="option1" style={{'width' : '45%'}} type="submit">John Wayne</button>
            <button id="option2" style={{'width' : '45%'}} type="submit">Gary Cooper</button>
          </div>
          <div className="button-row">
            <button id="option3" style={{'width' : '45%'}} type="submit">Clint Eastwood</button>
            <button id="option4" style={{'width' : '45%'}} type="submit">Henry Fonda</button>
          </div> 

          <button id="restart-button" type="submit">Restart</button>
        </form>
      </div>
    </main>
  );
}