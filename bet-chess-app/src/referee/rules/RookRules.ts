import {
  opponentOnTile,
  tileEmptyOrOpponent,
  tileIsEmpty,
} from "./GenralRules";
import { Piece, Position, Side, samePosition } from "../../Constants";

export const rookMove = (
  initialPosition: Position,
  desiredPosition: Position,
  side: Side,
  boardState: Piece[]
): boolean => {
  // Vertical moves
  for (let i = 1; i < 8; i++) {
    // If goin down then = -1 else 1
    let factor = desiredPosition.y < initialPosition.y ? -1 : 1;
    let prevPosition: Position = {
      x: initialPosition.x,
      y: initialPosition.y + i * factor,
    };
    if (samePosition(prevPosition, desiredPosition)) {
      if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
        return true;
      }
    } else {
      if (!tileIsEmpty(prevPosition, boardState)) {
        break;
      }
    }
  }

  // Horizontal move
  if (initialPosition.y === desiredPosition.y) {
    for (let i = 1; i < 8; i++) {
      let factor = desiredPosition.x < initialPosition.x ? -1 : 1;
      let prevPosition: Position = {
        x: initialPosition.x + i * factor,
        y: initialPosition.y,
      };
      if (samePosition(prevPosition, desiredPosition)) {
        if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
          return true;
        }
      } else {
        if (!tileIsEmpty(prevPosition, boardState)) {
          break;
        }
      }
    }
  }
  return false;
};

export const getAllRookMoves = (
  rook: Piece,
  boardState: Piece[]
): Position[] => {
  // Store the possible moves in a Position array
  const possibleMoves: Position[] = [];

  // Moving Up
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y + i,
    };
    if (tileIsEmpty(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileEmptyOrOpponent(destination, boardState, rook.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving Down
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y - i,
    };
    if (tileIsEmpty(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileEmptyOrOpponent(destination, boardState, rook.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving Right
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x + i,
      y: rook.position.y,
    };
    if (tileIsEmpty(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileEmptyOrOpponent(destination, boardState, rook.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Moving Left
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: rook.position.x - i,
      y: rook.position.y,
    };
    if (tileIsEmpty(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileEmptyOrOpponent(destination, boardState, rook.side)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
