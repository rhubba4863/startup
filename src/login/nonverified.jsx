import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';


// import Button from 'react-bootstrap/Button';
//import './nonverified.css';

//RPH - Not yet logged in
export function NonVerified(props) {

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }


  return(
    <div>Not Logged in</div>
  );
}