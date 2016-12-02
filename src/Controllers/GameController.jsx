import fb from '../firebase';

export default class GameController {
  static getGames() {
    fb.fetch('games', {
      context: this,
      asArray: true
    }).then(data => {
      console.log(data);
      return data;
    }).catch(error => {
      console.log(error);
      return 0;
    });
  }

}
