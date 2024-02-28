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
      // console.log("Initial Position: ", initialPosition);
      // console.log("Desired Position: ", desiredPosition);

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
    // PAWN LOGIC
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
      } else if (
        //Attacking in upper of bottom left corner
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
    // KNIGHT LOGIC
    else if (type === PieceType.KNIGHT) {
      // Moving logic for Knight
      // console.log("The initial position is: ", initialPosition);
      // console.log("The desired position is: ", desiredPosition);

      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          // For 2 up and 1 left
          if (desiredPosition.y - initialPosition.y === 2 * i) {
            if (desiredPosition.x - initialPosition.x === j) {
              console.log("For 2 up or down and 1 left or right");
            }
          }
          // For 2 right and 1 up
          if (desiredPosition.x - initialPosition.x === 2 * i) {
            if (desiredPosition.y - initialPosition.y === j) {
              console.log("For 2 right or left and 1 up or down");
            }
          }
        }
      }
    }

    return false;
  }
}
