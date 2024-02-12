import Character from '../Character';

export default class Undead extends Character {
  constructor(level, health,type = 'undead') {
    super(health, type);
    this.attack = 40;
    this.defence = 10;
    this.level = level;
  }
}