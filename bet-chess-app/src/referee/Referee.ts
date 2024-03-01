import { PieceType, Side, Piece, Position, samePostion } from "../Constants";
import { tileEmptyOrOpponent, tileIsEmpty } from "./rules/GenralRules";
import { pawnMove } from "./rules/PawnRules";

export default class Rules {


  isEnPassant(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side,
    boardState: Piece[]
  ) {
    const pawnMovement = side === Side.WHITE ? 1 : -1;

    //Check if attacking piece is pawn
    if (type === PieceType.PAWN) {
      // Upper or bottom left corner || Upper or bottom right corner
      if (
        (desiredPosition.x - initialPosition.x === -1 || //Blacks EnPassant
          desiredPosition.x - initialPosition.x === 1) && //Whites EnPassant
        // If the spot the pawn has moved is on the same file as the opponents
        desiredPosition.y - initialPosition.y === pawnMovement
      ) {
        // Find the piece that has the required qualities
        const piece = boardState.find(
          (piece) =>
            // piece needs to be in the same collumn the pawn is moving to
            piece.position.x === desiredPosition.x &&
            // piece also needs to be one tile behind the piece that it is hitting
            piece.position.y === desiredPosition.y - pawnMovement &&
            piece.enPassant
        );
        if (piece) {
          // Return it if the piece meets the criteria
          return true;
        }
      }
    }
    return false;
  }

  bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
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

  knightMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
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
  }

  rookMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
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
  }

  kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
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
  }

  // Check if a move is valid by checking previous/current x,y locations
  // the type of piece passed using a defined ENUM, the side of the piece
  // The board state is also needed to determine valid moves
  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side,
    boardState: Piece[]
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMove = this.bishopMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;

      case PieceType.KNIGHT:
        validMove = this.knightMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;

      case PieceType.ROOK:
        validMove = this.rookMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;

      case PieceType.QUEEN:
        validMove =
          this.rookMove(initialPosition, desiredPosition, side, boardState) ||
          this.bishopMove(initialPosition, desiredPosition, side, boardState);
        break;
      case PieceType.KING:
        validMove = this.kingMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
        break;
    }
    return validMove;
  }
}
