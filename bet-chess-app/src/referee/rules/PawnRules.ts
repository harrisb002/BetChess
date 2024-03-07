import { Piece, PieceType, Position, Side, samePosition } from "../../Constants";
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
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const specialRow = pawn.side === Side.WHITE ? 1 : 6;
  const pawnMovement = pawn.side === Side.WHITE ? 1 : -1;

  const regularMove: Position = {
    x: pawn.position.x,
    y: pawn.position.y + pawnMovement,
  };
  const doubleJump: Position = {
    x: regularMove.x,
    y: regularMove.y + pawnMovement,
  };
  const attackLeft: Position = {
    x: pawn.position.x - 1,
    y: pawn.position.y + pawnMovement,
  };
  const attackRight: Position = {
    x: pawn.position.x + 1,
    y: pawn.position.y + pawnMovement,
  };
  const leftPosition: Position = {
    x: pawn.position.x - 1,
    y: pawn.position.y,
  };
  const rightPosition: Position = {
    x: pawn.position.x + 1,
    y: pawn.position.y,
  };

  if (tileIsEmpty(regularMove, boardState)) {
    possibleMoves.push(regularMove);

    if (pawn.position.y === specialRow && tileIsEmpty(doubleJump, boardState)) {
      possibleMoves.push(doubleJump);
    }
  }

  // Checking to Attack left for both regular attack as well as enPassant
  if (opponentOnTile(attackLeft, boardState, pawn.side)) {
    possibleMoves.push(attackLeft); // Can regular attack opponent to the left
  } else if (tileIsEmpty(attackLeft, boardState)) {
    // Get the opponent pawn to the left and see if it made an enPassant move to allow special attack
    const leftPiece = boardState.find((pawn) =>
      samePosition(pawn.position, leftPosition)
    );
    if (leftPiece != null && leftPiece.enPassant) {
      possibleMoves.push(attackLeft);
    }
  }

  // Checking to Attack right for both regular attack as well as enPassant
  if (opponentOnTile(attackRight, boardState, pawn.side)) {
    possibleMoves.push(attackRight);
  } else if (tileIsEmpty(attackRight, boardState)) {
    const rightPiece = boardState.find((pawn) =>
      samePosition(pawn.position, rightPosition)
    );
    if (rightPiece != null && rightPiece.enPassant) {
      possibleMoves.push(attackRight);
    }
  }

  return possibleMoves;
};
