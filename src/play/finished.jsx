import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
//import './verified.css';

//RPH - Not yet logged in
export function Finished(input) {
  const navigation = useNavigate();

  function logout() {
    //localStorage.removeItem('userName');
    input.onLogout();
  }

  /*
  * RPH Note - figure what button to start focus on 
  * Now logged on to main screen. User can reach the game, or log out
  */
  return(
    <div>
      USER FINISHED THE GAME
      {/* <div className='playerName'>{input.userName}</div>
      <Button variant='primary' onClick={() => navigation('/play')}>
        Play
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Next
      </Button> */}
    </div>
  );
}