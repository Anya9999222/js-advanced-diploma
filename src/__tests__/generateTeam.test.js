import { generateTeam } from "../js/generators";
import Bowman from "../js/characters/Bowman";
import Swordsman from "../js/characters/Swordsman";
import Magician from "../js/characters/Magician";

test('generate team correctly', () => {
    const playerTypes = [Bowman, Swordsman, Magician];
    const team = generateTeam(playerTypes, 3, 4);
    
    expect(team.characters.length).toBe(4);
    expect(team.characters[0].level).toBeLessThan(4);
    expect(team.characters[1].level).toBeGreaterThan(0);
})