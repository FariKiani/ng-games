import {Component} from '@angular/core';
import {Grid} from "../core/model";
import {create} from "../core/logic";

import {create as random, RandomSeed} from 'random-seed'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 

  public grid: Grid;

  constructor() {
    console.log(new Date())
    const gen: RandomSeed = random(new Date() + '')
    this.grid = create(5, 6, 4, {x: 1, y: 3}, gen)
    console.log(gen.random())
    console.log(gen.random())
    console.log(gen.random())
    console.log(gen.random())
  }
}
