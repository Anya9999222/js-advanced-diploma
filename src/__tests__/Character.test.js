import Character from "../js/Character"

test('throes an error', () => {
    expect(() => {
        new Character('Bowman', 1)
    }).toThrow(new Error('запрещено создавать объекты класса Character'));
})