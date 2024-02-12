import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import { generateTeam } from './generators';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import unicodes from './unicodes';

const characters = [Bowman, Daemon, Vampire, Undead, Swordsman, Magician];
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.theme = themes.prairie;
    this.characters = characters;
    this.teamMain = [];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService

    this.gamePlay.drawUi(this.theme);
    this.drawCommand();
    this.dramEnemyCommand();
    this.gamePlay.redrawPositions(this.teamMain);
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  drawCommand() {
    const team = generateTeam(this.characters, 2, 3);
    const positions = this.generatePositions(this.gamePlay.boardSize, team.characters.length);

    team.characters.forEach((i, index) => {
      const char = new PositionedCharacter(i, positions[index]);
      this.teamMain.push(char);
    });
  }

  generatePositions(boardSize, count) {
    const allowedPos = [];
    const result = [];

    for (let i = 0; i < boardSize * boardSize; i += 1) {
      if (i % boardSize === 0 || (i - 1) % boardSize === 0) {
        allowedPos.push(i);
      }
    }

    for (let i = 0; i < count; i += 1) {
      const position = allowedPos[Math.floor(Math.random() * allowedPos.length)];
      if (!result.includes(position)) {
        result.push(position);
      } else {
        i -= 1;
      }
    }
    return result;
  }

  generateEnemyPositions(boardSize, count) {
    const allowedPos = [];
    const result = [];
    let index = 1;

    for (let i = 0; i < boardSize * boardSize; i += 1) {
      if (i === (boardSize * index) - 1) {
        allowedPos.push(i, i - 1);
        index += 1;
      }
    }

    for (let i = 0; i < count; i += 1) {
      const position = allowedPos[Math.floor(Math.random() * allowedPos.length)];
      if (!result.includes(position)) {
        result.push(position);
      } else {
        i -= 1;
      }
    }
    return result;
  }

  dramEnemyCommand() {
    const enemies = generateTeam(this.characters, 2, 3);
    const enemyPositions = this.generateEnemyPositions(this.gamePlay.boardSize, enemies.characters.length);

    enemies.characters.forEach((i, index) => {
      const char = new PositionedCharacter(i, enemyPositions[index]);
      this.teamMain.push(char);
    });
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter

    const element = this.gamePlay.cells[index].children;
    if (element.length !== 0) {
      this.gamePlay.showCellTooltip(this.showInfo(index, this.teamMain), index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    const element = this.gamePlay.cells[index].children;
    if (element.length !== 0) {
      this.gamePlay.hideCellTooltip(index);
    }
  }

  showInfo(index, team) {
    let level;
    let attack;
    let defence;
    let health;
    team.forEach((i) => {
      if (i.position === index) {
        level = i.character.level;
        attack = i.character.attack;
        defence = i.character.defence;
        health = i.character.health;
      }
    });
    return `${unicodes.level} ${level} ${unicodes.attack} ${attack} ${unicodes.defence} ${defence} ${unicodes.health} ${health}`;
  }
}
