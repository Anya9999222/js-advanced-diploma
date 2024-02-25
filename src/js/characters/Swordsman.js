import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level, health) {
    super(health);
    this.attack = 40;
    this.defence = 10;
    this.level = level;
    this.type = 'swordsman';
    this.distance = 4;
    this.attackDis = 1;
  }
}
