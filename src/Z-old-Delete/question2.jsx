import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Question(input) { 
    const [questions, setQuestion] = React.useState('Loading...');
    const [correctAnswer, setCorrectAnswer] = React.useState("John Wayne");
    const [wrongOption1, setWrongOption1] = React.useState('Loading...');
    const [wrongOption2, setWrongOption2] = React.useState('Loading...');
    const [wrongOption3, setWrongOption3] = React.useState('Loading...');
    const [finalCode, setFinalCode] = React.useState('Loading...');

    let allData;
    useEffect(() => {
       // Grab question data
     fetch('/api/question/get', {
       method: 'get',
       headers: {
         'Content-type': 'application/json; charset=UTF-8',
       },
     }).then((response) => response.json())
     .then((data) => {
       allData = data;
       setFinalCode(data);
     })
     }, []); //if empty, will use once at the beginning

    //Create New questions
    async function grabQuestions(){
      // https://opentdb.com/api.php?amount=10&category=11&type=multiple
      //{"author":"Linus Torvalds","quote":"Talk is cheap. Show me the code."}
  
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        console.log("0PARK:"+ data);
        console.log("1PARK:"+ data.results);
        console.log("2PARK:"+ data.results[0].question);
        console.log("3PARK:"+ data.results[0].correct_answer);
        console.log("4PARK:"+ data.results[0].incorrect_answers);
        console.log("5PARK:"+ data.results[0].incorrect_answers[0]);
        console.log("6PARK:"+ data.results[0].incorrect_answers[1]);
        console.log("7PARK:"+ data.results[0].incorrect_answers[2]);
  
  
        //roundNumber
        let q = data.results[0].question;
        q.toString().replace("&quot;", "")
        setQuestion(q);
        //setQuestion(data.results[0].question);
        //setCorrectAnswer(data.results[0].correct_answer);
        setWrongOption1(data.results[0].incorrect_answers[0]);
        setWrongOption2(data.results[0].incorrect_answers[1]);
        setWrongOption3(data.results[0].incorrect_answers[2]);
  
        let Random = Math.floor(Math.random() * 4)
        console.log("Random"+Random);
  
  
        //document.getElementById("demo").innerHTML =
        //Math.floor(Math.random() * 10);
      })
  
      console.log("QUOTE:"+ questions);
    }
  
  
    function editQuestions(){
      let counter = 0;
      let Random = Math.floor(Math.random() * 4) +1
      const wrongOptions = [wrongOption1, wrongOption2, wrongOption3];
  
      for (let x = 1; x<5; x++){
        let option = document.getElementById("option0"+x);
        console.log("X "+Random);
             
        if (x.toString() == Random.toString()){
          option.textContent = correctAnswer;
          option.onclick = function() { checkAnswer(correctAnswer); }
          option.className='btn btn-success answer';
          console.log("Choice 1 "+Random.toString()+" X " + x.toString());
        }else{
          option.textContent = wrongOptions[counter];
          option.onclick = function() { checkAnswer(wrongOptions[counter]); }
          option.className='btn btn-danger wrong';
          counter = counter +1;
          
          console.log("Choice 2 "+Random.toString()+" X " + x.toString());
  
        }
      }
    }

  /**
   * First create The Questions on the screen 
   */  
  function addBlankQuestions(){
    return( 
      <div >
        <div>{questions}</div>
        <div className="button-row">
          {makeOption("AA", "option01")}
          {makeOption("BB", "option02")}
        </div> 
        <div className="button-row">
          {makeOption("CC", "option03")}
          {makeOption("DD", "option04")}
        </div>      
      </div>)
  }
  
  function addFirstQuestion(){ 
    //Checks that the data is not null    
    if(!finalCode){
      return (
        <div>loading...</div>
      )
    }

    if(finalCode){
   return( 
     <div >
       <div>{finalCode.question}</div>
       <div className="button-row">
         {makeOption(finalCode.wrong1, "option01")}
         {/* {makeOption("AA", "option01")} */}
         {makeOption(finalCode.wrong3, "option02")}
       </div> 
       <div className="button-row">
         {makeOption(finalCode.answer, "option03")}
         {makeOption(finalCode.wrong2, "option04")}
       </div>      
     </div>)
    }
 }

  /**1 Option */
  function makeOption(option, optionId){
    return(
       <Button id={optionId} variant='light' style={{'width' : '45%'}} onClick={() => checkAnswer({option})}>
      {/* <Button id={optionId} variant='light' style={{'width' : '45%'}}> */}
        {option}
      </Button>
    )
  } 

  

  // grabQuestions();
  // editQuestions();

  return( 
    // <>
    // { sub && <div className="Movie">
    //   {sub}
    //   HELP
    // </div>}
    // </>
    <div className="Movie">
      {addFirstQuestion()}
      HELP
    </div>)

}

//export editQuestions;

// module.exports = {
//   editQuestions2: editQuestions,
//   Question: Question,
// };
