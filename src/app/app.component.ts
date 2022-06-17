import {Component} from '@angular/core';
import {FieldState, Grid} from "../core/model";
import {createGrid, flagField, openField} from "../core/logic";

import {create as random, RandomSeed} from 'random-seed'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public STATE = FieldState
  public grid: Grid;

  constructor() {
    console.log(new Date())
    const gen: RandomSeed = random(new Date() + '')
    this.grid = createGrid(5, 6, 4, {x: 1, y: 3}, gen)
    console.log(gen.random())
    console.log(gen.random())
    console.log(gen.random())
    console.log(gen.random())
  }

  onClickHandler(i: number, j: number) {
    openField(this.grid, i, j)
  }

  onContextMenu(ev: MouseEvent, i: number, j: number) {
    ev.preventDefault();
    ev.stopPropagation()
    flagField(this.grid, i, j)
  }
}
