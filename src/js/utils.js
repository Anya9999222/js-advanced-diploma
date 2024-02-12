/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут
  const board = boardSize - 1;
  const bottomRigth = (boardSize * boardSize) - 1;
  if (index === 0) {
    return 'top-left';
  } if (index > 0 && index < board) {
    return 'top';
  }
  if (index === board) {
    return 'top-right';
  }
  if (index % boardSize === 0 && index !== boardSize * board) {
    return 'left';
  }
  if (index === boardSize * board) {
    return 'bottom-left';
  }
  if (index > (boardSize * board) && index < bottomRigth) {
    return 'bottom';
  }
  if (index === bottomRigth) {
    return 'bottom-right';
  }
  for (let i = 2; i < boardSize; i += 1) {
    if (index === (boardSize * i) - 1) {
      return 'right';
    }
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
