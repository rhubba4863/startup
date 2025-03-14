import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './verified.css';

//RPH - Logged in
export function Verified(input) {
  const navigation = useNavigate();

  function logout() {
    fetch('/api/auth/logout', {
      method: 'delete',
    })
    .catch(() => {
      // Logout failed. Assuming offline
    })
    .finally(() => {
      localStorage.removeItem('userName');
      input.onLogout();
    });
  }

  /*
  * RPH Note - figure what button to start focus on 
  * Now logged on to main screen. User can reach the game, or log out
  */
  return(
    <div>
      <div className='playerName'>{input.userName}</div>
      <Button variant='primary' onClick={() => navigation('/play')}>
        Play
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}