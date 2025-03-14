import React from 'react';
import Button from 'react-bootstrap/Button';
import { UserIdentification } from './userIdentification';
import { MessageDialog } from './messageDialog';

//import { handleRegister } from './login.jsx';


//RPH - Not yet logged in
export function NonVerified(props) {
  //RPH - Carry the variables over
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  //RPH - Set initial variables, start at "Not Logged In" version
  const currentVerification = userName ? UserIdentification.Verified :  UserIdentification.Unverified;
  const [verifiedState, setVerificationState] = React.useState(currentVerification);

  /**
   * Week 9-10 Apply backend checkup
   */ 
  //Call same function, just one to create, one to update
  async function createAuth(endpoint, interaction) {
    //Ex: endpoint = '/api/auth/create'
    const response = await fetch(endpoint, {
      method: interaction,
      body: JSON.stringify({ userName: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`); 
    }
  }

  async function loginUser() {
    createAuth('/api/auth/login', 'put');
    //firstTry();
  }

  async function createUser() {
    createAuth('/api/auth/create', 'post');
  }

  // async function vs function
  function firstTry(){
    console.log("Create User");
    console.log("C-"+currentVerification+"C");
    console.log("C-"+verifiedState+"C");

    //RPH - Add some scores to the Scores page
    saveScore(7);
    saveScore(95);
    saveScore(76);
    saveScore(20);  

    //RPH - Clear the local storage  
    //localStorage.clear('scores'); 
    
    console.log("D-"+userName+"D");
  }

  function saveScore(score) {
    //const userName = "Jack and Jill";
    const userName = localStorage.getItem('userName');

    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    console.log("A1) " + newScore.name);
    console.log("2) " + newScore.date);
    console.log("3) " + newScore.score);

    //Storage of scores
    let scores = [];
    //Get the scores and split their individual pieces
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    scores.push(newScore);

    // console.log("4) " + scores.length);

    // Let other players know the game has concluded
    // GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

    // updateScoresLocal(newScore);

    //Store the array back into localStorage
    localStorage.setItem('scores', JSON.stringify(scores));

    //RPH - Clear the local storage  
    //localStorage.clear('scores');

  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}