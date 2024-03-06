import { useState } from "react";
import Chessboard from "../Chessboard/Chessboard";
import { Piece, PieceType, Position, initialBoardState } from "../../Constants";
import { getAllBishopMoves, getAllKingMoves, getAllKnightMoves, getAllPawnMoves, getAllRookMoves } from "../../referee/rules";

export default function Referee() {
  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  function updateAllMoves(): Position[] {
   //Find the possible moves for the piece grab to render them on the board
   setPieces((currPieces) => {
    return currPieces.map((piece) => {
      // Set all possible moves to the valid moves given the piece with the board state
      piece.possibleMoves = getValidMoves(piece, currPieces);
      return piece;
    });
  });

    return [];
  }

  function makeMove() {}

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

  return (
    <>
      <Chessboard updateAllMoves={updateAllMoves} makeMove={makeMove} pieces={pieces}/>
    </>
  );
}
