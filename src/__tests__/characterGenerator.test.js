import { characterGenerator } from "../js/generators";
import Bowman from "../js/characters/Bowman";
import Swordsman from "../js/characters/Swordsman";
import Magician from "../js/characters/Magician";

test('generates characters', () => {
    const playerTypes = [Bowman, Swordsman, Magician]; 
    const playerGenerator = characterGenerator(playerTypes, 2);

    expect(playerGenerator.next().value).toBeDefined();
    expect(playerGenerator.next().value).toBeDefined();
    expect(playerGenerator.next().value).toBeDefined();
    expect(playerGenerator.next().value).toBeDefined();
    expect(playerGenerator.next().value).toBeDefined();
})