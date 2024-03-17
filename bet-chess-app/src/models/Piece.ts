import { PieceType, Position, Side } from "../Constants";

export class Piece {
    image: string;
    position: Position;
    type: PieceType;
    side: Side;
    enPassant?: boolean; // This is nullable
    possibleMoves?: Position[];

    constructor(image: string, position: Position, type: PieceType, side: Side) {
        this.image = image;
        this.position = position;
        this.type = type;
        this.side = side;
    }

}