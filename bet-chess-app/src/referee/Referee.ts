import { PieceType, Side, Piece, Position, samePosition } from "../Constants";
import {
  pawnMove,
  knightMove,
  bishopMove,
  rookMove,
  kingMove,
  getAllPawnMoves,
  getAllKnightMoves,
  getAllBishopMoves,
  getAllRookMoves,
  getAllKingMoves,
} from "./rules";

export default class Rules {
  isEnPassant(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side,
    boardState: Piece[]
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
        const piece = boardState.find(
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
    return false;
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side,
    boardState: Piece[]
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;

      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;

      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;

      case PieceType.QUEEN:
        validMove =
          rookMove(initialPosition, desiredPosition, side, boardState) ||
          bishopMove(initialPosition, desiredPosition, side, boardState);
        break;
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;
    }
    return validMove;
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
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
}