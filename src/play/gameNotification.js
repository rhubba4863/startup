//import { PlayState } from './playState';

//RPH - Needed to have data as variable, not class, so values pass
//      correctly as parameters 
const PlayState = {
  Pregame: 'pregame',
  Playing: 'playing',
  Finished: 'finished',

  // Pregame: PlayState.Pregame,
  // Playing: PlayState.Playing,
  // Finished: PlayState.Finished,
};

class OneMessage{
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
    //Maybe Time of event
  }
}

class GameEventNotification{
  //Store the game events 
  events = [];
  handlers = [];

  constructor() {
    //get game port
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new OneMessage('Trivia1', PlayState.Playing, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new OneMessage('Trivia2', PlayState.Playing, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        console.log("JOE+"+msg.data);

        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };    
  }

  broadcastEvent(from, type, value) {
    const event = new OneMessage(from, type, value);
    console.log("Event Pieces From ="+event.from)
    console.log("Event Pieces Type ="+event.type)
    console.log("Event Pieces Type ="+event.type.stringify)
    console.log("Event Pieces Type ="+JSON.stringify(event.type))

    console.log("Event Pieces ="+event.value)

    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const GameNotification = new GameEventNotification();
export { PlayState, GameNotification };