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
    clone(): Board {
        //Create new array with the pieces of the board by cloning each piece in the board into the new copied board
        return new Board(this.pieces.map(piece => piece.clone()));
    }

    getAllMoves() {
        //Find the possible moves for each piece to render them on the board
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }

        // KING SAFTEY-Get all the moves for the king, and check if any of them would be getting attacked by enemy piece
        const king = this.pieces.find(piece => piece.isKing && piece.side === Side.BLACK)
        // Check if king or its moves are undefined
        if(king?.possibleMoves === undefined) return;

        // Get original position for the king
        const originalPosition = king.position.clone();

        // Simlating all the possible king moves
        for(const move of king.possibleMoves) {
            king.position = move;
            let safe = true;

            // Find out if the move is safe for the king
            for(const piece of this.pieces) {
                if(piece.side === Side.BLACK) continue;
                if(piece.isPawn) {
                    // Get all possible moves for pawn w/ the updated position of the king
                    const allPossiblePawnMoves = this.getValidMoves(piece, this.pieces);
                    if(allPossiblePawnMoves?.some(piece => piece.samePosition(move))){
                        safe = false;
                    }
                }
                if(piece.possibleMoves?.some(piece => piece.samePosition(move))){
                    safe = false;
                }
            }

            // King cant move in these positions, so remove them
            if(!safe) {
                king.possibleMoves = king.possibleMoves?.filter(move => !move.samePosition(move))
            }
        }
        king.position = originalPosition;
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

                    // Does not update the reference to pieceInPlay because the piece is being copoed
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
            this.pieces = this.pieces.reduce((currPieces, piece) => {
                // Piece that we are currently moving
                if (piece.samePiecePosition(pieceInPlay)) {
                    //SPECIAL MOVE
                    if (piece.isPawn)
                        (piece as Pawn).enPassant =
                            Math.abs(pieceInPlay.position.y - destination.y) === 2 &&
                            piece.type === PieceType.PAWN;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    currPieces.push(piece);
                } else if (!piece.samePosition(destination)) {
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
