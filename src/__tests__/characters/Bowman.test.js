import Bowman from '../../js/characters/Bowman';
import GameController from '../../js/GameController';

let character;
beforeEach(() => {
  character = new Bowman(1);
});
test('returns Bowman', () => {
  const bowman = {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'bowman',
    distance: 2,
    attackDis: 2,
  };
  expect(character).toEqual(bowman);
});
test('checks allowed distance', () => {
  const result = [1, 8, 9, 2, 16, 18];
  const gameController = new GameController();
  gameController.selectedPos = 0;
  const allowedMoves = gameController.charactersAllowedMoving(character.distance, 8);
  const allowedAttack = gameController.charactersAllowedMoving(character.attackDis, 8);
  expect(allowedMoves).toEqual(result);
  expect(allowedAttack).toEqual(result);
});
