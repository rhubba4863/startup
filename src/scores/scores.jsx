
import React from 'react';
import './scores.css';

export function Scores() {
  //Variable to store the scores
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  // React.useEffect(() => {
  //   const scoresText = localStorage.getItem('scores');
  //   if (scoresText) {
  //     setScores(JSON.parse(scoresText));
  //   }
  // }, []);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/records', {method: 'GET'})
      .then((response) => response.json())
      .then((scores) => {    
        setScores(scores);
      });
  }, []);

  // Demonstrates rendering an array with React
  const practiceScores = [];
  practiceScores.push(practiceScoreGroup());

  const highScoreRows = [];
  let counter = 0;
  if(scores.length){
    for (const [i, score] of scores.entries()) {
      if (counter < 10){
        highScoreRows.push(
          <tr key={i}>  
            <td className="bordertime">{i + 1}</td>
            <td className="bordertime">{score.userName.split('@')[0]}</td>
            <td className="bordertime">{score.score}</td>
            <td className="bordertime">{score.date}</td>
          </tr>
        );
      }

      counter = counter + 1;
      // console.log("counter " + counter);
    }
  }

  sortScores();

  return (
    // <main className='container-fluid bg-secondary text-center'>
    //   <div>scores displayed here</div>
    // </main>

    <main>
      {/* <!-- Note - Some links Hidden till user logs in --> */}
      <h2 className="new-high-score">New High Score!</h2>
      <div id="scores-structure">
        <h1>High Scores</h1>
        <table>
          <thead>
            <tr>
              <th className="bordertime">#</th>
              <th className="bordertime">Username</th>
              <th className="bordertime">Score</th>
              <th className="bordertime">Date</th>
            </tr>
          </thead>
          <tbody id='scores'>
            {/* {practiceScores} */}
            {highScoreRows}
          </tbody>
        </table>
      </div>
    </main>

  );  
}

export function sortScores(){
  //https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them
  //Storage of scores
  let scores = [];
  //Get the scores and split their individual pieces
  const scoresText = localStorage.getItem('scores');
  if (scoresText) {
    scores = JSON.parse(scoresText);
  }

  //Sort the array and place into the array "scores"
  scores.sort((a, b) => (a.score < b.score) ? 1 : -1)    
  localStorage.setItem('scores', JSON.stringify(scores));

  // console.log("All Scores = ")
  // console.log(scores)
}

function practiceScoreGroup(){
  const practiceScores = [];
  practiceScores.push(    
  <tr>
    <td className="bordertime">1</td>
    <td className="bordertime">Spiderman</td>
    <td className="bordertime">7</td>
    <td className="bordertime">05/20/2025</td>
  </tr>);
  practiceScores.push(    
  <tr>
    <td className="bordertime">2</td>
    <td className="bordertime">Jerry</td>
    <td className="bordertime">3</td>
    <td className="bordertime">01/03/2021</td>
  </tr>);
  practiceScores.push(
  <tr>
    <td className="bordertime">3</td>
    <td className="bordertime">Lions</td>
    <td className="bordertime">6</td>
    <td className="bordertime">06/04/02</td>
  </tr>);

  return (
    practiceScores
  )
}

function practiceScore1(){
  return (
    <tr>
      <td className="bordertime">1</td>
      <td className="bordertime">Spiderman</td>
      <td className="bordertime">7</td>
      <td className="bordertime">May 20, 2025</td>
    </tr>
  )
}
