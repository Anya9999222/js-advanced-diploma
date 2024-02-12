import Character from '../Character';

export default class Magician extends Character {
  constructor(level, health, type = 'magician') {
    super(health, type);
    this.attack = 10;
    this.defence = 40;
    this.level = level;
  }
}
