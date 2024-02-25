import Daemon from '../../js/characters/Daemon';
import GameController from '../../js/GameController';

let character;
beforeEach(() => {
  character = new Daemon(1);
});

test('returns Daemon', () => {
  const daemon = {
    attack: 10,
    defence: 10,
    health: 50,
    level: 1,
    type: 'daemon',
    distance: 1,
    attackDis: 4,
  };
  expect(character).toEqual(daemon);
});
test('checks allowed distance', () => {
  const result = [7, 5, 14, 15, 13];
  const attack = [
    7, 5, 14, 15, 13, 4,
    22, 20, 3, 30, 27, 2,
    38, 34,
  ];
  const gameController = new GameController();
  gameController.selectedPos = 6;
  const allowedMoves = gameController.charactersAllowedMoving(character.distance, 8);
  const allowedAttack = gameController.charactersAllowedMoving(character.attackDis, 8);

  expect(allowedMoves).toEqual(result);
  expect(allowedAttack).toEqual(attack);
});
