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
        }
        return false;
    }
}