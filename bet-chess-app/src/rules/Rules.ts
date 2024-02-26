import { PieceType, Side, Piece } from "../components/Chessboard/Chessboard";

export default class Rules {
    // Check if the tile currently has a piece on it
    tileIsEmpty(currX: number, currY: number, boardState: Piece[]): boolean {
        // check if the piece found in the position is null (if there is no piece placed there)
        const piece = boardState.find((piece) => piece.XPosition === currX && piece.YPosition === currY);
        if (piece) {
            return false;
        } else {
            return true;
        }
    }

    // Checking if opponent is on a tile for attacking moves
    opponentOnTile(currX: number, currY: number, boardState: Piece[], side: Side) : boolean {
        // If the piece at this position is an opponent piece
        const piece = boardState.find((piece) => piece.XPosition === currX && piece.YPosition === currY && piece.side !== side)

        if(piece) {
            return true;
        } else {
            return false
        }
    }

    isEnPassant(currX: number, currY: number, boardState: Piece[], side: Side) {
        const pawnMovement = side === Side.WHITE ? 1 : -1;

        //Check if attacking piece is pawn
        

        //Check if in upperleft/right

        //Check if in bottomleft/right

        //Check if piece under/above the attacked tile

        //If the attacked piece has made an enPassant move in the previous turn

        // If enemy piece subtract one
        const piece = boardState.find(piece => piece.XPosition === currX && currY === currY + pawnMovement);

        // Check if its an enPassant
        if(piece) {
            
        } else {

        }

    }

    // Check if a move is valid by checking previous/current x,y locations
    // the type of piece passed using a defined ENUM, the side of the piece
    // The board state is also needed to determine valid moves
    isValidMove(prevX: number, prevY: number, currX: number, currY: number, type: PieceType, side: Side, boardState: Piece[]) {
       
        // Logic for the Pawn
        if (type === PieceType.PAWN) {
            const specialRow = side === Side.WHITE ? 1 : 6;
            const pawnMovement = side === Side.WHITE ? 1 : -1;

            if (prevX === currX && prevY === specialRow && currY - prevY === 2 * pawnMovement) {
                if (this.tileIsEmpty(currX, currY, boardState) && this.tileIsEmpty(currX, currY - pawnMovement, boardState)) {
                    return true;
                }
            } else if (prevX === currX && currY - prevY === pawnMovement) {
                if (this.tileIsEmpty(currX, currY, boardState)) {
                    return true;
                }
            }

            //Attacking logic
            //Attacking in upper of bottom left corner
            else if (currX - prevX === -1 && currY - prevY === pawnMovement) {
                if(this.opponentOnTile(currX, currY, boardState, side)) {
                    return true;
                // console.log("attack enemy on upper/ bottom left");
                }
                // console.log("upper/ bottom left");
            } //Attacking in the upper or bottom right corner
            else if (currX - prevX === 1 && currY - prevY === pawnMovement) {
                if(this.opponentOnTile(currX, currY, boardState, side)) {
                    return true;
                // console.log("attack enemy on upper/ bottom right");
                }
                // console.log("upper/ bottom right");
            }
        }
        return false;
    }
}