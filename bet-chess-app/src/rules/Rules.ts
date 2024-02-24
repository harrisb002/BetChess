import { PieceType, Side } from "../components/Chessboard/Chessboard";

export default class Rules {
    // Check if a move is valid by checking previous & current x,y locations
    // and the type of piece passed using a defined ENUM
    isValidMove(prevX: number, prevY: number, currX: number, currY: number, type: PieceType, side: Side ) {
        
        // Logic for the Pawn
        if(type === PieceType.PAWN) {

        }   
        return false;
    }
}