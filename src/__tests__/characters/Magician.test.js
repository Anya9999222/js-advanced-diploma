import Magician from '../../js/characters/Magician';
import GameController from '../../js/GameController';

let character;
beforeEach(() => {
  character = new Magician(1);
});
test('returns Magician', () => {
  const magician = {
    attack: 10,
    defence: 40,
    health: 50,
    level: 1,
    type: 'magician',
    distance: 1,
    attackDis: 4,
  };
  expect(character).toEqual(magician);
});
test('checks allowed distance', () => {
  const result = [25, 32, 16, 33, 17];
  const attack = [
    25, 32, 16, 33, 17, 26, 40,
    8, 42, 10, 27, 48, 0, 51,
    3, 28, 56, 60,
  ];
  const gameController = new GameController();
  gameController.selectedPos = 24;
  const allowedMoves = gameController.charactersAllowedMoving(character.distance, 8);
  const allowedAttack = gameController.charactersAllowedMoving(character.attackDis, 8);

  expect(allowedMoves).toEqual(result);
  expect(allowedAttack).toEqual(attack);
});
