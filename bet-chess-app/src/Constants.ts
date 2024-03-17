import { Piece } from "./models/Piece";

export const X_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Y_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const GRID_SIZE = 100;

export function samePosition(pos1: Position, pos2: Position) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Used to store the position of the pieces
export interface Position {
  x: number;
  y: number;
}

// Used in piece logic in validating moves
export enum Side {
  BLACK = 'b',
  WHITE  = 'w',
}

// Used in piece logic in validating moves
export enum PieceType {
  PAWN = 'pawn',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  ROOK = 'rook',
  QUEEN = 'queen',
  KING = 'king',
}

// Initialize the board
export const initialBoardState: Piece[] = [
  //White Pawns
  new Piece('assets/images/pawn_w.png', { x: 0, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 1, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 2, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 3, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 4, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 5, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 6, y: 1 }, PieceType.PAWN, Side.WHITE),
  new Piece('assets/images/pawn_w.png', { x: 7, y: 1 }, PieceType.PAWN, Side.WHITE),

  //Black Pawns
  new Piece('assets/images/pawn_b.png', { x: 0, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 1, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 2, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 3, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 4, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 5, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 6, y: 6 }, PieceType.PAWN, Side.BLACK),
  new Piece('assets/images/pawn_b.png', { x: 7, y: 6 }, PieceType.PAWN, Side.BLACK),

  //White rooks
  new Piece('assets/images/rook_w.png', { x: 0, y: 0 }, PieceType.ROOK, Side.WHITE),
  new Piece('assets/images/rook_w.png', { x: 7, y: 0 }, PieceType.ROOK, Side.WHITE),

  //Black rooks
  new Piece('assets/images/rook_b.png', { x: 0, y: 7 }, PieceType.ROOK, Side.BLACK),
  new Piece('assets/images/rook_b.png', { x: 7, y: 7 }, PieceType.ROOK, Side.BLACK),

  //White knights
  new Piece('assets/images/knight_w.png', { x: 1, y: 0 }, PieceType.KNIGHT, Side.WHITE),
  new Piece('assets/images/knight_w.png', { x: 6, y: 0 }, PieceType.KNIGHT, Side.WHITE),

  //Black knights
  new Piece('assets/images/knight_b.png', { x: 1, y: 7 }, PieceType.KNIGHT, Side.BLACK),
  new Piece('assets/images/knight_b.png', { x: 6, y: 7 }, PieceType.KNIGHT, Side.BLACK),

  //White bishops
  new Piece('assets/images/bishop_w.png', { x: 2, y: 0 }, PieceType.BISHOP, Side.WHITE),
  new Piece('assets/images/bishop_w.png', { x: 5, y: 0 }, PieceType.BISHOP, Side.WHITE),

  //Black bishops
  new Piece('assets/images/bishop_b.png', { x: 2, y: 7 }, PieceType.BISHOP, Side.BLACK),
  new Piece('assets/images/bishop_b.png', { x: 5, y: 7 }, PieceType.BISHOP, Side.BLACK),

  //Queens
  new Piece('assets/images/queen_w.png', { x: 3, y: 0 }, PieceType.QUEEN, Side.WHITE),
  new Piece('assets/images/queen_b.png', { x: 3, y: 7 }, PieceType.QUEEN, Side.BLACK),

  //Kings
  new Piece('assets/images/king_w.png', { x: 4, y: 0 }, PieceType.KING, Side.WHITE),
  new Piece('assets/images/king_b.png', { x: 4, y: 7 }, PieceType.KING, Side.BLACK),
];
