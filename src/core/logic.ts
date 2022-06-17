import {FieldState, Grid, Position, Row} from "./model";
import {RandomSeed} from "random-seed";

function createRandomPosition(w: number, h: number, gen: RandomSeed): Position {
  return {
    x: Math.floor(gen.random() * w),
    y: Math.floor(gen.random() * h),
  }

}

export function add(a: Position, b: Position): Position {
  return {x: a.x + b.x, y: a.y + b.y}
}

export function equal(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y
}


export function isInList(pos: Position, list: Position[]): boolean {
  return list.some(el => equal(el, pos))
}

export function countBombs(bombGrid: boolean[][], i: number, j: number): number {
  const h = bombGrid.length;
  const w = bombGrid[0].length;
  const pos = {x: j, y: i}
  return [
    {x: -1, y: -1},
    {x: -1, y: 0},
    {x: -1, y: +1},

    {x: +1, y: -1},
    {x: +1, y: 0},
    {x: +1, y: +1},

    {x: 0, y: -1},
    {x: 0, y: +1},
  ]
    .map(point => add(point, pos))
    .filter(({x, y}) => x >= 0 && x < w && y >= 0 && y < h)
    .map(({x, y}): number => bombGrid[y][x] ? 1 : 0)
    .reduce((a, b) => a + b)

}

export function create(w: number, h: number, numberOfBombs: number, pos: Position, gen: RandomSeed): Grid {

  const bombs: Position[] = []
  for (let i = 0; i < numberOfBombs; i++) {
    while (true) {
      const point = createRandomPosition(w, h, gen);
      if (!isInList(point, bombs) && !equal(pos, point)) {
        bombs.push(point);
        break;
      }
    }
  }

  const bombGrid: boolean[][] = [];

  for (let i = 0; i < h; i++) {
    const row: boolean[] = []
    bombGrid.push(row);
    for (let j = 0; j < w; j++) {
      bombGrid[i][j] = isInList({x: j, y: i}, bombs);

    }
  }
  const grid: Grid = [];


  for (let i = 0; i < h; i++) {
    const row: Row = []
    grid.push(row);
    for (let j = 0; j < w; j++) {

      grid[i][j] = {
        state: i === pos.y && j === pos.x ? FieldState.OPEN : FieldState.CLOSED,
        bomb: bombGrid[i][j],
        num: countBombs(bombGrid, i, j)
      };

    }
  }
  return grid
}
