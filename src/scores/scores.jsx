import React from 'react';

export function Scores() {
  return (
    // <main className='container-fluid bg-secondary text-center'>
    //   <div>scores displayed here</div>
    // </main>

    <main>
    {/* <!-- Note - Some links Hidden till user logs in --> */}
    <h2 class="new-high-score">New High Score!</h2>
    <div id="scores-structure">
      <h1>High Scores</h1>
      <table>
        <thead>
          <tr>
              <th class="bordertime">#</th>
              <th class="bordertime">Name</th>
              <th class="bordertime">Score</th>
              <th class="bordertime">Date</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td class="bordertime">1</td>
            <td class="bordertime">도윤 이</td>
            <td class="bordertime">34</td>
            <td class="bordertime">May 20, 2024</td>
          </tr>
          <tr>
            <td class="bordertime">2</td>
            <td class="bordertime">Annie James</td>
            <td class="bordertime">29</td>
            <td class="bordertime">January 2, 2025</td>
          </tr>
          <tr>
            <td class="bordertime">3</td>
            <td class="bordertime">Gunter Spears</td>
            <td class="bordertime">7</td>
            <td class="bordertime">December 3, 2024</td>
          </tr>
        </tbody>
      </table>
    </div>
    </main>

  );
}