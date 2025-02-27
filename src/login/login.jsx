import React from 'react';
// Figure CSS format later
// import './app.css';

import { UserIdentification } from './userIdentification';
import { Verified } from './verified';
import { NonVerified } from './nonverified';


export function Login({ userName, verifiedState, onVerifyChange }) {
  return (
    <main className="container-fluid bg-secondary text-center">      
      {/* <!-- Note - Some links Hidden till user logs in --> */}
      <h2 className="new-high-score">New High Score!</h2>

      <div>
        {/* Decide which Login page/features to show  */}

        {verifiedState !== UserIdentification.Unknown && <h1>Welcome back to Trivia</h1>}

        {verifiedState === UserIdentification.Verified && (
          <Verified 
            userName={userName} 
            onLogout={() => 
            onVerifyChange(userName, UserIdentification.Unverified)} />
        )}
        
        {verifiedState === UserIdentification.Unverified && (
          <NonVerified
            userName={userName}
            onLogin={(loginUserName) => {
              onVerifyChange(loginUserName, UserIdentification.Verified);
            }}
          />
        )}
      </div>
    </main>
  );
}