import Character from '../Character';

export default class Daemon extends Character {
  constructor(level, health) {
    super(health);
    this.attack = 10;
    this.defence = 10;
    this.level = level;
    this.type = 'daemon';
    this.distance = 1;
    this.attackDis = 4;
  }
}
