// Bot.ts
import { Board } from "../../models/Board";
import { Position, Piece } from "../../models";
import { Side } from "../../Types";

export class ChessBot {
  private board: Board;
  private side: Side;

  constructor(board: Board, side: Side) {
    this.board = board;
    this.side = side;
  }

  // Randomly choose a move for simplicity to start
  public makeBotMove(): void {
    const pieces = this.board.pieces.filter((piece) => piece.side === this.side);
    let moves = [];
    let piece: Piece;

    // Collect all possible moves for the bot's side
    for (piece of pieces) {
      if (piece.possibleMoves) {
        moves.push(...piece.possibleMoves.map(move => ({ piece, move })));
      }
    }

    if (moves.length > 0) {
      const { piece, move } = moves[Math.floor(Math.random() * moves.length)]; // Random move selection
      this.board.makeMove(false, true, piece, move);
    }
  }
}
