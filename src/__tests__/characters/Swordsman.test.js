import Swordsman from "../../js/characters/Swordsman";

test('returns Swordsman', () => {
    const swordsman = {
        "attack": 40, 
        "defence": 10, 
        "health": 50, 
        "level": 1, 
        "type": "swordsman"
    };
    let character = new Swordsman(1)
    expect(character).toEqual(swordsman)
})
