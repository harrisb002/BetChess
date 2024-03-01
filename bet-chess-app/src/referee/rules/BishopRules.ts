import { Piece, Position, Side, samePostion } from "../../Constants";
import { opponentOnTile, tileEmptyOrOpponent, tileIsEmpty } from "./GenralRules";

export const bishopMove = (
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean => {
    // Loop for each tile in the diagonal
    for (let i = 1; i < 8; i++) {
      // Right upwards diagonal (inc. x by 1, dec. y by 1)
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        // Get the squares the bishop has moved through
        let prevPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y + i,
        };
        // Check if the tile is the where the piece is being moved to
        if (samePostion(prevPosition, desiredPosition)) {
          //If tile has a opponent piece on it
          if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!tileIsEmpty(prevPosition, boardState)) {
            break;
          }
        }
      }

      // Right downwards diagonal (inc. x by 1, dec. y by 1)
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let prevPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };
        if (samePostion(prevPosition, desiredPosition)) {
          //If tile has a opponent piece on it
          if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!tileIsEmpty(prevPosition, boardState)) {
            break;
          }
        }
      }

      // Left downwards diagonal (dec. x by 1, dec. y by 1)
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let prevPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y - i,
        };
        // Check if the tile is the where the piece is being moved to
        if (samePostion(prevPosition, desiredPosition)) {
          //If tile has a opponent piece on it
          if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!tileIsEmpty(prevPosition, boardState)) {
            break;
          }
        }
      }

      // Left upwards diagonal (dec. x by 1, inc. y by 1)
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        let prevPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y + i,
        };
        // Check if the tile is the where the piece is being moved to
        if (samePostion(prevPosition, desiredPosition)) {
          //If tile has a opponent piece on it
          if (tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!tileIsEmpty(prevPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }