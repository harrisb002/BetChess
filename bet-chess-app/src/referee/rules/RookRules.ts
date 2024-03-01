import {
  opponentOnTile,
  tileEmptyOrOpponent,
  tileIsEmpty,
} from "./GenralRules";
import { Piece, Position, Side, samePostion } from "../../Constants";

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
    if (samePostion(prevPosition, desiredPosition)) {
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
      if (samePostion(prevPosition, desiredPosition)) {
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
