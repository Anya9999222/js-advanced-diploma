import GameController from '../js/GameController';
import Vampire from '../js/characters/Vampire';
import PositionedCharacter from '../js/PositionedCharacter';

test('shows info correctly', () => {
  const team = [];
  const character = new Vampire(1);

  const positionedCharacter = new PositionedCharacter(character, 2);
  team.push(positionedCharacter);

  const gameController = new GameController();
  const showInfo = gameController.showInfo(2, team);

  expect(showInfo).toEqual('\u{1F396} 1 \u{2694} 25 \u{1F6E1} 25 \u{2764} 50');
});
