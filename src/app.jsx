import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  // Note - RPH just put a line on the screen
  // return <div className='body bg-dark text-light'>App will display here</div>;

  return (
    // <!-- Figure how to set the minimum size " min-w-700" -->
    <div className="body bg-dark text-light">
      {/* <!-- Use header, main, and footer elements to give semantic structure --> */}
      <header className="container-fluid">

        {/* <!-- Note - perhaps remove "fixed-top" if header is to be scrolled out of view --> */}
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Trivia</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="play.html">Play</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="scores.html">Scores</a>
                </li>

                {/* <!-- <li class="nav-item">
                  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> --> */}
              </ul>
              {/* <!-- <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form> --> */}
              
              {/* <!-- Button trigger modal --> */}
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="modal-load-button">
                Launch demo modal AGAIN
              </button>
            </div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="modal-load-button">
              Launch demo modal AGAIN
            </button>
          </div>
        </nav>  
        
        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>App components go here</main>

      {/* <!-- Footer and Link --> */}
      <footer className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="text-reset">Author: Robert (Parker) Hubbard</span>
          <a className="text-reset" href="https://github.com/rhubba4863/startup">GitHub Site</a>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
      crossorigin="anonymous">
      </script>

    </div>
  )
}