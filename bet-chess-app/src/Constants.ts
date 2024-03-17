import { PieceType, Side } from "./Types";
import { Chessboard } from "./models/Chessboard";
import { Pawn } from "./models/Pawn";
import { Piece } from "./models/Piece";
import { Position } from "./models/Position";

export const X_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Y_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const GRID_SIZE = 100;

// Initialize the board
export const initialBoard: Chessboard = new Chessboard( [
  //White Pawns
  new Pawn(new Position(0, 1), Side.WHITE),
  new Pawn(new Position(1, 1), Side.WHITE),
  new Pawn(new Position(2, 1), Side.WHITE),
  new Pawn(new Position(3, 1), Side.WHITE),
  new Pawn(new Position(4, 1), Side.WHITE),
  new Pawn(new Position(5, 1), Side.WHITE),
  new Pawn(new Position(6, 1), Side.WHITE),
  new Pawn(new Position(7, 1), Side.WHITE),

  //Black Pawns
  new Pawn(new Position(0, 6), Side.BLACK),
  new Pawn(new Position(1, 6), Side.BLACK),
  new Pawn(new Position(2, 6), Side.BLACK),
  new Pawn(new Position(3, 6), Side.BLACK),
  new Pawn(new Position(4, 6), Side.BLACK),
  new Pawn(new Position(5, 6), Side.BLACK),
  new Pawn(new Position(6, 6), Side.BLACK),
  new Pawn(new Position(7, 6), Side.BLACK),

  //White rooks
  new Piece(new Position(0, 0), PieceType.ROOK, Side.WHITE),
  new Piece(new Position(7, 0), PieceType.ROOK, Side.WHITE),

  //Black rooks
  new Piece(new Position(0, 7), PieceType.ROOK, Side.BLACK),
  new Piece(new Position(7, 7), PieceType.ROOK, Side.BLACK),

  //White knights
  new Piece(new Position(1, 0), PieceType.KNIGHT, Side.WHITE),
  new Piece(new Position(6, 0), PieceType.KNIGHT, Side.WHITE),

  //Black knights
  new Piece(new Position(1, 7), PieceType.KNIGHT, Side.BLACK),
  new Piece(new Position(6, 7), PieceType.KNIGHT, Side.BLACK),

  //White bishops
  new Piece(new Position(2, 0), PieceType.BISHOP, Side.WHITE),
  new Piece(new Position(5, 0), PieceType.BISHOP, Side.WHITE),

  //Black bishops
  new Piece(new Position(2, 7), PieceType.BISHOP, Side.BLACK),
  new Piece(new Position(5, 7), PieceType.BISHOP, Side.BLACK),

  //Queens
  new Piece(new Position(3, 0), PieceType.QUEEN, Side.WHITE),
  new Piece(new Position(3, 7), PieceType.QUEEN, Side.BLACK),

  //Kings
  new Piece(new Position(4, 0), PieceType.KING, Side.WHITE),
  new Piece(new Position(4, 7), PieceType.KING, Side.BLACK),
]);
