import { PieceType, Side } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece {
    enPassant?: boolean; // This is nullable
    constructor(position: Position, side: Side, enPassant?: boolean) {
        super(position, PieceType.PAWN, side) // Initialize the base class 'Piece'
    }

    clone() : Pawn {
        return new Pawn(this.position.clone(), this.side, this.enPassant)
    }
}