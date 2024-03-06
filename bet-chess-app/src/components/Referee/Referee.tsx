import { useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import {
  Piece,
  PieceType,
  Position,
  Side,
  initialBoardState,
  samePostion,
} from "../../Constants";
import {
  bishopMove,
  getAllBishopMoves,
  getAllKingMoves,
  getAllKnightMoves,
  getAllPawnMoves,
  getAllRookMoves,
  kingMove,
  knightMove,
  pawnMove,
  rookMove,
} from "../../referee/rules";

export default function Referee() {
  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  function updateAllMoves(): Position[] {
    //Find the possible moves for the piece grab to render them on the board
    setPieces((currPieces) => {
      return currPieces.map((piece) => {
        // Set all possible moves to the valid moves given the piece with the board state
        piece.possibleMoves = getValidMoves(piece, currPieces);
        return piece;
      });
    });

    return [];
  }

  // Returns the styling needed after a move has been made
  function makeMove(piece: Piece, destination: Position): boolean {
    // Check for valid move given if a piece is being attacked
    const validMove = isValidMove(
      piece.position,
      destination,
      piece.type,
      piece.side
    );

    // Check for enPassant
    const isEnPassantMove = isEnPassant(
      piece.position,
      destination,
      piece.type,
      piece.side
    );
    // Find the direction that the pawn is moving
    const pawnMovement = piece.side === Side.WHITE ? 1 : -1;

    if (isEnPassantMove) {
      const updatedPieces = pieces.reduce((pieces, piece) => {
        // Check if its the piece moved
        if (samePostion(piece.position, destination)) {
          piece.enPassant = true;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          pieces.push(piece); // Push the updated pieces position
        } else if (
          !samePostion(piece.position, {
            x: destination.x,
            y: destination.y - pawnMovement,
          })
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          pieces.push(piece); // Push the updated pieces position
        }
        return pieces;
      }, [] as Piece[]);

      // Update the state of the pieces if a EnPassant has occurredÏ
      setPieces(updatedPieces);
    } else if (validMove) {
      const updatedPieces = pieces.reduce((pieces, piece) => {
        // Check if the current piece is the one being moved
        if (samePostion(piece.position, piece.position)) {
          // Check if is a pawn and double jump i.e. a special move
          piece.enPassant =
            Math.abs(piece.position.y - y) === 2 &&
            piece.type === PieceType.PAWN;
          piece.position.x = destination.x;
          piece.position.y = destination.y;

          // Determine if the piece should be promoted based on the row
          let promotionRow = piece.side === Side.WHITE ? 7 : 0;

          if (
            piece.position.y === promotionRow &&
            piece.type === PieceType.PAWN
          ) {
            // Remove hidden class for when promotion square is reached, thus showing modal
            modalRef.current?.classList.remove("hidden");
            setPromotionPawn(piece);
          }

          pieces.push(piece);
        } // If the piece was not the piece grabbed
        else if (!samePostion(piece.position, { x, y })) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          pieces.push(piece);
        }
        return pieces; // return the array of pieces after each loop
      }, [] as Piece[]);

      // Update the state of the pieces after validating move ect...
      setPieces(updatedPieces);
    } else {
      return false;
    }
    return false;
  }

  function isEnPassant(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side
  ) {
    const pawnMovement = side === Side.WHITE ? 1 : -1;

    //Check if attacking piece is pawn
    if (type === PieceType.PAWN) {
      // Upper or bottom left corner || Upper or bottom right corner
      if (
        (desiredPosition.x - initialPosition.x === -1 || //Blacks EnPassant
          desiredPosition.x - initialPosition.x === 1) && //Whites EnPassant
        // If the spot the pawn has moved is on the same file as the opponents
        desiredPosition.y - initialPosition.y === pawnMovement
      ) {
        // Find the piece that has the required qualities
        const piece = pieces.find(
          (piece) =>
            // piece needs to be in the same collumn the pawn is moving to
            piece.position.x === desiredPosition.x &&
            // piece also needs to be one tile behind the piece that it is hitting
            piece.position.y === desiredPosition.y - pawnMovement &&
            piece.enPassant
        );
        if (piece) {
          // Return it if the piece meets the criteria
          return true;
        }
      }
    }
    return true;
  }

  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(initialPosition, desiredPosition, side, pieces);
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, side, pieces);
        break;

      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, side, pieces);
        break;

      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, side, pieces);
        break;

      case PieceType.QUEEN:
        validMove =
          rookMove(initialPosition, desiredPosition, side, pieces) ||
          bishopMove(initialPosition, desiredPosition, side, pieces);
        break;
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, side, pieces);
        break;
    }
    return validMove;
  }

  function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getAllPawnMoves(piece, boardState);
        break;
      case PieceType.KNIGHT:
        return getAllKnightMoves(piece, boardState);
        break;
      case PieceType.BISHOP:
        return getAllBishopMoves(piece, boardState);
        break;
      case PieceType.ROOK:
        return getAllRookMoves(piece, boardState);
        break;
      case PieceType.QUEEN:
        return [
          ...getAllBishopMoves(piece, boardState),
          ...getAllRookMoves(piece, boardState),
        ];
        break;

      case PieceType.KING:
        return getAllKingMoves(piece, boardState);
        break;
    }

    return [];
  }

  return (
    <>
      <Chessboard
        updateAllMoves={updateAllMoves}
        makeMove={makeMove}
        pieces={pieces}
      />
    </>
  );
}
