import { Piece, Position, Side } from "../../Constants";
import {
  opponentOnTile,
  tileEmptyOrOpponent,
  tileIsEmpty,
} from "./GenralRules";

export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  side: Side,
  boardState: Piece[]
): boolean => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // For 2 up or down and 1 left or right
      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (tileEmptyOrOpponent(desiredPosition, boardState, side)) {
            return true; // Can move or attack the tile
          }
        }
      }
      // For 2 right or left and 1 up or down
      if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (tileEmptyOrOpponent(desiredPosition, boardState, side)) {
            return true; // Can move or attack the tile
          }
        }
      }
    }
  }
  return false;
};

export const getAllKnightMoves = (
  knight: Piece,
  boardState: Piece[]
): Position[] => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {}
  }
  return [];
};
