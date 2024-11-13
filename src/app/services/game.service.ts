import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private board: number[][] = [];
  private boardSubject = new BehaviorSubject<number[][]>(this.initBoard());
  private moveCount: number = 0;
  private moveCountSubject = new BehaviorSubject<number>(0);
  private knightPosition: { x: number, y: number } | null = null;
  private knightPositionSubject = new BehaviorSubject<{ x: number, y: number } | null>(null);
  private result: number = 0;
  private resultSubject = new BehaviorSubject<number>(0);
  private knightMoves = [
    { x: 2, y: 1 }, { x: 2, y: -1 },
    { x: -2, y: 1 }, { x: -2, y: -1 },
    { x: 1, y: 2 }, { x: 1, y: -2 },
    { x: -1, y: 2 }, { x: -1, y: -2 }
  ];
  board$ = this.boardSubject.asObservable();
  moveCount$ = this.moveCountSubject.asObservable();
  knightPosition$ = this.knightPositionSubject.asObservable();
  result$ = this.resultSubject.asObservable();

  initBoard(): number[][] {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.moveCount = 0;
    this.knightPosition = null;
    return this.board;
  }

  restartGame(): void {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.moveCount = 0;
    this.result = 0;
    this.boardSubject.next(this.board);
    this.moveCountSubject.next(this.moveCount);
    this.knightPositionSubject.next(this.knightPosition);
    this.resultSubject.next(this.result);
  }

  makeMove(x: number, y: number): number[][] {
    this.board[x][y] = ++this.moveCount;
    this.moveCountSubject.next(this.moveCount);
    this.knightPositionSubject.next(this.knightPosition);
    return this.board;
  }

  isBoardEmpty(): boolean {
    return this.moveCount == 0;
  }  

  getMoveCount(): number {
    return this.moveCount;
  }

  isMoveValid(x: number, y: number, possibleMoves: { x: number, y: number }[]): boolean {
    return possibleMoves.some(move => move.x === x && move.y === y);
  }

  getPossibleMoves(x: number, y: number): { x: number, y: number }[] {
    return this.knightMoves
      .map(move => ({ x: x + move.x, y: y + move.y }))
      .filter(move => this.isInBounds(move.x, move.y) && this.board[move.x][move.y] === null);
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  resetGame(): void {
    this.initBoard();
  }
}
