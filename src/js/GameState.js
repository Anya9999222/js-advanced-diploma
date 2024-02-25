export default class GameState {
  constructor() {
    this.userTeam = new Set();
    this.computerTeam = new Set();
    this.userPositions = [];
    this.computerPositions = [];
    this.charSelected;
    this.usersTurn = true;
  }

  getPositionedCharacter(index) {
    let char;
    this.userPositions.map((i) => {
      if (i.position === index) {
        char = i;
      }
    });
    return char;
  }

  getPositionedEnemy(index) {
    let char;
    this.computerPositions.map((i) => {
      if (i.position === index) {
        char = i;
      }
    });
    return char;
  }

  static from(object) {
    // TODO: create object
    return null;
  }
}
