import Character from '../Character';

export default class Magician extends Character {
  constructor(level, health) {
    super(health);
    this.attack = 10;
    this.defence = 40;
    this.level = level;
    this.type = 'magician';
    this.distance = 1;
    this.attackDis = 4;
  }
}
