import { PieceType, Side } from "../Constants";
import { Position } from "../models/Position";

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

    // Compares two piece positions
    samePiecePosition(otherPiece: Piece) : boolean {
        return this.position.samePosition(otherPiece.position);
    }
    
    // Overload to compare two positions
    samePosition(otherPosition: Position) : boolean {
        return this.position.samePosition(otherPosition);
    }
}