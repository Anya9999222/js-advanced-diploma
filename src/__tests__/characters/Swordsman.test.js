import Swordsman from '../../js/characters/Swordsman';
import GameController from '../../js/GameController';

let character;
beforeEach(() => {
  character = new Swordsman(1);
});
test('returns Swordsman', () => {
  const swordsman = {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'swordsman',
    distance: 4,
    attackDis: 1,
  };
  expect(character).toEqual(swordsman);
});
test('checks allowed distance', () => {
  const result = [61, 59, 52, 51, 53, 62, 58, 44,
    42, 46, 63, 57, 36, 33, 39, 56, 28, 24];
  const attack = [61, 59, 52, 51, 53];
  const gameController = new GameController();
  gameController.selectedPos = 60;
  const allowedMoves = gameController.charactersAllowedMoving(character.distance, 8);
  const allowedAttack = gameController.charactersAllowedMoving(character.attackDis, 8);

  expect(allowedMoves).toEqual(result);
  expect(allowedAttack).toEqual(attack);
});
