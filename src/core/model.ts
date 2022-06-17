export enum FieldState {
  OPEN = 'o',
  CLOSED = 'c',
  FLAGGED = 'f'
}

export interface Field {
  state: FieldState
  readonly bomb: boolean
  readonly num: number
}

export type Row = Field[]

export type Grid = Row[]

export interface Position {
  x: number
  y: number
}

export interface Game {
  grid: Grid,
  h: number,
  w: number,
  numOfBombs: number,
  numOfFlags: number,
}
