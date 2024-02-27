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

// Initialize the board
export const initialBoardState: Piece[] = [
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 0,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 1,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 2,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 3,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 4,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 5,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 6,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    XPosition: 7,
    YPosition: 6,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 0,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 1,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 2,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 3,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 4,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 5,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 6,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    XPosition: 7,
    YPosition: 1,
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/rook_b.png`,
    XPosition: 0,
    YPosition: 7,
    type: PieceType.ROOK,
    side: Side.BLACK,
  },
  {
    image: `assets/images/rook_b.png`,
    XPosition: 7,
    YPosition: 7,
    type: PieceType.ROOK,
    side: Side.BLACK,
  },
  {
    image: `assets/images/rook_w.png`,
    XPosition: 0,
    YPosition: 0,
    type: PieceType.ROOK,
    side: Side.WHITE,
  },
  {
    image: `assets/images/knight_b.png`,
    XPosition: 1,
    YPosition: 7,
    type: PieceType.KNIGHT,
    side: Side.BLACK,
  },
  {
    image: `assets/images/knight_b.png`,
    XPosition: 6,
    YPosition: 7,
    type: PieceType.KNIGHT,
    side: Side.BLACK,
  },
  {
    image: `assets/images/knight_w.png`,
    XPosition: 1,
    YPosition: 0,
    type: PieceType.KNIGHT,
    side: Side.WHITE,
  },
  {
    image: `assets/images/knight_w.png`,
    XPosition: 6,
    YPosition: 0,
    type: PieceType.KNIGHT,
    side: Side.WHITE,
  },
  {
    image: `assets/images/rook_w.png`,
    XPosition: 7,
    YPosition: 0,
    type: PieceType.ROOK,
    side: Side.WHITE,
  },
  {
    image: `assets/images/bishop_b.png`,
    XPosition: 2,
    YPosition: 7,
    type: PieceType.BISHOP,
    side: Side.BLACK,
  },
  {
    image: `assets/images/bishop_b.png`,
    XPosition: 5,
    YPosition: 7,
    type: PieceType.BISHOP,
    side: Side.BLACK,
  },
  {
    image: `assets/images/bishop_w.png`,
    XPosition: 2,
    YPosition: 0,
    type: PieceType.BISHOP,
    side: Side.WHITE,
  },
  {
    image: `assets/images/bishop_w.png`,
    XPosition: 5,
    YPosition: 0,
    type: PieceType.BISHOP,
    side: Side.WHITE,
  },
  {
    image: `assets/images/queen_b.png`,
    XPosition: 3,
    YPosition: 7,
    type: PieceType.QUEEN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/queen_w.png`,
    XPosition: 3,
    YPosition: 0,
    type: PieceType.QUEEN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/king_b.png`,
    XPosition: 4,
    YPosition: 7,
    type: PieceType.KING,
    side: Side.BLACK,
  },
  {
    image: `assets/images/king_w.png`,
    XPosition: 4,
    YPosition: 0,
    type: PieceType.KING,
    side: Side.WHITE,
  },
];
