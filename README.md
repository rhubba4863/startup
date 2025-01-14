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

    P->>L: Make Guess
    P->>R: View Records
    R->>P: Close Records

    loop Every minute
        P-->P: Check for new record!
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

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
