import { PieceType, Side } from "../Constants";
import { Position } from "./Position";
import { Piece } from "./Piece";

export class Pawn extends Piece {
    enPassant?: boolean; // This is nullable
    constructor(position: Position, side: Side) {
        super(position, PieceType.PAWN, side) // Initialize the base class 'Piece'
    }
}