import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [CommonModule, CellComponent]
})
export class BoardComponent implements OnInit {
  board: number[][] = [];
  possibleMoves: { x: number, y: number }[] = [];
  knightPosition: { x: number, y: number } | null = null;
  result: string = '';
  moveCount: number = 0;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.board$.subscribe(board => {
      this.board = board; 
      if (this.board.every(row => row.every(cell => cell === null))) {
        this.possibleMoves = [];
      }
    });
    this.gameService.moveCount$.subscribe(moveCount => {
      this.moveCount = moveCount;
      if (moveCount < 100 && moveCount > 0 && this.possibleMoves.length == 0) {
        this.result = "You losed!";
      }
      if (moveCount == 100) {
        this.result = "You won!";
      }
    });
    this.gameService.knightPosition$.subscribe(knightPosition => {
      this.knightPosition = knightPosition;
    });
    this.gameService.result$.subscribe(result => {
      this.result = '';
    });
    this.resetGame();
  }

  resetGame(): void {
    this.board = this.gameService.initBoard();
    this.possibleMoves = [];
    this.knightPosition = null;
    this.result = '';
  }

  onCellClick(x: number, y: number): void {
    if (this.gameService.isMoveValid(x, y, this.possibleMoves) || this.gameService.isBoardEmpty()) {
      this.possibleMoves = this.gameService.getPossibleMoves(x, y);
      this.board = this.gameService.makeMove(x, y);
      this.knightPosition = {x: x, y: y};
    }
  }

  isPossibleMove(x: number, y: number): boolean {
    return this.possibleMoves.some(move => move.x === x && move.y === y);
  }

  isFirstColor(i: number, j: number): boolean {
    return (i + j) % 2 === 0;
  }

  isSecondColor(i: number, j: number): boolean {
    return (i + j) % 2 !== 0;
  }

  hasKnight(i: number, j: number): boolean {
    return this.knightPosition?.x == i && this.knightPosition?.y == j;
  }
}
