
import React from 'react';
import './scores.css';

export function Scores() {
  //Variable to store the scores
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  // Demonstrates rendering an array with React
  const practiceScores = [];
  practiceScores.push(practiceScore1());
  practiceScores.push(practiceScore2());
  practiceScores.push(practiceScore3());

  const highScoreRows = [];
  if(scores.length){
    for (const [i, score] of scores.entries()) {
      highScoreRows.push(
        <tr key={i}>
          <td className="bordertime">{i + 1}</td>
          <td className="bordertime">{score.name.split('@')[0]}</td>
          <td className="bordertime">{score.score}</td>
          <td className="bordertime">{score.date}</td>
        </tr>
      );
    }
  }

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
            {practiceScores}
            {highScoreRows}
          </tbody>
        </table>
      </div>
    </main>

  );  
}

  // function practiceScores() {
  //   return (
  //     <tr>
  //     <td className="bordertime">1</td>
  //     <td className="bordertime">Spiderman</td>
  //     <td className="bordertime">7</td>
  //     <td className="bordertime">May 20, 2025</td>
  //   </tr>
  //   <tr>
  //     <td className="bordertime">2</td>
  //     <td className="bordertime">Jerry</td>
  //     <td className="bordertime">3</td>
  //     <td className="bordertime">1/3/2021</td>
  //   </tr>
  //   <tr>
  //     <td className="bordertime">3</td>
  //     <td className="bordertime">Lions</td>
  //     <td className="bordertime">06</td>
  //     <td className="bordertime">06/04/02</td>
  //   </tr>
  // };
  // }

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

function practiceScore2(){
  return (
    <tr>
      <td className="bordertime">2</td>
      <td className="bordertime">Jerry</td>
      <td className="bordertime">3</td>
      <td className="bordertime">1/3/2021</td>
    </tr>
  )
}

function practiceScore3(){
  return (
    <tr>
      <td className="bordertime">3</td>
      <td className="bordertime">Lions</td>
      <td className="bordertime">06</td>
      <td className="bordertime">06/04/02</td>
    </tr>
  )
}