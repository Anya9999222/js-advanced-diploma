import Undead from '../../js/characters/Undead';
import GameController from '../../js/GameController';

let character;
beforeEach(() => {
  character = new Undead(1);
});
test('returns Undead', () => {
  const undead = {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'undead',
    distance: 4,
    attackDis: 1,
  };
  expect(character).toEqual(undead);
});
test('checks allowed distance', () => {
  const result = [
    18, 16, 25, 9, 26, 8, 24,
    10, 19, 33, 1, 35, 3, 20,
    41, 44, 21, 49, 53,
  ];
  const attack = [
    18, 16, 25, 9,
    26, 8, 24, 10,
  ];
  const gameController = new GameController();
  gameController.selectedPos = 17;
  const allowedMoves = gameController.charactersAllowedMoving(character.distance, 8);
  const allowedAttack = gameController.charactersAllowedMoving(character.attackDis, 8);

  expect(allowedMoves).toEqual(result);
  expect(allowedAttack).toEqual(attack);
});
