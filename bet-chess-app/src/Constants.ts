export const X_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Y_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const GRID_SIZE = 100;

export function samePostion(pos1: Position, pos2: Position) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Used to store the starting position for the pieces
export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  side: Side;
  enPassant?: boolean; // This is nullable
}

// Used to store the position of the pieces
export interface Position {
    x: number;
    y: number;
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
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.PAWN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 2,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.PAWN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/rook_b.png`,
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.ROOK,
    side: Side.BLACK,
  },
  {
    image: `assets/images/rook_b.png`,
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.ROOK,
    side: Side.BLACK,
  },
  {
    image: `assets/images/rook_w.png`,
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.ROOK,
    side: Side.WHITE,
  },
  {
    image: `assets/images/knight_b.png`,
    position: {
      x: 3,
      y: 3,
    },
    type: PieceType.KNIGHT,
    side: Side.BLACK,
  },
  {
    image: `assets/images/knight_b.png`,
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.KNIGHT,
    side: Side.BLACK,
  },
  {
    image: `assets/images/knight_w.png`,
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.KNIGHT,
    side: Side.WHITE,
  },
  {
    image: `assets/images/knight_w.png`,
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.KNIGHT,
    side: Side.WHITE,
  },
  {
    image: `assets/images/rook_w.png`,
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.ROOK,
    side: Side.WHITE,
  },
  {
    image: `assets/images/bishop_b.png`,
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.BISHOP,
    side: Side.BLACK,
  },
  {
    image: `assets/images/bishop_b.png`,
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.BISHOP,
    side: Side.BLACK,
  },
  {
    image: `assets/images/bishop_w.png`,
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.BISHOP,
    side: Side.WHITE,
  },
  {
    image: `assets/images/bishop_w.png`,
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.BISHOP,
    side: Side.WHITE,
  },
  {
    image: `assets/images/queen_b.png`,
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.QUEEN,
    side: Side.BLACK,
  },
  {
    image: `assets/images/queen_w.png`,
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.QUEEN,
    side: Side.WHITE,
  },
  {
    image: `assets/images/king_b.png`,
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.KING,
    side: Side.BLACK,
  },
  {
    image: `assets/images/king_w.png`,
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.KING,
    side: Side.WHITE,
  },
];
