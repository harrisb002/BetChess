import { PieceType, Position, Side } from "../Constants";

export class Piece{
    image: string;
    position: Position;
    type: PieceType;
    side: Side;
    enPassant?: boolean; // This is nullable
    possibleMoves?: Position[];
    
    constructor() {
        this.image = "";
        this.position = {x: 0, y: 0};
        this.type = PieceType.PAWN;
        this.side = Side.WHITE;
    }

}