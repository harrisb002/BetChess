import { PieceType, Side } from "../Types";
import { Position } from "../models/Position";

export class Piece {
    image: string;
    position: Position;
    type: PieceType;
    side: Side;
    possibleMoves: Position[];
    hasMoved: boolean;

    constructor(position: Position, type: PieceType, side: Side, hasMoved: boolean, possibleMoves: Position[] = []) {
        this.image = `assets/images/${type}_${side}.png`;
        this.position = position;
        this.type = type;
        this.side = side;
        this.possibleMoves = possibleMoves;
        this.hasMoved = hasMoved;
    }

    // Used to return a copy of a piece to create a copy of the board to update UI
    clone(): Piece {
        return new Piece(this.position.clone(), this.type, this.side, this.hasMoved, this.possibleMoves?.map(possibleMove => possibleMove.clone()));
    }

    get isPawn(): boolean {
        return this.type === PieceType.PAWN;
    }
    get isKnight(): boolean {
        return this.type === PieceType.KNIGHT;
    }
    get isBishop(): boolean {
        return this.type === PieceType.BISHOP;
    }
    get isRook(): boolean {
        return this.type === PieceType.ROOK;
    }
    get isQueen(): boolean {
        return this.type === PieceType.QUEEN;
    }
    get isKing(): boolean {
        return this.type === PieceType.KING
    }

    // Compares two piece positions
    samePiecePosition(otherPiece: Piece): boolean {
        return this.position.samePosition(otherPiece.position);
    }

    // Overload to compare two positions
    samePosition(otherPosition: Position): boolean {
        return this.position.samePosition(otherPosition);
    }
}