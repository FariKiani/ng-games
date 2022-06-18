import {Field, FieldState, Game, GameState, Grid, Position, Row} from "./model";
import {create as random, RandomSeed} from "random-seed";

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


export function validNeighbours(w: number, h: number, i: number, j: number): Position[] {

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
}

export function countBombs(bombGrid: boolean[][], i: number, j: number): number {

  const h = bombGrid.length;
  const w = bombGrid[0].length;
  return validNeighbours(w, h, i, j)
    .map(({x, y}): number => bombGrid[y][x] ? 1 : 0)
    .reduce((a, b) => a + b)

}

export function flagField(grid: Grid, i: number, j: number) {
  const field = grid[i][j];
  if (field.state == FieldState.CLOSED) {
    field.state = FieldState.FLAGGED
  } else if (field.state == FieldState.FLAGGED) {
    field.state = FieldState.CLOSED
  }
}

export function openField(grid: Grid, i: number, j: number) {
  const field = grid[i][j];
  if (field.state !== FieldState.CLOSED) {
    return;
  }
  field.state = FieldState.OPEN;
  if (field.num !== 0 || field.hasBomb) {
    return;
  }

  const h = grid.length;
  const w = grid[0].length;
  const neighbours = validNeighbours(w, h, i, j);
  for (const neighbour of neighbours) {
    openField(grid, neighbour.y, neighbour.x)
  }

}

export function createEmptyGrid(w: number, h: number): Grid {
  const grid: Grid = [];
  for (let i = 0; i < h; i++) {
    const row: Row = []
    grid.push(row);
    for (let j = 0; j < w; j++) {

      grid[i][j] = {
        state: FieldState.CLOSED,
        hasBomb: false,
        num: 0
      };

    }
  }
  return grid
}

export function createGrid(w: number, h: number, numberOfBombs: number, pos: Position, gen: RandomSeed): Grid {

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
        state: FieldState.CLOSED,
        hasBomb: bombGrid[i][j],
        num: countBombs(bombGrid, i, j)
      };

    }
  }
  openField(grid, pos.y, pos.x)

  return grid
}

export function isWin(game: Game): boolean {
  for (const row of game.grid) {
    for (const field of row) {
      if (!field.hasBomb && field.state !== FieldState.OPEN)
        return false;
    }
  }
  return true;
}

function setFlagsIfWin(game: Game) {
  if (game.state === GameState.WIN) {
    for (const row of game.grid) {
      for (const field of row) {
        if (field.state == FieldState.CLOSED) {
          field.state = FieldState.FLAGGED
        }
      }
    }
  }
}

export function flag(game: Game, i: number, j: number) {
  if (game.state !== GameState.RUNNING) {
    return
  }
  flagField(game.grid, i, j)
}

export function open(game: Game, i: number, j: number) {
  if (game.state == GameState.INIT) {
    game.grid = createGrid(game.w, game.h, game.numberOfBombs, {x: j, y: i}, random(game.seed))
    game.state = GameState.RUNNING
  }
  if (game.state !== GameState.RUNNING) {
    return
  }
  openField(game.grid, i, j)

  const field = game.grid[i][j];
  if (field.hasBomb) {
    game.state = GameState.LOSE
  } else if (isWin(game)) {
    game.state = GameState.WIN
    setFlagsIfWin(game)
  }
}

export function createGame(w: number, h: number, numberOfBombs: number, seed: string): Game {
  return {
    grid: createEmptyGrid(w, h),
    w,
    h,
    state: GameState.INIT,
    numberOfBombs,
    numberOfFlags: 0,
    seed,
  }

}

//

export const copyField = (field: Field): Field => ({...field});

export const copyRow = (row: Row): Row => row.map(copyField);

export const copyGrid = (grid: Grid): Grid => grid.map(copyRow);

export const copyGame = (game: Game): Game => ({...game});
