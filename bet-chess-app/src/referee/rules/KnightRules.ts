import { Side } from "../../Types";
import { Piece, Position } from "../../models";
import {
  tileEmptyOrOpponent,
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
  // Store the possible moves in a Position array
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // Same as logic above but storing in variables to use
      const moveVertical: Position = new Position(knight.position.x + j, knight.position.y + i * 2)
      const moveHorizontal: Position = new Position(knight.position.x + i * 2, knight.position.y + j)

      if (tileEmptyOrOpponent(moveHorizontal, boardState, knight.side)) {
        possibleMoves.push(moveHorizontal);
      }
      if (tileEmptyOrOpponent(moveVertical, boardState, knight.side)) {
        possibleMoves.push(moveVertical);
      }
    }
  }
  return possibleMoves;
};
