import { Piece, Position, Side } from "../../Constants";
import { opponentOnTile, tileIsEmpty } from "./GenralRules";

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

export const getAllPawnMoves = (piece: Piece, boardState: Piece[]) : Position[] => {
  const possibleMoves: Position[] = [];

  const pawnMovement = piece.side === Side.WHITE ? 1 : -1;

  if(tileIsEmpty({x: piece.position.x, y: piece.position.y + pawnMovement}, boardState)) {
    possibleMoves.push({x: piece.position.x, y: piece.position.y})
  }

  return [];

}
