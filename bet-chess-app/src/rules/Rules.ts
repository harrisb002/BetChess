import { PieceType, Side, Piece, Position, samePostion } from "../Constants";

export default class Rules {
  tileEmptyOrOpponent(
    position: Position,
    boardState: Piece[],
    side: Side
  ): boolean {
    return (
      this.tileIsEmpty(position, boardState) ||
      this.opponentOnTile(position, boardState, side)
    );
  }

  // Check if the tile currently has a piece on it
  tileIsEmpty(position: Position, boardState: Piece[]): boolean {
    // check if the piece found in the position is null (if there is no piece placed there)
    const piece = boardState.find((piece) =>
      samePostion(piece.position, position)
    );
    if (piece) {
      return false;
    } else {
      return true;
    }
  }

  // Checking if opponent is on a tile for attacking moves
  opponentOnTile(position: Position, boardState: Piece[], side: Side): boolean {
    // If the piece at this position is an opponent piece
    const piece = boardState.find(
      (piece) => samePostion(piece.position, position) && piece.side !== side
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

  pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
    const specialRow = side === Side.WHITE ? 1 : 6;
    const pawnMovement = side === Side.WHITE ? 1 : -1;

    if (
      initialPosition.x === desiredPosition.x &&
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnMovement
    ) {
      if (
        this.tileIsEmpty(desiredPosition, boardState) &&
        this.tileIsEmpty(
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
      if (this.tileIsEmpty(desiredPosition, boardState)) {
        return true;
      }
    } else if (
      //Attacking in upper of bottom left corner
      desiredPosition.x - initialPosition.x === -1 &&
      desiredPosition.y - initialPosition.y === pawnMovement
    ) {
      if (this.opponentOnTile(desiredPosition, boardState, side)) {
        return true;
      }
    } //Attacking in the upper or bottom right corner
    else if (
      desiredPosition.x - initialPosition.x === 1 &&
      desiredPosition.y - initialPosition.y === pawnMovement
    ) {
      if (this.opponentOnTile(desiredPosition, boardState, side)) {
        return true;
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
        if (
          prevPosition.x === desiredPosition.x &&
          prevPosition.y === desiredPosition.y
        ) {
          //If tile has a opponent piece on it
          if (this.tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!this.tileIsEmpty(prevPosition, boardState)) {
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
        // Check if the tile is the where the piece is being moved to
        if (
          prevPosition.x === desiredPosition.x &&
          prevPosition.y === desiredPosition.y
        ) {
          //If tile has a opponent piece on it
          if (this.tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!this.tileIsEmpty(prevPosition, boardState)) {
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
        if (
          prevPosition.x === desiredPosition.x &&
          prevPosition.y === desiredPosition.y
        ) {
          //If tile has a opponent piece on it
          if (this.tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!this.tileIsEmpty(prevPosition, boardState)) {
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
        if (
          prevPosition.x === desiredPosition.x &&
          prevPosition.y === desiredPosition.y
        ) {
          //If tile has a opponent piece on it
          if (this.tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true; // Capture the piece
          }
        } else {
          // Must be a tile being passed
          // Check if piece on the tile
          if (!this.tileIsEmpty(prevPosition, boardState)) {
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
            if (this.tileEmptyOrOpponent(desiredPosition, boardState, side)) {
              return true; // Can move or attack the tile
            }
          }
        }
        // For 2 right or left and 1 up or down
        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            if (this.tileEmptyOrOpponent(desiredPosition, boardState, side)) {
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
      if (
        prevPosition.x === desiredPosition.x &&
        prevPosition.y === desiredPosition.y
      ) {
        if (this.tileEmptyOrOpponent(prevPosition, boardState, side)) {
          return true;
        }
      } else {
        if (!this.tileIsEmpty(prevPosition, boardState)) {
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
        if (
          prevPosition.x === desiredPosition.x &&
          prevPosition.y === desiredPosition.y
        ) {
          if (this.tileEmptyOrOpponent(prevPosition, boardState, side)) {
            return true;
          }
        } else {
          if (!this.tileIsEmpty(prevPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }

  queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
    // ON top
    if (
      desiredPosition.y > initialPosition.y &&
      desiredPosition.x === initialPosition.x
    ) {
      console.log("ON top");
    }
    // ON Bottom
    if (
      desiredPosition.y < initialPosition.y &&
      desiredPosition.x === initialPosition.x
    ) {
      console.log("ON Bottom");
    }
    // ON Right
    if (
      desiredPosition.y === initialPosition.y &&
      desiredPosition.x > initialPosition.x
    ) {
      console.log("ON Right");
    }
    // ON Left
    if (
      desiredPosition.y === initialPosition.y &&
      desiredPosition.x < initialPosition.x
    ) {
      console.log("ON Left");
    }
    // ON top Right
    if (
      desiredPosition.y > initialPosition.y &&
      desiredPosition.x > initialPosition.x
    ) {
      console.log("ON top Right");
    }
    // ON top Left
    if (
      desiredPosition.y > initialPosition.y &&
      desiredPosition.x < initialPosition.x
    ) {
      console.log("ON top Left");
    }
    // ON Bottom Right
    if (
      desiredPosition.y < initialPosition.y &&
      desiredPosition.x > initialPosition.x
    ) {
      console.log("ON Bottom Right");
    }
    // ON Bottom Left
    if (
      desiredPosition.y < initialPosition.y &&
      desiredPosition.x < initialPosition.x
    ) {
      console.log("ON Bottom Left");
    }

    return false;
  }

  kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    side: Side,
    boardState: Piece[]
  ): boolean {
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
        validMove = this.pawnMove(
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
        validMove = this.queenMove(
          initialPosition,
          desiredPosition,
          side,
          boardState
        );
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
