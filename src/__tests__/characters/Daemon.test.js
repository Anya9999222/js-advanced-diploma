import Daemon from '../../js/characters/Daemon';

test('returns Daemon', () => {
  const daemon = {
    attack: 10,
    defence: 10,
    health: 50,
    level: 1,
    type: 'daemon',
  };
  const character = new Daemon(1);
  expect(character).toEqual(daemon);
});
