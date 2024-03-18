import { PieceType, Side } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece {
    enPassant?: boolean; // This is nullable
    constructor(position: Position, side: Side, enPassant?: boolean, possibleMoves: Position[] = []) {
        super(position, PieceType.PAWN, side, possibleMoves) // Initialize the base class 'Piece'
        this.enPassant = enPassant;
        
    }

    clone() : Pawn {
        return new Pawn(this.position.clone(), this.side, this.enPassant, this.possibleMoves)
    }
}