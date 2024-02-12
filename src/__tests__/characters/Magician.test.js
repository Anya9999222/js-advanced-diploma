import Magician from "../../js/characters/Magician";

test('returns Magician', () => {
    const magician = {
        "attack": 10, 
        "defence": 40, 
        "health": 50, 
        "level": 1, 
        "type": "magician"
    };
    let character = new Magician(1)
    expect(character).toEqual(magician)
})
