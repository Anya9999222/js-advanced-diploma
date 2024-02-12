import Character from '../Character';

export default class Bowman extends Character {
  constructor(level, health, type = 'bowman') {
    super(health, type);
    this.attack = 25;
    this.defence = 25;
    this.level = level;
  }
}
