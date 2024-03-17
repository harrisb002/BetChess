import { PieceType, Side } from "../Types";
import { getAllBishopMoves, getAllKingMoves, getAllKnightMoves, getAllPawnMoves, getAllRookMoves } from "../referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
    pieces: Piece[];

    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }

    // returns a copy of the board & pieces to update UI with new board
    copy(): Board {
        //Create new array with the pieces of the board by cloning each piece in the board into the new copied board
        const clonedPieces = [];
        for (const piece of this.pieces) {
            clonedPieces.push(piece.clone())
        }
        return new Board(clonedPieces)
    }

    getAllMoves() {
        //Find the possible moves for each piece to render them on the board
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }
    };

    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return getAllPawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return getAllKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return getAllBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getAllRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return [
                    ...getAllBishopMoves(piece, boardState),
                    ...getAllRookMoves(piece, boardState),
                ];
            case PieceType.KING:
                return getAllKingMoves(piece, boardState);
            default:
                return [];
        }
    }

    makeMove(isEnPassantMove: boolean, validMove: boolean, pieceInPlay: Piece, destination: Position): boolean {
        const pawnMovement = pieceInPlay.side === Side.WHITE ? 1 : -1;
        if (isEnPassantMove) {
            this.pieces = this.pieces.reduce((currPieces, piece) => {
                // Check if its the piece moved
                if (piece.samePiecePosition(pieceInPlay)) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = false;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    currPieces.push(piece); // Push the updated pieces position
                } else if (
                    !piece.samePosition(new Position(destination.x, destination.y - pawnMovement))
                ) {
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    currPieces.push(piece); // Push the updated pieces position
                }
                return currPieces;
            }, [] as Piece[]);

            // Update the possible moves inside Referee class
            this.getAllMoves();
        } else if (validMove) {
            // Find if there's a piece at the destination (which would be captured if present).
            const destinationPieceIndex = this.pieces.findIndex(piece => piece.samePosition(destination));

            this.pieces = this.pieces.reduce((currPieces, piece, index) => {
                if (index === destinationPieceIndex) {
                    // If the current piece is the one at the destination (to be captured), skip adding it to the updated array.
                    // This effectively removes the captured piece from the game state.
                    return currPieces;
                }
                if (piece.samePiecePosition(pieceInPlay)) {
                    // If the current piece is the one being moved, update its position and enPassant status if it's a pawn.
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = Math.abs(pieceInPlay.position.y - destination.y) === 2;
                    }

                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    currPieces.push(piece);

                } else if (!piece.samePosition(destination)) {
                    // Reset enPassant status for all other pawns on the move.
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    currPieces.push(piece);
                }
                return currPieces;
            }, [] as Piece[]);

            // Update the state with the new array of pieces, reflecting any captures and position changes.
            this.getAllMoves();
        } else {
            // If the move isn't valid, do not update the board state and indicate the move was not successful.
            return false;
        }
        return true; // Move has been made successfully
    }
}
