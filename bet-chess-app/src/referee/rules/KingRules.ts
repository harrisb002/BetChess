import { Piece, Position, Side, samePostion } from "../../Constants";
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

    let prevPosition: Position = {
      x: initialPosition.x + i * Xfactor,
      y: initialPosition.y + i * Yfactor,
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
  return false;
};
