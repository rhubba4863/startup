export class PlayState {
  //RPH - The 3 types of play "page types"
  /*Types overall: unknown, playing, done playing*/
  static Pregame = new PlayState('pregame');
  static Playing = new PlayState('playing');
  static Finished = new PlayState('finished');
}