import { useState } from "react";
import { Piece, Position, initialBoardState } from "../../Constants";
import Chessboard from "../Chessboard/Chessboard";

export default function Referee() {
  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  function getAllMoves(): Position[] {
    return [];
  }

  function makeMove() {}

  return (
    <>
      <Chessboard getAllMoves={getAllMoves} makeMove={makeMove} />
    </>
  );
}
