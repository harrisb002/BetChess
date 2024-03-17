import { PieceType, Position, Side } from "../Constants";

export class Piece {
    image: string;
    position: Position;
    type: PieceType;
    side: Side;
    enPassant?: boolean; // This is nullable
    possibleMoves?: Position[];

    constructor(position: Position, type: PieceType, side: Side) {
        this.image = `assets/images/${type}_${side}.png`;
        this.position = position;
        this.type = type;
        this.side = side;
    }

}