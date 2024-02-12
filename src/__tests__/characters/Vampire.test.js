import Vampire from '../../js/characters/Vampire';

test('returns Vampire', () => {
  const vampire = {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'vampire',
  };
  const character = new Vampire(1);
  expect(character).toEqual(vampire);
});
