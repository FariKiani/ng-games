export enum FieldState {
  OPEN,
  CLOSED,
  FLAGGED
}

export interface Field {
  readonly state: FieldState
  readonly bomb: boolean
  readonly num: number
}

export type Row = Field[]

export type Grid = Row[]

export interface Position {
  x: number
  y: number
}
