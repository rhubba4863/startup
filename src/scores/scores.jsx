import React from 'react';
import './scores.css';


export function Scores() {
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
          <tbody>
            <tr>
              <td className="bordertime">1</td>
              <td className="bordertime">Spiderman</td>
              <td className="bordertime">7</td>
              <td className="bordertime">May 20, 2025</td>
            </tr>
            <tr>
              <td className="bordertime">2</td>
              <td className="bordertime">Jerry</td>
              <td className="bordertime">3</td>
              <td className="bordertime">1/3/2021</td>
            </tr>
            <tr>
              <td className="bordertime">3</td>
              <td className="bordertime">Lions</td>
              <td className="bordertime">06</td>
              <td className="bordertime">06/04/02</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

  );
}