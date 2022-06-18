import {Component} from '@angular/core';
import {FieldState, Game, GameState} from "../core/model";
import {createGame, flag, open} from "../core/logic";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public STATE = FieldState
  public GAME_STATE = GameState
  public game: Game;

  constructor() {
    console.log(new Date())

    this.game = createGame(16, 16, 40, new Date() + '')

  }

  onClickHandler(i: number, j: number) {
    open(this.game, i, j)
  }

  onContextMenu(ev: MouseEvent, i: number, j: number) {
    ev.preventDefault();
    ev.stopPropagation()
    flag(this.game, i, j)
  }
}
