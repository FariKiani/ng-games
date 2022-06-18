export enum FieldState {
  OPEN = 'o',
  CLOSED = 'c',
  FLAGGED = 'f'
}

export interface Field {
  state: FieldState
  readonly hasBomb: boolean
  readonly num: number
}

export type Row = Field[]

export type Grid = Row[]

export interface Position {
  x: number
  y: number
}

export enum GameState {
  WIN = 'WIN',
  LOSE = 'LOSE',
  RUNNING = 'RUNNING',
  INIT = 'INIT'
}

export interface Game {
  grid: Grid,
  h: number,
  w: number,
  numberOfBombs: number,
  numberOfFlags: number,
  state: GameState,
  seed: string
}
