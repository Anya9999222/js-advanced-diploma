import Bowman from "../../js/characters/Bowman";


test('returns Bowman', () => {
    const bowman = {
        "attack": 25, 
        "defence": 25, 
        "health": 50, 
        "level": 1, 
        "type": "bowman"
    };
    let character = new Bowman(1)
    expect(character).toEqual(bowman)
})


