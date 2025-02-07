import React from 'react';
// Figure CSS format later
// import './app.css';


export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">      
      {/* <!-- Note - Some links Hidden till user logs in --> */}
      <h2 className="new-high-score">New High Score!</h2>

      <div>
        <h1>Welcome to Trivia</h1>
        <form method="get" action="play.html">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control"type="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="submit" className="btn btn-secondary">Create</button> 
        </form>
      </div>
    </main>
  );
}