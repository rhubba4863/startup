import { PlayState } from './playState';

class OneMessage{
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameNotification{
  //Store the game events 
  events = [];
  handlers = [];

  constructor() {
    //get game port
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new OneMessage('Trivia', PlayState.Playing, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new OneMessage('Triva', PlayState.Playing, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };    
  }
}

const GameNotification = new GameEventNotification();
export { PlayState, GameNotification };