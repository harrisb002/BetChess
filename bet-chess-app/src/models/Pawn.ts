import { PieceType, Side } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece {
    enPassant?: boolean; // This is nullable
    constructor(position: Position, side: Side) {
        super(position, PieceType.PAWN, side) // Initialize the base class 'Piece'
    }
}