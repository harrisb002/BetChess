import { Piece, PieceType, Position, Side, samePostion } from "../../Constants";
import {
  opponentOnTile,
  tileEmptyOrOpponent,
  tileIsEmpty,
} from "./GenralRules";

export const pawnMove = (
  initialPosition: Position,
  desiredPosition: Position,
  side: Side,
  boardState: Piece[]
): boolean => {
  const specialRow = side === Side.WHITE ? 1 : 6;
  const pawnMovement = side === Side.WHITE ? 1 : -1;

  if (
    initialPosition.x === desiredPosition.x &&
    initialPosition.y === specialRow &&
    desiredPosition.y - initialPosition.y === 2 * pawnMovement
  ) {
    if (
      tileIsEmpty(desiredPosition, boardState) &&
      tileIsEmpty(
        { x: desiredPosition.x, y: desiredPosition.y - pawnMovement },
        boardState
      )
    ) {
      return true;
    }
  } else if (
    initialPosition.x === desiredPosition.x &&
    desiredPosition.y - initialPosition.y === pawnMovement
  ) {
    if (tileIsEmpty(desiredPosition, boardState)) {
      return true;
    }
  } else if (
    //Attacking in upper of bottom left corner
    desiredPosition.x - initialPosition.x === -1 &&
    desiredPosition.y - initialPosition.y === pawnMovement
  ) {
    if (opponentOnTile(desiredPosition, boardState, side)) {
      return true;
    }
  } //Attacking in the upper or bottom right corner
  else if (
    desiredPosition.x - initialPosition.x === 1 &&
    desiredPosition.y - initialPosition.y === pawnMovement
  ) {
    if (opponentOnTile(desiredPosition, boardState, side)) {
      return true;
    }
  }
  return false;
};

export const getAllPawnMoves = (
  piece: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const specialRow = piece.side === Side.WHITE ? 1 : 6;
  const pawnMovement = piece.side === Side.WHITE ? 1 : -1;

  const regularMove: Position = {
    x: piece.position.x,
    y: piece.position.y + pawnMovement,
  };
  const doubleJump: Position = {
    x: regularMove.x,
    y: regularMove.y + pawnMovement,
  };
  const attackLeft: Position = {
    x: piece.position.x - 1,
    y: piece.position.y + pawnMovement,
  };
  const attackRight: Position = {
    x: piece.position.x + 1,
    y: piece.position.y + pawnMovement,
  };
  const leftPosition: Position = {
    x: piece.position.x - 1,
    y: piece.position.y,
  };
  const rightPosition: Position = {
    x: piece.position.x + 1,
    y: piece.position.y,
  };

  if (tileIsEmpty(regularMove, boardState)) {
    possibleMoves.push(regularMove);

    if (
      piece.position.y === specialRow &&
      tileIsEmpty(doubleJump, boardState)
    ) {
      possibleMoves.push(doubleJump);
    }
  }

  // Checking to Attack left for both regular attack as well as enPassant
  if (opponentOnTile(attackLeft, boardState, piece.side)) {
    possibleMoves.push(attackLeft); // Can regular attack opponent to the left
  } else if (tileIsEmpty(attackLeft, boardState)) {
    // Get the opponent piece to the left and see if it made an enPassant move to allow special attack
    const leftPiece = boardState.find((piece) =>
      samePostion(piece.position, leftPosition)
    );
    if (leftPiece != null && leftPiece.enPassant) {
      possibleMoves.push(attackLeft);
    }
  }

  // Checking to Attack right for both regular attack as well as enPassant
  if (opponentOnTile(attackRight, boardState, piece.side)) {
    possibleMoves.push(attackRight);
  } else if (tileIsEmpty(attackRight, boardState)) {
    const rightPiece = boardState.find((piece) =>
      samePostion(piece.position, rightPosition)
    );
    if (rightPiece != null && rightPiece.enPassant) {
      possibleMoves.push(attackRight);
    }
  }

  return possibleMoves;
};
