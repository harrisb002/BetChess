import { PieceType, Side, Piece, Position } from "../Constants";

export default class Rules {
  // Check if the tile currently has a piece on it
  tileIsEmpty(currX: number, currY: number, boardState: Piece[]): boolean {
    // check if the piece found in the position is null (if there is no piece placed there)
    const piece = boardState.find(
      (piece) => piece.position.x === currX && piece.position.y === currY
    );
    if (piece) {
      return false;
    } else {
      return true;
    }
  }

  // Checking if opponent is on a tile for attacking moves
  opponentOnTile(
    currX: number,
    currY: number,
    boardState: Piece[],
    side: Side
  ): boolean {
    // If the piece at this position is an opponent piece
    const piece = boardState.find(
      (piece) =>
        piece.position.x === currX &&
        piece.position.y === currY &&
        piece.side !== side
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

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
      // Same as attacking logic
      // Upper or bottom left corner || Upper or bottom right corner
      console.log("Initial Position: ", initialPosition);
      console.log("Desired Position: ", desiredPosition);

      if (
        (desiredPosition.x - initialPosition.x === -1 || //Blacks EnPassant
          desiredPosition.x - initialPosition.x === 1) && //Whites EnPassant
        desiredPosition.y - initialPosition.y === pawnMovement // If the spot the pawn has moved is on the same file as the opponents
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
        if (piece) { // Return it if the piece meets the criteria
          return true;
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
    // Logic for the Pawn
    if (type === PieceType.PAWN) {
      const specialRow = side === Side.WHITE ? 1 : 6;
      const pawnMovement = side === Side.WHITE ? 1 : -1;

      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnMovement
      ) {
        if (
          this.tileIsEmpty(desiredPosition.x, desiredPosition.y, boardState) &&
          this.tileIsEmpty(
            desiredPosition.x,
            desiredPosition.y - pawnMovement,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnMovement
      ) {
        if (
          this.tileIsEmpty(desiredPosition.x, desiredPosition.y, boardState)
        ) {
          return true;
        }
      } else if ( //Attacking in upper of bottom left corner
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnMovement
      ) {
        if (
          this.opponentOnTile(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            side
          )
        ) {
          return true;
          // console.log("attack enemy on upper/ bottom left");
        }
        // console.log("upper/ bottom left");
      } //Attacking in the upper or bottom right corner
      else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnMovement
      ) {
        if (
          this.opponentOnTile(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            side
          )
        ) {
          return true;
          // console.log("attack enemy on upper/ bottom right");
        }
        // console.log("upper/ bottom right");
      }
    }
    return false;
  }
}
