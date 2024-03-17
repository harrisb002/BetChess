import { Side } from "../../Types";
import { Piece, Position } from "../../models";

// Check if the tile currently has a piece on it
export const tileIsEmpty = (
  position: Position,
  boardState: Piece[]
): boolean => {
  // check if the piece found in the position is null (if there is no piece placed there)
  const piece = boardState.find((piece) =>
    piece.position.samePosition(position)
  );
  if (piece) {
    return false;
  } else {
    return true;
  }
};

// Checking if opponent is on a tile for attacking moves
export const opponentOnTile = (
  position: Position,
  boardState: Piece[],
  side: Side
): boolean => {
  // If the piece at this position is an opponent piece
  const piece = boardState.find(
    (piece) => piece.samePosition(position) && piece.side !== side
  );
  if (piece) {
    return true;
  } else {
    return false;
  }
};

// Combine the two functions above
export const tileEmptyOrOpponent = (
  position: Position,
  boardState: Piece[],
  side: Side
): boolean => {
  return (
    tileIsEmpty(position, boardState) ||
    opponentOnTile(position, boardState, side)
  );
};
