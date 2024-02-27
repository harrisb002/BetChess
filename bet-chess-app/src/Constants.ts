export const Xaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Yaxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const GRID_SIZE = 100;

// Used to store the starting position for the pieces
export interface Piece {
    image: string;
    XPosition: number;
    YPosition: number;
    type: PieceType;
    side: Side;
    enPassant?: boolean; // This is nullable
  }
  
  // Used in piece logic in validating moves
export enum Side {
    BLACK,
    WHITE,
  }
  
  // Used in piece logic in validating moves
  export enum PieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING,
  }
  