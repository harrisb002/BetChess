import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";

import {
  X_AXIS,
  Y_AXIS,
  GRID_SIZE,
  Piece,
  Side,
  PieceType,
  initialBoardState,
  Position,
  samePostion,
} from "../../Constants";


interface Props {
  updateAllMoves: () => void; // Update the pieces in referee and pass into the chessboard
  makeMove: (piece: Piece, position: Position) => void;
  pieces: Piece[];
}

export default function Chessboard({updateAllMoves, makeMove, pieces} : Props) {
  // Set active piece to allow for smooth transition of grabbing functionality
  // Save the grabbed piece in this variable
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  // Used to set the x and y position of the peices when dropped to snap to grid
  const [piecePosition, setPiecePosition] = useState<Position>({
    x: -1,
    y: -1,
  });

  // Create referecne to the modal to open/hide it
  const modalRef = useRef<HTMLDivElement>(null);
  // Create state for when the promotion piece is updated
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const chessboardRef = useRef<HTMLDivElement>(null);

  // Functionality to interact with the piece
  function grabPiece(event: React.MouseEvent) {

    // Update the possible moves inside Referee class
    updateAllMoves();

    const chessboard = chessboardRef.current;
    // Cast the class name to an HTML element
    const element = event.target as HTMLElement;
    if (element.classList.contains("chess-piece") && chessboard) {
      const newX = Math.floor(
        (event.clientX - chessboard.offsetLeft) / GRID_SIZE
      );
      // Flip y-axis so the mouse lines up with page (board is 800px so can offset it)
      const newY = Math.abs(
        Math.ceil((event.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );
      // Set the states of both x and y cordinates of the peice to save location and use in dropPiece function
      setPiecePosition({
        x: newX,
        y: newY,
      });

      // Get the mouse x and y positions
      const x = event.clientX - GRID_SIZE / 2; // Calculate offset of where the piece is bieng grabbed from top left corner
      const y = event.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      // If piece has been grabbed then set it to active
      setActivePiece(element);
    }
  }

  // Used to actuvely move a piece when grabbed and thus "active"
  function movePiece(event: React.MouseEvent) {
    const chessboard = chessboardRef.current; // To check if null before accessing

    // Only want to move the piece actually being grabbed, not just whats under the mouse
    // Check if a piece has been grabbed (Must not be null)
    if (activePiece && chessboard) {
      // console.log("The active piece is: ", activePiece);

      //Getting boundries on board so pieces cant move outside
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;

      // Get the mouse s and y positions
      const x = event.clientX - 50; // Calculate offset of where the piece is bieng grabbed from top left corner
      const y = event.clientY - 50;
      activePiece.style.position = "absolute";

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }
      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }
  function dropPiece(event: React.MouseEvent) {
    // Used to find the pieces position relative to the board
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      // 0,0 is top left of board when offset with the difference of each tile being 100
      // Finds relative position of pieces to grid
      const x = Math.floor((event.clientX - chessboard.offsetLeft) / GRID_SIZE);
      // Flip y-axis so the mouse lines up with page (board is 800px so can offset it)
      const y = Math.abs(
        Math.ceil((event.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      // If the move is valid and a piece is in the location then update the board to remove this piece being captured
      const currPiece = pieces.find((piece) =>
        samePostion(piece.position, piecePosition)
      );

      // Find the piece being attacked to remove
      // const pieceAttacked = pieces.find((piece) => piece.XPosition === Xcord && piece.YPosition === Ycord);

      //Only check to set pices for a valid move when there is a current piece being moved
      if (currPiece) {

        makeMove(currPiece, {x, y})
       
      setActivePiece(null);
    }
  }

  function promote(pieceType: PieceType) {
    if (promotionPawn == undefined) {
      return;
    }

    // Need to loop through pieces and update them
    const newPieces = pieces.reduce((pieces, piece) => {
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
      pieces.push(piece);
      return pieces;
    }, [] as Piece[]);

    setPieces(newPieces); //Set the new pieces

    modalRef.current?.classList.add("hidden"); //Hide the modal
  }

  function promotionSide() {
    return promotionPawn?.side === Side.WHITE ? "w" : "b";
  }

  let board = [];

  for (let j = Y_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < X_AXIS.length; i++) {
      const number = j + i + 2;
      // Find in the pieces array each piece in its position defined and to use to place it on the Tile
      const piece = pieces.find((piece) =>
        samePostion(piece.position, { x: i, y: j })
      );

      // Set image if defined
      let image = piece ? piece.image : undefined;

      // Find the current piece to determine its possible moves
      // set active piece if not null and if it is then to undefined so that the highlights are removed when piece is inactive (dropped)
      let currPiece =
        activePiece != null
          ? pieces.find((piece) => samePostion(piece.position, piecePosition))
          : undefined;

      // If the current piece is not null then check if the tile is in the possible moves for the piece
      let highlights = currPiece?.possibleMoves
        ? currPiece.possibleMoves.some((piece) =>
            samePostion(piece, { x: i, y: j })
          )
        : false;

      // Push the pieces to the board
      board.push(
        <Tile
          key={`${j},${i}`}
          image={image}
          number={number}
          highlights={highlights}
        />
      );
    }
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
      <div
        onMouseMove={(event) => movePiece(event)}
        onMouseDown={(event) => grabPiece(event)}
        onMouseUp={(event) => dropPiece(event)}
        id="chessboard"
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  );
}
