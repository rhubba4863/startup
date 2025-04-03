import React from 'react';

import { PlayState, GameNotification } from './gameNotification';
//import './players.css';

export function Players(props) {
  const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    GameNotification.addHandler(handleGameEvent);

    return () => {
      GameNotification.removeHandler(handleGameEvent);
    };
  });

  function handleGameEvent(event) {
    // setEvent(prev => [...prev, event]);
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = ' unknown ';
      if (event.type === PlayState.Finished) {
        console.log("FINISHED");

        message = ` scored ${event.value.totalRightAnswers} point(s)`;
      } else if (event.type === PlayState.Playing) {
        message = ` started a new game`;
      } else if (event.type === PlayState.System) {
        // message = event.value.msg;
        message = "DDDD";
      }

      console.log("aa"+event.from);
      console.log("bb"+event.type+"bb");
      console.log("bb"+PlayState.Finished+"bb");

      console.log("cc"+event.value.message);


      // for (const property in event) {
      //   console.log("BOB"+`${property}: ${event[property]}`);
      // }

      console.log("dd"+JSON.stringify(event, null, 2));


      messageArray.push(
        <div key={i} className='news'>
          <span className={'news-event'}>{event.from.split('@')[0]}</span>
          {message}
        </div>
      );
    }

    console.log("YYY"+messageArray.length);

    return messageArray;
  }

  return (
    <div className='players'>
      Player News
      {/* <span className='player-name'>{userName}</span> */}
      <div id='player-messages'>{createMessageArray()}</div>
    </div>
  );
}
