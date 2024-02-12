import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level, health, type = 'swordsman') {
    super(health, type);
    this.attack = 40;
    this.defence = 10;
    this.level = level;
  }
}
