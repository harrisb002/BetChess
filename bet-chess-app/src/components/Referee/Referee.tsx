import { useEffect, useRef, useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import {
  Piece,
  PieceType,
  Position,
  Side,
  initialBoardState,
  samePostion,
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
      return currPieces.map(piece => {
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

    if (isEnPassantMove) {
      const updatedPieces = pieces.reduce((currPieces, piece) => {
        // Check if its the piece moved
        if (samePostion(piece.position, pieceInPlay.position)) {
          piece.enPassant = true;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          currPieces.push(piece); // Push the updated pieces position
        } else if (
          !samePostion(piece.position, {
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
      const updatedPieces = pieces.reduce((currPieces, piece) => {
        // Check if the current piece is the one being moved
        if (samePostion(piece.position, pieceInPlay.position)) {
          // Check if is a pawn and double jump i.e. a special move
          piece.enPassant =
            Math.abs(pieceInPlay.position.y - destination.y) === 2 &&
            piece.type === PieceType.PAWN;
          piece.position.x = destination.x;
          piece.position.y = destination.y;

          // Determine if the piece should be promoted based on the row
          let promotionRow = piece.side === Side.WHITE ? 7 : 0;

          if (
            piece.position.y === promotionRow &&
            piece.type === PieceType.PAWN
          ) {
            // Remove hidden class for when promotion square is reached, thus showing modal
            modalRef.current?.classList.remove("hidden");
            setPromotionPawn(piece);
          }

          currPieces.push(piece);
        } // If the piece was not the piece grabbed
        else if (
          !samePostion(piece.position, { x: destination.x, y: destination.y })
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          currPieces.push(piece);
        }
        return currPieces; // return the array of pieces after each loop
      }, [] as Piece[]);

      // Update the possible moves inside Referee class
      updateAllMoves();
      // Update the state of the pieces after validating move ect...
      setPieces(updatedPieces); 
    } else {
      return false;
    }
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
    return true;
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
        break;
      case PieceType.KNIGHT:
        return getAllKnightMoves(piece, boardState);
        break;
      case PieceType.BISHOP:
        return getAllBishopMoves(piece, boardState);
        break;
      case PieceType.ROOK:
        return getAllRookMoves(piece, boardState);
        break;
      case PieceType.QUEEN:
        return [
          ...getAllBishopMoves(piece, boardState),
          ...getAllRookMoves(piece, boardState),
        ];
        break;

      case PieceType.KING:
        return getAllKingMoves(piece, boardState);
        break;
    }

    return [];
  }

  function promote(pieceType: PieceType) {
    if (promotionPawn == undefined) {
      return;
    }

    // Need to loop through pieces and update them
    const newPieces = pieces.reduce((currPieces, piece) => {
      //Check if the current piece being updated it the promotion piece
      if (samePostion(piece.position, promotionPawn.position)) {
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
