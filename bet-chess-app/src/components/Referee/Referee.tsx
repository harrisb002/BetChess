import { useEffect, useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import {
  PieceType,
  Position,
  Side,
  initialBoardState,
  samePosition,
} from "../../Constants";
import {
  bishopMove,
  getAllBishopMoves,
  getAllKingMoves,
  getAllKnightMoves,
  getAllPawnMoves,
  getAllRookMoves,
  kingMove,
  knightMove,
  pawnMove,
  rookMove,
} from "../../referee/rules";
import { Piece } from "../../models/Piece";

export default function Referee() {
  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  // Create state for when the promotion piece is updated
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  // Create referecne to the modal to open/hide it
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateAllMoves();
  }, []); // Execute when component loads for the first time

  function updateAllMoves() {
    //Find the possible moves for the piece grab to render them on the board
    setPieces((currPieces) => {
      return currPieces.map((piece) => {
        // Set all possible moves to the valid moves given the piece with the board state
        piece.possibleMoves = getValidMoves(piece, currPieces);
        return piece;
      });
    });
  }

  // Returns the styling needed after a move has been made
  function makeMove(pieceInPlay: Piece, destination: Position): boolean {
    // Check for valid move given if a piece is being attacked
    const validMove = isValidMove(
      pieceInPlay.position,
      destination,
      pieceInPlay.type,
      pieceInPlay.side
    );

    // Check for enPassant
    const isEnPassantMove = isEnPassant(
      pieceInPlay.position,
      destination,
      pieceInPlay.type,
      pieceInPlay.side
    );
    // Find the direction that the pawn is moving
    const pawnMovement = pieceInPlay.side === Side.WHITE ? 1 : -1;
    console.log(pieceInPlay)
    if (isEnPassantMove) {
      const updatedPieces = pieces.reduce((currPieces, piece) => {
        // Check if its the piece moved
        if (samePosition(piece.position, pieceInPlay.position)) {
          piece.enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          currPieces.push(piece); // Push the updated pieces position
        } else if (
          !samePosition(piece.position, {
            x: destination.x,
            y: destination.y - pawnMovement,
          })
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          currPieces.push(piece); // Push the updated pieces position
        }
        return currPieces;
      }, [] as Piece[]);

      // Update the possible moves inside Referee class
      updateAllMoves();
      // Update the state of the pieces if a EnPassant has occurredÏ
      setPieces(updatedPieces);
    } else if (validMove) {
      // Find if there's a piece at the destination (which would be captured if present).
      const destinationPieceIndex = pieces.findIndex(piece => samePosition(piece.position, destination));

      const updatedPieces = pieces.reduce((currPieces, piece, index) => {
        if (index === destinationPieceIndex) {
          // If the current piece is the one at the destination (to be captured), skip adding it to the updated array.
          // This effectively removes the captured piece from the game state.
          return currPieces;
        }

        if (samePosition(piece.position, pieceInPlay.position)) {
          // If the current piece is the one being moved, update its position and enPassant status if it's a pawn.
          piece.enPassant =
            Math.abs(pieceInPlay.position.y - destination.y) === 2 &&
            piece.type === PieceType.PAWN;
          piece.position = { ...destination }; // Update to the new destination.

          // Check for pawn promotion.
          let promotionRow = piece.side === Side.WHITE ? 7 : 0;
          if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
            // If the pawn reaches the opposite end, trigger the promotion modal.
            modalRef.current?.classList.remove("hidden");
            setPromotionPawn(piece);
          }
        } else if (piece.type === PieceType.PAWN) {
          // Reset enPassant status for all other pawns on the move.
          piece.enPassant = false;
        }

        // Add the current piece to the updated array, whether it was modified or not.
        currPieces.push(piece);
        return currPieces;
      }, [] as Piece[]);

      // Update the state with the new array of pieces, reflecting any captures and position changes.
      setPieces(updatedPieces);
      // After updating the pieces, recalculate all possible moves based on the new board state.
      updateAllMoves();
    } else {
      // If the move isn't valid, do not update the board state and indicate the move was not successful.
      return false;
    }
    // If the function reaches this point, the move was successful.
    return true;
  }
  function isEnPassant(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side
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
        const currPiece = pieces.find(
          (piece) =>
            // piece needs to be in the same collumn the pawn is moving to
            piece.position.x === desiredPosition.x &&
            // piece also needs to be one tile behind the piece that it is hitting
            piece.position.y === desiredPosition.y - pawnMovement &&
            piece.enPassant
        );
        if (currPiece) {
          // Return it if the piece meets the criteria
          return true;
        }
      }
    }
    return false;
  }

  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(initialPosition, desiredPosition, side, pieces);
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, side, pieces);
        break;

      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, side, pieces);
        break;

      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, side, pieces);
        break;

      case PieceType.QUEEN:
        validMove =
          rookMove(initialPosition, desiredPosition, side, pieces) ||
          bishopMove(initialPosition, desiredPosition, side, pieces);
        break;
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, side, pieces);
        break;
    }
    return validMove;
  }

  function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getAllPawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getAllKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getAllBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return getAllRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return [
          ...getAllBishopMoves(piece, boardState),
          ...getAllRookMoves(piece, boardState),
        ];
      case PieceType.KING:
        return getAllKingMoves(piece, boardState);
      default:
        return [];
    }
  }

  function promote(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    // Need to loop through pieces and update them
    const newPieces = pieces.reduce((currPieces, piece) => {
      //Check if the current piece being updated it the promotion piece
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        // Determine the color of the piece being updated to choose correct image
        const side = piece.side === Side.WHITE ? "w" : "b";
        // Determine the piece type
        let imageType = "";
        switch (pieceType) {
          case PieceType.KNIGHT: {
            imageType = "knight";
            break;
          }
          case PieceType.BISHOP: {
            imageType = "bishop";
            break;
          }
          case PieceType.ROOK: {
            imageType = "rook";
            break;
          }
          case PieceType.QUEEN: {
            imageType = "queen";
            break;
          }
        }
        piece.image = `assets/images/${imageType}_${side}.png`;
      }
      currPieces.push(piece);
      return currPieces;
    }, [] as Piece[]);

    updateAllMoves();
    setPieces(newPieces); //Set the new pieces

    modalRef.current?.classList.add("hidden"); //Hide the modal
  }

  function promotionSide() {
    return promotionPawn?.side === Side.WHITE ? "w" : "b";
  }

  return (
    <>
      <div id="promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promote(PieceType.QUEEN)}
            src={`/assets/images/queen_${promotionSide()}.png`}
          />
          <img
            onClick={() => promote(PieceType.ROOK)}
            src={`/assets/images/rook_${promotionSide()}.png`}
          />
          <img
            onClick={() => promote(PieceType.BISHOP)}
            src={`/assets/images/bishop_${promotionSide()}.png`}
          />
          <img
            onClick={() => promote(PieceType.KNIGHT)}
            src={`/assets/images/knight_${promotionSide()}.png`}
          />
        </div>
      </div>
      <Chessboard makeMove={makeMove} pieces={pieces} />
    </>
  );
}