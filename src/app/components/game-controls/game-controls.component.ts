import { Component, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
  standalone: true
})
export class GameControlsComponent {
  constructor(private gameService: GameService) {}

  resetGame(): void {
    this.gameService.restartGame();
  }
}
