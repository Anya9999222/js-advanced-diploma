import Character from '../Character';

export default class Vampire extends Character {
  constructor(level, health, type = 'vampire') {
    super(health, type);
    this.attack = 25;
    this.defence = 25;
    this.level = level;
  }
}
