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
                <th className="bordertime">Name</th>
                <th className="bordertime">Score</th>
                <th className="bordertime">Date</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bordertime">1</td>
              <td className="bordertime">도윤 이</td>
              <td className="bordertime">34</td>
              <td className="bordertime">May 20, 2024</td>
            </tr>
            <tr>
              <td className="bordertime">2</td>
              <td className="bordertime">Annie James</td>
              <td className="bordertime">29</td>
              <td className="bordertime">January 2, 2025</td>
            </tr>
            <tr>
              <td className="bordertime">3</td>
              <td className="bordertime">Gunter Spears</td>
              <td className="bordertime">7</td>
              <td className="bordertime">December 3, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

  );
}