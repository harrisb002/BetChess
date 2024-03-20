import { PieceType, Side } from "../Types";
import { getAllBishopMoves, getAllKingMoves, getAllKnightMoves, getAllPawnMoves, getAllRookMoves } from "../referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
    pieces: Piece[];
    totalTurns: number;

    constructor(pieces: Piece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    // Get the team whose turn it is
    get currentSide(): Side {
        return this.totalTurns % 2 === 0 ? Side.OPPONENT : Side.ALLY;
    }

    // returns a copy of the board & pieces to update UI with new board
    clone(): Board {
        //Create new array with the pieces of the board by cloning each piece in the board into the new copied board
        return new Board(this.pieces.map(piece => piece.clone()), this.totalTurns);
    }

    getAllMoves() {
        //Find the possible moves for each piece to render them on the board
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }
        // Make sure the king moves are safe
        this.safeKingMoves();

        //Now check all other current team moves
        this.checkAllMovesKingSafety();
    }

    // Loop thru curr team pieces to check validity
    checkAllMovesKingSafety() {
        //Loop thru all curr sides pieces by a filter
        for (const piece of this.pieces.filter(p => p.side === this.currentSide)) {
            if (piece.possibleMoves === undefined) continue;
            // Create a simulated board to simulate all the moves for each piece 
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();

                // Get rid of all the get the pieces that in the same position of the move
                // This allows the attacking piece to be captured to combat a check
                simulatedBoard.pieces = simulatedBoard.pieces.filter(piece => !piece.samePosition(move))
            

                //Clone each piece by first finding each piece based on position
                // Use ! to mark that pieceClone will be defined
                const pieceClone = simulatedBoard.pieces.find(p => p.samePiecePosition(piece))!
                //Now update the clone piece position to match the move
                pieceClone.position = move.clone();

                //Get king with updated position (Also specify that it is not undefined with !)
                const kingClone = simulatedBoard.pieces.find(piece => piece.isKing && piece.side === simulatedBoard.currentSide)!

                //Get all moves for the current enemy piece
                for (const opponent of simulatedBoard.pieces.filter(p => p.side !== simulatedBoard.currentSide)) {
                    opponent.possibleMoves = simulatedBoard.getValidMoves(opponent, simulatedBoard.pieces) // Pass opponent and boardstate

                    // Check validity of moves using the currently updated enemy moves
                    // Find the Pawns to check diaganol attacks
                    if (opponent.isPawn) {
                        //Check x-pos for direction of movement to see if Pawn is threatening king
                        if (opponent.possibleMoves.some(move => move.x !== opponent.position.x && move.samePosition(kingClone.position))) {
                            //Use reference to original king to remove the move as a possible move
                            piece.possibleMoves = piece.possibleMoves?.filter(move => !move.samePosition(move))
                        }
                    } else { // If it is not a pawn, just check all moves made by all other pieces
                        if (opponent.possibleMoves.some(move => move.samePosition(kingClone.position))) {
                            //Use reference to original king to remove the move as a possible move
                            piece.possibleMoves = piece.possibleMoves?.filter(move => !move.samePosition(move))
                        }
                    }
                }

            }
        }
    }

    safeKingMoves() {
        // KING SAFTEY-Get all the moves for the king, and check if any of them would be getting attacked by enemy piece
        const king = this.pieces.find(piece => piece.isKing && piece.side === this.currentSide)
        // Check if king or its moves are undefined
        if (king?.possibleMoves === undefined) return;

        // Simlating all the possible king moves
        for (const move of king.possibleMoves) {
            const simulatedBoard = this.clone(); // Use a cloned board so its not referencing underline boardstate

            // Check for any peice that may be atacking king
            const pieceInPosition = simulatedBoard.pieces.find(piece => piece.samePosition(move));
            // If their is a piece in the kings way then remove it to see ifonce captured it would be in check
            if (pieceInPosition !== undefined) {
                simulatedBoard.pieces = simulatedBoard.pieces.filter(piece => !piece.samePosition(move))
            }
            // Make sure the king is not nnul before assigning it to the move
            const simulatedKing = simulatedBoard.pieces.find(piece => piece.isKing && piece.side === simulatedBoard.currentSide);
            if (simulatedKing === undefined) continue; // Make sure the king is not undefined, though by this point it should never be 
            simulatedKing.position = move; // Now assign the simulated king to the move

            // Get all the opponent moves and to make sure they dont conflict with the kings moves
            for (const enemy of simulatedBoard.pieces.filter(p => p.side !== simulatedBoard.currentSide)) {
                enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
            }
            // Init as safe for king move
            let safe = true;

            // Find out if the move is safe for the king
            for (const piece of simulatedBoard.pieces) {
                if (piece.side === simulatedBoard.currentSide) continue; // If king is on the same team then do nothing
                if (piece.isPawn) {
                    // Get all possible moves for pawn w/ the updated position of the king
                    const allPossiblePawnMoves = simulatedBoard.getValidMoves(piece, simulatedBoard.pieces);
                    // If x-value is the same then dont need to check for pawn cause they only attack to the corners
                    // But uf x-position is not the same and is attacking the king then it is not safe
                    if (allPossiblePawnMoves?.some(possPawnMove => possPawnMove.x !== piece.position.x &&
                        possPawnMove.samePosition(move))) {
                        safe = false;
                        break;
                    }
                } else if (piece.possibleMoves?.some(piece => piece.samePosition(move))) {
                    safe = false;
                    break;
                }
            }

            // King cant move in these positions, so remove them
            if (!safe) {
                king.possibleMoves = king.possibleMoves?.filter(m => !m.samePosition(move))
            }
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
        const pawnMovement = pieceInPlay.side === Side.ALLY ? 1 : -1;
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
