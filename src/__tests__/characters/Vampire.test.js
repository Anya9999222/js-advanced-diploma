import Vampire from '../../js/characters/Vampire';
import GameController from '../../js/GameController';

let character;
beforeEach(() => {
  character = new Vampire(1);
});
test('returns Vampire', () => {
  const vampire = {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'vampire',
    distance: 2,
    attackDis: 2,
  };
  expect(character).toEqual(vampire);
});
test('checks allowed distance', () => {
  const result = [
    14, 23, 7, 6,
    22, 13, 31, 29,
  ];
  const gameController = new GameController();
  gameController.selectedPos = 15;
  const allowedMoves = gameController.charactersAllowedMoving(character.distance, 8);
  const allowedAttack = gameController.charactersAllowedMoving(character.attackDis, 8);

  expect(allowedMoves).toEqual(result);
  expect(allowedAttack).toEqual(result);
});
