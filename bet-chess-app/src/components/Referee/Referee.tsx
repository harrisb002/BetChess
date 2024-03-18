import { useEffect, useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import {
  initialBoard,
} from "../../Constants";
import {
  bishopMove,
  kingMove,
  knightMove,
  pawnMove,
  rookMove,
} from "../../referee/rules";
import { Piece, Position } from "../../models";
import { PieceType, Side } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

export default function Referee() {
  // Pass initial board state to be called when component first rendered
  const [board, setBoard] = useState<Board>(initialBoard);
  // Create state for when the promotion piece is updated
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  // Create referecne to the modal to open/hide it
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateAllMoves();
  }, []); // Execute when component loads for the first time

  function updateAllMoves() {
    board.getAllMoves();
  }

  // Returns the styling needed after a move has been made
  function makeMove(pieceInPlay: Piece, destination: Position): boolean {

    // Force snap-back functionality on pieces using this bool
    let validMovePlayed = false;

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

    // update the UI when next move is made
    setBoard((prevBoard) => {
      // Making the next move
      validMovePlayed = board.makeMove(isEnPassantMove, validMove, pieceInPlay, destination)
      return board.clone(); // Clone the board and return it so React knows it has changed to update the board
    })

    // Check for pawn promotion.
    let promotionRow = pieceInPlay.side === Side.WHITE ? 7 : 0;
    if (destination.y === promotionRow && pieceInPlay.isPawn) {
      // If the pawn reaches the opposite end, trigger the promotion modal.
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn(pieceInPlay);
    }
    // If the function reaches this point, the move was successful.
    return validMovePlayed;
  }

  function isEnPassant(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    side: Side
  ) {

    // Find the direction that the pawn is moving
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
        const currPiece = board.pieces.find(
          (piece) =>
            // piece needs to be in the same collumn the pawn is moving to
            piece.position.x === desiredPosition.x &&
            // piece also needs to be one tile behind the piece that it is hitting
            piece.position.y === desiredPosition.y - pawnMovement &&
            piece.isPawn &&
            (piece as Pawn).enPassant
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
        validMove = pawnMove(initialPosition, desiredPosition, side, board.pieces);
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, side, board.pieces);
        break;

      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, side, board.pieces);
        break;

      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, side, board.pieces);
        break;

      case PieceType.QUEEN:
        validMove =
          rookMove(initialPosition, desiredPosition, side, board.pieces) ||
          bishopMove(initialPosition, desiredPosition, side, board.pieces);
        break;
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, side, board.pieces);
        break;
    }
    return validMove;
  }

  function promote(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard((prevBoard) => {
      // Must make a new board to let react know the object has changed
      const clonedBoard = board.clone();
      // Need to loop through pieces and update them
      clonedBoard.pieces = clonedBoard.pieces.reduce((currPieces, piece) => {
        //Check if the current piece being updated it the promotion piece
        if (piece.samePiecePosition(promotionPawn)) {
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

      return clonedBoard;
    })

    // Update the board with the new possible moves
    updateAllMoves();
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
      <Chessboard makeMove={makeMove} pieces={board.pieces} />
    </>
  );
}