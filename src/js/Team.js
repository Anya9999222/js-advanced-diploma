import Bowman from "./characters/Bowman";
import Magician from "./characters/Magician";
import Undead from "./characters/Undead";

/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  constructor(characters){
   this.characters = characters;
  }
  // static characters(){
  //   return [Bowman, Magician, Undead]
  // }
}
