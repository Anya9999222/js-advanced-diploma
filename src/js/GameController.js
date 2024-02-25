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
import GameState from './GameState';
import GamePlay from './GamePlay';

const userCharacters = [Bowman, Swordsman, Magician];
const enemyCharacters = [Daemon, Vampire, Undead];
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.theme = themes.prairie;
    this.userCharacters = userCharacters;
    this.enemyCharacters = enemyCharacters;
    this.teamMain = [];
    this.gameState = new GameState();
    this.previousClickedIndex;
    this.selectedPos;
    this.previousEnteredCell;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(this.theme);
    this.drawCommand();
    this.dramEnemyCommand();
    this.gamePlay.redrawPositions([...this.gameState.userPositions, ...this.gameState.computerPositions]);
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  drawCommand() {
    const team = generateTeam(this.userCharacters, 2, 3);
    const positions = this.generatePositions(this.gamePlay.boardSize, team.characters.length);

    team.characters.forEach((i, index) => {
      const char = new PositionedCharacter(i, positions[index]);
      this.gameState.userTeam.add(i);
      this.gameState.userPositions.push(char);
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
    const enemies = generateTeam(this.enemyCharacters, 2, 3);
    const enemyPositions = this.generateEnemyPositions(this.gamePlay.boardSize, enemies.characters.length);

    enemies.characters.forEach((i, index) => {
      const char = new PositionedCharacter(i, enemyPositions[index]);
      this.gameState.computerTeam.add(i);
      this.gameState.computerPositions.push(char);
    });
  }

  onCellClick(index) {
    // TODO: react to click
    const posCharacter = this.gameState.getPositionedCharacter(index);
    const enemyInCell = this.gameState.getPositionedEnemy(index);

    if (!this.gameState.usersTurn) {
      alert('Не ваш ход!');
      return;
    }
    // устанавливаем выбранного персонажа в state и меняем выбор персонажа
    if (posCharacter) {
      this.gameState.charSelected = posCharacter;
      this.changeCharacter(index);
    }

    const positionsToMove = this.charactersAllowedMoving(this.gameState.charSelected.character.distance, this.gamePlay.boardSize);
    const positionsToAttack = this.charactersAllowedMoving(this.gameState.charSelected.character.attackDis, this.gamePlay.boardSize);

    // проверка позиций - перемещаем
    if (!posCharacter && positionsToMove.includes(index) && !enemyInCell) {
      this.moveCharacter(index);
    }

    if (enemyInCell && !positionsToAttack.includes(index)) {
      GamePlay.showError('Не переходи на сторону зла!');
    }

    if (enemyInCell && positionsToAttack.includes(index)) {
      const enemy = this.gameState.getPositionedEnemy(index).character;

      this.attackEnemy(index, enemy, this.gameState.charSelected.character);
    }
  }

  attackEnemy(index, target, attacker) {
    const damage = Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
    const animation = this.gamePlay.showDamage(index, damage);
    animation
      .then(
        (result) => {
          target.health -= damage;
          this.gamePlay.redrawPositions([...this.gameState.userPositions, ...this.gameState.computerPositions]);
        },
      );
  }

  changeCharacter(index) {
    if (this.previousClickedIndex || this.previousClickedIndex === 0) {
      this.gamePlay.deselectCell(this.previousClickedIndex);
    }
    this.gamePlay.selectCell(index);
    this.previousClickedIndex = index;
    this.selectedPos = index;
  }

  // перемещает персонажа, либо вызывает функцию атаки
  moveCharacter(index) {
    this.gameState.charSelected.position = index;
    this.gamePlay.redrawPositions([...this.gameState.userPositions, ...this.gameState.computerPositions]);
    this.gamePlay.deselectCell(this.selectedPos);
    this.gamePlay.deselectCell(index);
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.gameState.charSelected) {
      this.checkEnteredCursor(index);
    }

    if (!this.gameState.charSelected) {
      this.gameState.userPositions.map((i) => {
        if (i.position === index) {
          this.gamePlay.showCellTooltip(this.showInfo(i.character), index);
        }
      });
      this.gameState.computerPositions.map((i) => {
        if (i.position === index) {
          this.gamePlay.showCellTooltip(this.showInfo(i.character), index);
        }
      });
    }
  }

  // еняет курсоры, выделяет ячейки
  checkEnteredCursor(index) {
    const characterInCell = this.gameState.getPositionedCharacter(index);
    const enemyInCell = this.gameState.getPositionedEnemy(index);
    const positionsToMove = this.charactersAllowedMoving(this.gameState.charSelected.character.distance,this.gamePlay.boardSize);
    const attackDistance = this.charactersAllowedMoving(this.gameState.charSelected.character.attackDis,this.gamePlay.boardSize);

    if (this.previousEnteredCell || this.previousEnteredCell === 0) {
      this.gamePlay.deselectCell(this.previousEnteredCell);
    }

    if (characterInCell) {
      this.gamePlay.setCursor('pointer');
    } else if (index !== this.selectedPos && !characterInCell && positionsToMove.includes(index) && !enemyInCell) {
      this.gamePlay.setCursor('pointer');
      this.gamePlay.selectCell(index, 'green');
      this.previousEnteredCell = index;
    } else if (attackDistance.includes(index) && enemyInCell) {
      this.gamePlay.setCursor('crosshair');
      this.gamePlay.selectCell(index, 'red');
      this.previousEnteredCell = index;
    } else if (!positionsToMove.includes(index) && !attackDistance.includes(index)) {
      this.gamePlay.setCursor('not-allowed');
    }
  }

  // возвращает массив индексов для перемещения выбранного персонажа
  charactersAllowedMoving(distance, size) {
    const values = [];
    const indexColumn = this.selectedPos % size;
    const indexRow = Math.floor(this.selectedPos / size);

    for (let i = 1; i <= distance; i += 1) {
      if (indexColumn + i < size) {
        values.push(indexRow * size + (indexColumn + i));
      }
      if (indexColumn - i >= 0) {
        values.push(indexRow * size + (indexColumn - i));
      }

      if (indexRow + i < size) {
        values.push((indexRow + i) * size + indexColumn);
      }
      if (indexRow - i >= 0) {
        values.push((indexRow - i) * size + indexColumn);
      }
      if (indexRow + i < size && indexColumn + i < size) {
        values.push((indexRow + i) * size + (indexColumn + i));
      }
      if (indexRow - i >= 0 && indexColumn - i >= 0) {
        values.push((indexRow - i) * size + (indexColumn - i));
      }
      if (indexRow + i < size && indexColumn - i >= 0) {
        values.push((indexRow + i) * size + (indexColumn - i));
      }
      if (indexRow - i >= 0 && indexColumn + i < size) {
        values.push((indexRow - i) * size + (indexColumn + i));
      }
    }
    return values;
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    if (this.previousEnteredCell) {
      this.gamePlay.deselectCell(this.previousEnteredCell);
    }
    if (!this.gameState.charSelected) {
      this.gameState.userPositions.map((i) => {
        if (i.position === index) {
          this.gamePlay.hideCellTooltip(index);
        }
      });
      this.gameState.computerPositions.map((i) => {
        if (i.position === index) {
          this.gamePlay.hideCellTooltip(index);
        }
      });
    }
  }

  moveEnemy(index, character) {
    character.position = index;
    this.gamePlay.redrawPositions([...this.gameState.userPositions, ...this.gameState.computerPositions]);
    this.gamePlay.deselectCell(this.selectedPos);
    this.gamePlay.deselectCell(index);
    this.gameState.usersTurn = true;
  }

  computerAttack(index, character, attacker) {
    const target = character.character;
    const damage = Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
    const animation = this.gamePlay.showDamage(index, damage);
    animation
      .then(
        (result) => {
          target.health -= damage;
          this.gamePlay.redrawPositions([...this.gameState.userPositions, ...this.gameState.computerPositions]);
        },
      );
    this.gameState.usersTurn = true;
  }

  computersTurn() {
    const computerTeam = this.gameState.computerPositions;
    const randomPer = computerTeam[Math.floor(Math.random() * computerTeam.length)];
    const userPositions = [];
    this.gameState.userPositions.map((i) => userPositions.push(i.position));
    this.gamePlay.selectCell(randomPer.position);
    this.gameState.charSelected = randomPer;
    this.selectedPos = randomPer.position;
    const positionsToMove = this.charactersAllowedMoving();

    const target = userPositions.reduce((a, b) => ((a - this.selectedPos) > (b - this.selectedPos) ? a : b));
    const targetChar = userPositions.map((i) => i.position === target);
    const closestCell = positionsToMove.reduce((a, b) => ((a - target) < (b - target) ? a : b));

    if (positionsToMove.includes(target)) {
      this.computerAttack(target, this.gameState.userPositions[target], this.gameState.charSelected);
    } else {
      this.moveEnemy(closestCell, this.gameState.charSelected);
    }
    this.gameState.usersTurn = true;
    // console.log(computerTeam)
    // console.log(target, closestCell);
  }

  showInfo(character) {
    const { level } = character;
    const { attack } = character;
    const { defence } = character;
    const { health } = character;

    return `${unicodes.level} ${level} ${unicodes.attack} ${attack} ${unicodes.defence} ${defence} ${unicodes.health} ${health}`;
  }
}
