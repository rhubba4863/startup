# Name That

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

RPH - Do you love naming animals at the zoo, actors on TV, or labeling those sweet cars that pass by? The Trivia app makes it so items come up and you test your memory in seeing how many you can correctly label. As each guess is made the user's guesses are tallied and displayed. Give it a go and set the new record.

### Design

<img src="pictures/login-design.jpg" height="250">
<img src="pictures/trivia-screen.jpg" height="250">
<img src="pictures/trivia-popup.jpg" height="250">

```mermaid
sequenceDiagram
    actor A as User
    participant L as Login
    participant P as Play
    participant R as Record
    A->>L: Enter User
    A->>L: Create User
    L->>P: After Logging In

    P->>P: Make Guess
    P->>R: View Records
    R->>P: Close Records

    loop Every minute
        P-->P: Check/Alerted for new record made!
    end

    P->>L: Logout
    P->>P: End Game
    P->>P: Start New Game
```

### Key features

- Display question image
- Display of options
- Store final score
- Ability to select option
- Alert if a 1st was reached

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - 2 HTML pages. 1 for login (and possibly topic selection), and another for guessing items name. Giving the body and structure for both pages and their popups.
- **CSS** - Appropriate styling on separate pages. Whitespace and proper color choice included.
- **Javascript** -  Controls the Trivia engine. Allowing user to login, view high scores, and and make a guess for the current picture.
- **React** - Gives Login page, Trivia page, and React to combine components of each. 
- **Service** - Backend endpoints for:
   - logging in
   - creating a user
   - retrieve picture
   - retrieve options
   - submit guess
   - retrieve correct guess count/user
- **DB/Login** - Stores users, pictures, and options in the database. Register and login the correct user.
- **WebSocket** - Once a new highscore is made, realtime that highscore onto the record list for players playing at that moment.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created a HTML page for each page of the APP
- [x] **Proper HTML element usage** - I choose the right element type per task (Header, body, link...)
- [x] **Links** - I included links, both for accessing each HTML page, and for the Github location.
- [x] **Text** - I place text on the screen. Also added comments to describe tasks
- [x] **3rd party API placeholder** - I added an element for the "3rd party API placeholder"
- [x] **Images** - I call and display a image within the app.
- [x] **Login placeholder** - I have a html representing upcoming Login elements
- [x] **DB data placeholder** - I have a data placeholder. holding where the picture and questions will be shown.
- [x] **WebSocket placeholder** - I have a placeholder for the websocket, storing and updating user high scores.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Header, footer, and main content body** - I created separate Header, footer, main content for each page.
- [X] **Navigation elements** - I include nav link elements to reach other pages
- [X] **Responsive to window resizing** - I have elements respond to windows resizing
- [X] **Application elements** - I did not complete this part of the deliverable.
- [X] **Application text content** - I did not complete this part of the deliverable.
- [X] **Application images** - I include a message to dispay

## 🚀 React part 1: Routing deliverable 

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - I added Vite to the project
- [X] **Components** - I converted the css of each component to jsx
- [X] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - I added interactivity between commands 
- [X] **Hooks** - Added "React.useState" to pass values between different pages/sub-pages. Added "React.useEffect" to also periodically alerting user a high score has been made.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I created the Express folder, installed Express tools, creating the default port to be 4000.
- [X] **Static middleware for frontend** - I added middlewar checking if user is logged on to be able add score
    <!-- Check if user is logged on to add score -->
- [X] **Calls to third party endpoints** - I use React to call on 'https://quote.cs260.click' to get a quote. This is located on app.jsx top right modal 
    <!-- I use React to call on 'https://quote.cs260.click' to get a  -->
- [x] **Backend service endpoints** - I Created endpoints in services index.js file for the logging on/off authentication
    <!-- Endpoints to put/post/delete  backend data -->
- [X] **Frontend calls service endpoints** - The functionality calls to services endpoints to check work. 
    <!-- Front end calls on those backend sites -->
    <!-- LocalStorage for username -->


## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **User registration** - User is able to register a new acount and login. 
- [X] **User login and logout** - User is able to login/logout
- [X] **Stores data in MongoDB** - I store scores inside of MongoDB
- [X] **Stores credentials in MongoDB** - I store user credentials inside of MongoDB
- [X] **Restricts functionality based on authentication** - I check user permission/authentication before adding a new score.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Backend listens for WebSocket connection** - At the bottom of "index.js" I listen for Websocket 
- [X] **Frontend makes WebSocket connection** - In "peerGroup" I set a connection up, keeping track when they close.
- [X] **Data sent over WebSocket connection** - Over Websocket I handle the events, sending an updated array of the message(s) 1 user has for all others
- [X] **WebSocket data displayed** - Each time another user starts/ends a game the array of news is displayed on screen current user's screen.
- [X] **Application is fully functional** - I can create user, login, play the game, and is alerted when another user starts or ends a game. Finally the high schools are posted for all to see.
