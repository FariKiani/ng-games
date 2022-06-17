import {add, countBombs, createGrid, equal, isInList} from "./logic";
import {create as random, RandomSeed} from "random-seed";
import {FieldState} from "./model";

describe('logic', () => {


  it('should be equal', () => {
    expect(equal({x: 0, y: 1}, {x: 0, y: 1})).toBeTrue();
    expect(equal({x: 0, y: 2}, {x: 0, y: 1})).toBeFalse();
    expect(equal({x: 1, y: 1}, {x: 0, y: 1})).toBeFalse();
    expect(equal({x: 0, y: 1}, {x: 0, y: 2})).toBeFalse();
    expect(equal({x: 0, y: 1}, {x: 1, y: 1})).toBeFalse();
  });
  it('should add', () => {
    expect(add({x: 0, y: 1}, {x: 0, y: 1})).toEqual({x: 0, y: 2});
    expect(add({x: 0, y: 2}, {x: 0, y: 1})).toEqual({x: 0, y: 3});
    expect(add({x: 1, y: 1}, {x: 0, y: 1})).toEqual({x: 1, y: 2});
    expect(add({x: 0, y: 1}, {x: -1, y: 1})).toEqual({x: -1, y: 2});
  });

  describe('should count bombs', () => {
    it('1', () => {
      expect(countBombs(
        [
          [false, false, false, false,],
          [false, false, false, false,],
          [false, false, false, false,],
          [false, false, false, false,],
        ],
        1, 1
      )).toEqual(0)
    });
    it('2', () => {
      expect(countBombs(
        [
          [false, true, false, false,],
          [false, false, false, false,],
          [false, false, false, false,],
          [false, false, false, false,],
        ],
        1, 1
      )).toEqual(1)
    });
    it('3', () => {
      expect(countBombs(
        [
          [true, true, true, false,],
          [true, false, true, false,],
          [true, true, true, false,],
          [false, false, false, false,],
        ],
        1, 1
      )).toEqual(8)
    });
    it('4', () => {
      expect(countBombs(
        [
          [true, false, true, false,],
          [true, true, true, false,],
          [true, true, true, false,],
          [false, false, false, false,],
        ],
        0, 1
      )).toEqual(5)
    });
    it('5', () => {
      expect(countBombs(
        [
          [false, false, true, false,],
          [true, true, true, false,],
          [true, true, true, false,],
          [false, false, false, false,],
        ],
        0, 0
      )).toEqual(2)
    });
    it('6', () => {
      expect(countBombs(
        [
          [false, false, true, false,],
          [true, true, true, false,],
          [true, true, true, false,],
          [false, false, false, false,],
        ],
        3, 3
      )).toEqual(1)
    });
  });

  it('should be in List', () => {
    expect(isInList({x: 0, y: 1}, [{x: 0, y: 1}, {x: 0, y: 1}])).toBeTrue();
    expect(isInList({x: 0, y: 2}, [{x: 2, y: 2}, {x: 0, y: 1}])).toBeFalse();
    expect(isInList({x: 1, y: 1}, [{x: 2, y: 2}, {x: 0, y: 1}])).toBeFalse();
    expect(isInList({x: 0, y: 1}, [{x: 2, y: 2}, {x: 0, y: 2}])).toBeFalse();
    expect(isInList({x: 0, y: 1}, [{x: 2, y: 2}, {x: 1, y: 1}])).toBeFalse();
  });

  it('should create grid', () => {

    const gen: RandomSeed = random('42')
    const grid = createGrid(3, 3, 4, {x: 1, y: 0}, gen)
    expect(grid).toEqual([
      [
        {state: FieldState.CLOSED, num: 1, bomb: true},
        {state: FieldState.OPEN, num: 2, bomb: false},
        {state: FieldState.CLOSED, num: 1, bomb: false},
      ],
      [
        {state: FieldState.CLOSED, num: 3, bomb: false},
        {state: FieldState.CLOSED, num: 3, bomb: true},
        {state: FieldState.CLOSED, num: 2, bomb: false},
      ],
      [
        {state: FieldState.CLOSED, num: 1, bomb: true},
        {state: FieldState.CLOSED, num: 3, bomb: false},
        {state: FieldState.CLOSED, num: 1, bomb: true},
      ]
    ])

  });
  it('should create grid with one bomb', () => {

    const gen: RandomSeed = random('42')
    const grid = createGrid(3, 3, 1, {x: 1, y: 0}, gen)
    console.log(grid)
    expect(grid).toEqual([
      [
        {state: FieldState.OPEN, num: 0, bomb: false},
        {state: FieldState.OPEN, num: 0, bomb: false},
        {state: FieldState.OPEN, num: 0, bomb: false},
      ],
      [
        {state: FieldState.OPEN, num: 1, bomb: false},
        {state: FieldState.OPEN, num: 1, bomb: false},
        {state: FieldState.OPEN, num: 0, bomb: false},
      ],
      [
        {state: FieldState.CLOSED, num: 0, bomb: true},
        {state: FieldState.OPEN, num: 1, bomb: false},
        {state: FieldState.OPEN, num: 0, bomb: false},
      ]
    ])

  });
});
