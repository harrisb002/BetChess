import { PieceType, Side } from "./Types";
import { Board } from "./models/Board";
import { Pawn } from "./models/Pawn";
import { Piece } from "./models/Piece";
import { Position } from "./models/Position";

export const X_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Y_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const GRID_SIZE = 100;

// Initialize the board
export const initialBoard: Board = new Board( [
  //White Pawns
  new Pawn(new Position(0, 1), Side.ALLY),
  new Pawn(new Position(1, 1), Side.ALLY),
  new Pawn(new Position(2, 1), Side.ALLY),
  new Pawn(new Position(3, 1), Side.ALLY),
  new Pawn(new Position(4, 1), Side.ALLY),
  new Pawn(new Position(5, 1), Side.ALLY),
  new Pawn(new Position(6, 1), Side.ALLY),
  new Pawn(new Position(7, 1), Side.ALLY),

  //Black Pawns
  new Pawn(new Position(0, 6), Side.OPPONENT),
  new Pawn(new Position(1, 6), Side.OPPONENT),
  new Pawn(new Position(2, 6), Side.OPPONENT),
  new Pawn(new Position(3, 6), Side.OPPONENT),
  new Pawn(new Position(4, 6), Side.OPPONENT),
  new Pawn(new Position(5, 6), Side.OPPONENT),
  new Pawn(new Position(6, 6), Side.OPPONENT),
  new Pawn(new Position(7, 6), Side.OPPONENT),

  //White rooks
  new Piece(new Position(0, 0), PieceType.ROOK, Side.ALLY),
  new Piece(new Position(7, 0), PieceType.ROOK, Side.ALLY),

  //Black rooks
  new Piece(new Position(0, 7), PieceType.ROOK, Side.OPPONENT),
  new Piece(new Position(7, 7), PieceType.ROOK, Side.OPPONENT),

  //White knights
  new Piece(new Position(1, 0), PieceType.KNIGHT, Side.ALLY),
  new Piece(new Position(6, 0), PieceType.KNIGHT, Side.ALLY),

  //Black knights
  new Piece(new Position(1, 7), PieceType.KNIGHT, Side.OPPONENT),
  new Piece(new Position(6, 7), PieceType.KNIGHT, Side.OPPONENT),

  //White bishops
  new Piece(new Position(2, 0), PieceType.BISHOP, Side.ALLY),
  new Piece(new Position(5, 0), PieceType.BISHOP, Side.ALLY),

  //Black bishops
  new Piece(new Position(2, 7), PieceType.BISHOP, Side.OPPONENT),
  new Piece(new Position(5, 7), PieceType.BISHOP, Side.OPPONENT),

  //Queens
  new Piece(new Position(3, 0), PieceType.QUEEN, Side.ALLY),
  new Piece(new Position(3, 7), PieceType.QUEEN, Side.OPPONENT),

  //Kings
  new Piece(new Position(4, 0), PieceType.KING, Side.ALLY),
  new Piece(new Position(4, 7), PieceType.KING, Side.OPPONENT),
]);
