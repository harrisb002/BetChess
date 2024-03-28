import { useEffect, useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import { initialBoard } from "../../Constants";
import { Piece, Position } from "../../models";
import { PieceType, Side } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

export default function Referee() {
  // Pass initial board state to be called when component first rendered
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  // Create state for when the promotion piece is updated
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  // Create referecne to the modal to open/hide it
  const modalRef = useRef<HTMLDivElement>(null);
  const checkmateModalRef = useRef<HTMLDivElement>(null);

  function updateAllMoves() {
    board.getAllMoves();
  }

  // Returns the styling needed after a move has been made
  function makeMove(pieceInPlay: Piece, destination: Position): boolean {
    // Check if the player is the one that is currently to move
    if (
      (pieceInPlay.side === Side.ALLY && board.totalTurns % 2 !== 1) ||
      (pieceInPlay.side === Side.OPPONENT && board.totalTurns % 2 !== 0)
    ) {
      return false;
    }

    // If not possible moves then just return false
    if (pieceInPlay.possibleMoves === undefined) return false;

    // Force snap-back functionality on pieces using this bool
    let validMovePlayed = false;

    // Check for valid move given if a piece is being attacked
    // If you can see the "dots" being displayed then you can move there
    const validMove = pieceInPlay.possibleMoves?.some((move) =>
      move.samePosition(destination)
    );

    // Disallows somthing like dragging the pawn to the promotion sqaure immediately causing modal to open
    if (!validMove) return false;

    // Check for enPassant
    const isEnPassantMove = isEnPassant(
      pieceInPlay.position,
      destination,
      pieceInPlay.type,
      pieceInPlay.side
    );

    // update the UI when next move is made
    setBoard(() => {
      const cloneBoard = board.clone();
      cloneBoard.totalTurns += 1; // Increment whose turn it is, before calculating valid moves so it is updated accordingly
      // Making the next move
      validMovePlayed = cloneBoard.makeMove(
        isEnPassantMove,
        validMove,
        pieceInPlay,
        destination
      );
      console.log(cloneBoard.winningTeam);

      // If checkmate then remove hidden class from the checkmate modal
      if (cloneBoard.winningTeam !== undefined) {
        checkmateModalRef.current?.classList.remove("hidden");
      }

      return cloneBoard; // Retun new updatedboard
    });

    // Check for pawn promotion.
    let promotionRow = pieceInPlay.side === Side.ALLY ? 7 : 0;
    if (destination.y === promotionRow && pieceInPlay.isPawn) {
      // If the pawn reaches the opposite end, trigger the promotion modal.
      modalRef.current?.classList.remove("hidden");
      // Must update the position of the pawn being promoted
      setPromotionPawn((prevPromotionPawn) => {
        const clonePeiceInPlay = pieceInPlay.clone();
        clonePeiceInPlay.position = destination.clone();
        return clonePeiceInPlay;
      });
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
    const pawnMovement = side === Side.ALLY ? 1 : -1;

    //Check if attacking piece is pawn
    if (type === PieceType.PAWN) {
      // Upper or bottom left corner || Upper or bottom right corner
      if (
        (desiredPosition.x - initialPosition.x === -1 || //Blacks EnPassant
          desiredPosition.x - initialPosition.x === 1) && //ALLYs EnPassant
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

  function promote(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard(() => {
      // Must make a new board to let react know the object has changed
      const clonedBoard = board.clone();
      // Need to loop through pieces and update them
      clonedBoard.pieces = clonedBoard.pieces.reduce((currPieces, piece) => {
        //Check if the current piece being updated it the promotion piece
        if (piece.samePiecePosition(promotionPawn)) {
          // Must clone the piece into the type it is being converted into
          // Constructor is determining the image, type, and side
          currPieces.push(
            new Piece(piece.position.clone(), pieceType, true, piece.side)
          );
        } else {
          // If it is not a promotion pawn, then just push the existing piece
          currPieces.push(piece);
        }
        return currPieces;
      }, [] as Piece[]);

      // get all the moves for the new peices
      clonedBoard.getAllMoves();
      return clonedBoard;
    });
    modalRef.current?.classList.add("hidden"); //Hide the modal
  }

  function promotionSide() {
    return promotionPawn?.side === Side.ALLY ? "w" : "b";
  }

  function restartGame() {
    checkmateModalRef.current?.classList.add("hidden");
    setBoard(initialBoard.clone());
  }

  return (
    <>
      <p style={{ color: "white", fontSize: "32px" }}>
        {" "}
        {`${board.currentSide === "w" ? "White" : "Black"} to move`}
      </p>
      <div className="modal hidden" ref={modalRef}>
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
      <div className="modal hidden" ref={checkmateModalRef}>
        <div className="modal-body">
          <div className="checkmate-body">
            <span>
              Winning team is{" "}
              {board.winningTeam === Side.ALLY ? "White" : "Black"}
            </span>
            <button onClick={restartGame}>Play again</button>
          </div>
        </div>
      </div>

      <Chessboard makeMove={makeMove} pieces={board.pieces} />
    </>
  );
}
