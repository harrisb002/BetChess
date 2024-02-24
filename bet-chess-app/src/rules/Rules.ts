import { PieceType, Side } from "../components/Chessboard/Chessboard";

export default class Rules {
    // Check if a move is valid by checking previous & current x,y locations
    // and the type of piece passed using a defined ENUM
    isValidMove(prevX: number, prevY: number, currX: number, currY: number, type: PieceType, side: Side ) {
        // Logic for the Pawn
        if(type === PieceType.PAWN) {
            if(side === Side.WHITE) {
                if(prevY === 1) { // 
                    if(prevX == currX && (currY - prevY === 1 || currY - prevY === 2)){ 
                        // If Pawn is on first rank then allows for the pawn to move 2 spaces
                        return true;
                    }
                }
            }
        }   
        return false;
    }
}