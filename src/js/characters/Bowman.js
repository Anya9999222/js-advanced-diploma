import Character from '../Character';

export default class Bowman extends Character {
  constructor(level, health) {
    super(health);
    this.attack = 25;
    this.defence = 25;
    this.level = level;
    this.type = 'bowman';
    this.distance = 2;
    this.attackDis = 2;
  }
}
