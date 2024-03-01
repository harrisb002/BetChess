import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../Tile/Tile";
import Rules from "../../referee/Referee";
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

export default function Chessboard() {
  // Set active piece to allow for smooth transition of grabbing functionality
  // Save the grabbed piece in this variable
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  // Used to set the x and y position of the peices when dropped to snap to grid
  const [piecePosition, setPiecePosition] = useState<Position>({
    x: -1,
    y: -1,
  });
  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  // Create  referecne to the modal
  const modalRef = useRef<HTMLDivElement>(null);
  // Create state for when the promotion piece is updated
  const [promotionPawn, setPromotionPawn] = useState<Piece>();

  const chessboardRef = useRef<HTMLDivElement>(null);

  // Create an Instance of the Rules class
  const rules = new Rules();

  // Functionality to interact with the piece
  function grabPiece(event: React.MouseEvent) {
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
        // Check for valid move given if a piece is being attacked
        const validMove = rules.isValidMove(
          piecePosition,
          { x, y },
          currPiece.type,
          currPiece.side,
          pieces
        );

        // Check for enPassant
        const isEnPassantMove = rules.isEnPassant(
          piecePosition,
          { x, y },
          currPiece.type,
          currPiece.side,
          pieces
        );
        // Find the direction that the pawn is moving
        const pawnMovement = currPiece.side === Side.WHITE ? 1 : -1;

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            // Check if its the piece moved
            if (samePostion(piece.position, piecePosition)) {
              piece.enPassant = true;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece); // Push the updated pieces position
            } else if (
              !samePostion(piece.position, {
                x: x,
                y: y - pawnMovement,
              })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece); // Push the updated pieces position
            }
            return results;
          }, [] as Piece[]);

          // Update the state of the pieces if a EnPassant has occurredÏ
          setPieces(updatedPieces);
        } else if (validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            // Check if the current piece is the one being moved
            if (samePostion(piece.position, piecePosition)) {
              // Check if is a pawn and double jump i.e. a special move
              piece.enPassant =
                Math.abs(piecePosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;
              piece.position.x = x;
              piece.position.y = y;

              // Determine if the piece should be promoted based on the row
              let promotionRow = piece.side === Side.WHITE ? 7 : 1;

              if (piece.position.y === promotionRow) {
                modalRef.current?.classList.remove()
                setPromotionPawn(piece);
              }

              results.push(piece);
            } // If the piece was not the piece grabbed
            else if (!samePostion(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results; // return the array of pieces after each loop
          }, [] as Piece[]);

          // Update the state of the pieces after validating move ect...
          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          // Strip the attributes of the piece back to 0 so it moves back to its position
          activePiece.style.removeProperty("left");
          activePiece.style.removeProperty("top");
        }
      }
      setActivePiece(null);
    }
  }

  function promotePawn(pieceType: PieceType) {
    console.log(`Promoting into ${pieceType}`);
    console.log(promotePawn)
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

      // Push the pieces to the board
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }

  return (
    <>
      <div id="promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/rook_b.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/bishop_b.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/knight_b.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/queen_b.png`}
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
