import { Side } from "../../Types";
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
    const destination: Position = new Position(king.position.x - i, king.position.y + i)
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

// Enemy moves have been predetermined before calling this method
export const getCastlingMoves = (king: Piece, boardState: Piece[]) => {
  const possibleMoves: Position[] = [];
  if (king.hasMoved) return possibleMoves; // Cant castle if king has moved

  //Get the rooks from the same side that have not moved yet
  const rooks = boardState.filter(piece => piece.isRook && piece.side == king.side && !piece.hasMoved);

  // Check if their are no obstructions (pieces) to castling
  // The queen side rook should have 3 possible moves, the king side rook should have 2
  for (const rook of rooks) {
    // Check direction from rook to king by subtracting x-position of rooks position from king
    const direction = (rook.position.x - king.position.x > 0) ? 1 : -1;
    // Get the position of the king
    const adjacentPosition = king.position.clone();
    // Add that to the direction of the rook 
    adjacentPosition.x += direction;

    // Omit all the rooks that cannot move adjacent to the king
    if (!rook.possibleMoves?.some(move => move.samePosition(adjacentPosition))) continue;

    // Now check if any of the tiles between rook and king are under attack
    const tilesBetweenRookAndKing = rook.possibleMoves.filter(move => move.y === king.position.y);

    // Get all enemy moves to make sure that they cant move there
    const opponentPieces = boardState.filter(piece => piece.side !== king.side);
    let validMove = true;

    //Loop through all the opponent pieces
    for (const opponent of opponentPieces) {
      // Make sure they have moves
      if(opponent.possibleMoves === undefined) continue;
      // Go through their moves
      for(const move of opponent.possibleMoves) {
        // Check if that move corresponds with the tiles between rook and king
        if(tilesBetweenRookAndKing.some(tile => tile.samePosition(move))){
          // If so then set castling to false
          validMove = false
        }
      }
    }
    if(!validMove) continue;
  }

  return possibleMoves;
}
