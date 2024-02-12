import Undead from '../../js/characters/Undead';

test('returns Undead', () => {
  const undead = {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'undead',
  };
  const character = new Undead(1);
  expect(character).toEqual(undead);
});
