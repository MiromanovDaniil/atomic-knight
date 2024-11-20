import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initBoard', () => {
    it('should initialize a 10x10 board with all null values', () => {
      const board = service.initBoard();
      expect(board.length).toBe(10);
      expect(board.every(row => row.length === 10 && row.every(cell => cell === null))).toBeTrue();
    });
  });

  describe('restartGame', () => {
    it('should reset the board, move count, result, and knight position', () => {
      service.makeMove(0, 0);
      service.restartGame();

      service.board$.subscribe(board => {
        expect(board.every(row => row.every(cell => cell === null))).toBeTrue();
      });
      service.moveCount$.subscribe(moveCount => {
        expect(moveCount).toBe(0);
      });
      service.knightPosition$.subscribe(knightPosition => {
        expect(knightPosition).toBeNull();
      });
      service.result$.subscribe(result => {
        expect(result).toBe(0);
      });
    });
  });

  describe('makeMove', () => {
    it('should mark the board with the current move number and update move count', () => {
      service.makeMove(1, 1);

      service.board$.subscribe(board => {
        expect(board[1][1]).toBe(1);
      });
      service.moveCount$.subscribe(moveCount => {
        expect(moveCount).toBe(1);
      });
    });
  });

  describe('isBoardEmpty', () => {
    it('should return true for an empty board', () => {
      expect(service.isBoardEmpty()).toBeTrue();
    });

    it('should return false after a move is made', () => {
      service.makeMove(0, 0);
      expect(service.isBoardEmpty()).toBeFalse();
    });
  });

  describe('getMoveCount', () => {
    it('should return the correct move count', () => {
      expect(service.getMoveCount()).toBe(0);
      service.makeMove(0, 0);
      expect(service.getMoveCount()).toBe(1);
    });
  });

  describe('isMoveValid', () => {
    it('should return true for a valid move', () => {
      const possibleMoves = service.getPossibleMoves(4, 4);
      const validMove = possibleMoves[0];
      expect(service.isMoveValid(validMove.x, validMove.y, possibleMoves)).toBeTrue();
    });

    it('should return false for an invalid move', () => {
      const possibleMoves = service.getPossibleMoves(4, 4);
      expect(service.isMoveValid(0, 0, possibleMoves)).toBeFalse();
    });
  });

  describe('getPossibleMoves', () => {
    it('should return all valid knight moves from a given position', () => {
      const moves = service.getPossibleMoves(4, 4);
      expect(moves).toEqual([
        { x: 6, y: 5 }, { x: 6, y: 3 },
        { x: 2, y: 5 }, { x: 2, y: 3 },
        { x: 5, y: 6 }, { x: 5, y: 2 },
        { x: 3, y: 6 }, { x: 3, y: 2 }
      ]);
    });

    it('should not return out-of-bounds moves', () => {
      const moves = service.getPossibleMoves(0, 0);
      expect(moves).toEqual([
        { x: 2, y: 1 },
        { x: 1, y: 2 }
      ]);
    });
  });

  describe('resetGame', () => {
    it('should reset the board and move count', () => {
      service.makeMove(0, 0);
      service.resetGame();
      expect(service.isBoardEmpty()).toBeTrue();
      expect(service.getMoveCount()).toBe(0);
    });
  });
});
