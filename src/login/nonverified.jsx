import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import { MessageDialog } from './messageDialog';


// import Button from 'react-bootstrap/Button';
//import './nonverified.css';
import { UserIdentification } from './userIdentification';


//RPH - Not yet logged in
export function NonVerified(props) {
  //RPH - Carry the variables over
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  // const [displayError, setDisplayError] = React.useState(null);

  
  //RPH - Set initial variables, start at "Not Logged In" version
  const currentVerification = userName ? UserIdentification.Verified :  UserIdentification.Unverified;
  const [verifiedState, setVerificationState] = React.useState(currentVerification);


  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);

    //Get The variables
    // const scoresText = localStorage.getItem('userName');
    // console.log("Username = "+scoresText);
    firstTry();
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  // async function vs function
  function firstTry(){
    console.log("Create User");
    console.log("C-"+currentVerification+"C");
    console.log("C-"+verifiedState+"C");

    //RPH - Add some scores to the Scores page
    // saveScore(7);
    // saveScore(95);
    // saveScore(76);
    // saveScore(20);  

    //RPH - Clear the local storage  
    //localStorage.clear('scores'); 
    
    // userName = 
    console.log("D-"+userName+"D");
    console.log("D-"+localStorage.getItem('userName')+"D");
  }

  function saveScore(score) {
    //const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
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

  // return(
  //   <div>Not Logged in</div>
  // );

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

      {/* <MessageDialog message={displayError} onHide={() => setDisplayError(null)} /> */}
    </>
  );
}