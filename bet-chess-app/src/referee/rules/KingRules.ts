import { Side } from "../../Constants";
import { Piece, Position } from "../../models";
import {
  opponentOnTile,
  tileEmptyOrOpponent,
  tileIsEmpty,
} from "./GenralRules";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position,
  side: Side,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 2; i++) {
    let Xfactor =
      desiredPosition.x < initialPosition.x
        ? -1
        : desiredPosition.x > initialPosition.x
          ? 1
          : 0;
    let Yfactor =
      desiredPosition.y < initialPosition.y
        ? -1
        : desiredPosition.y > initialPosition.y
          ? 1
          : 0;

    let prevPosition: Position = new Position(initialPosition.x + i * Xfactor, initialPosition.y + i * Yfactor);

    if (prevPosition.samePosition(desiredPosition)) {
      if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
        return true;
      }
    } else {
      if (!tileIsEmpty(prevPosition, boardState)) {
        break;
      }
    }
  }
  return false;
};

export const getAllKingMoves = (
  king: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Moving Up
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x, king.position.y + i);

    // Bounds checking, if off board then dont add
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving Down
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x, king.position.y - i)

    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving Left
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x - i, king.position.y)
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving Right
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x + i, king.position.y)
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving to up-right corner
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x + i, king.position.y + i)
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving up-left corner
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x - i, king.position.y - i)
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving to bottom-Right corner
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x + i, king.position.y - i)
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving to bottom-left corner
  for (let i = 1; i < 2; i++) {
    const destination: Position = new Position(king.position.x - i, king.position.y - i)
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (tileIsEmpty(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (opponentOnTile(destination, boardstate, king.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
