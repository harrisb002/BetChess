import React, { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const Xaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const Yaxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

// Used to store the starting position for the pieces
interface Piece {
  image: string;
  XPosition: number;
  YPosition: number;
}

// Initialize the board
const initialBoardState: Piece[] = [];

export default function Chessboard() {
  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const chessboardRef = useRef<HTMLDivElement>(null);

  // Save the grabbed piece in this variable
  let activePiece: HTMLElement | null = null;

  // Load the pieces when the component is loaded
  // Store the starting positions for all the pieces
  // Define the starting positions for all the White Pawns
  for (let i = 0; i < 8; i++) {
    pieces.push({
      image: "assets/images/pawn_b.png",
      XPosition: i,
      YPosition: 6,
    });
  }

  // Define the starting positions for all the Black Pawns
  for (let i = 0; i < 8; i++) {
    pieces.push({
      image: "assets/images/pawn_w.png",
      XPosition: i,
      YPosition: 1,
    });
  }

  // Dynamically Render all pieces using string interpolation
  for (let piece = 0; piece < 2; piece++) {
    const color = piece === 0 ? "b" : "w";
    const YPosition = piece === 0 ? 7 : 0; // Make the variable name the same so it is implicit

    initialBoardState.push({
      image: `assets/images/rook_${color}.png`,
      XPosition: 0,
      YPosition,
    });
    initialBoardState.push({
      image: `assets/images/rook_${color}.png`,
      XPosition: 7,
      YPosition,
    });

    initialBoardState.push({
      image: `assets/images/bishop_${color}.png`,
      XPosition: 2,
      YPosition,
    });
    initialBoardState.push({
      image: `assets/images/bishop_${color}.png`,
      XPosition: 5,
      YPosition,
    });
    initialBoardState.push({
      image: `assets/images/knight_${color}.png`,
      XPosition: 1,
      YPosition,
    });
    initialBoardState.push({
      image: `assets/images/knight_${color}.png`,
      XPosition: 6,
      YPosition,
    });

    initialBoardState.push({
      image: `assets/images/king_${color}.png`,
      XPosition: 4,
      YPosition,
    });
    initialBoardState.push({
      image: `assets/images/queen_${color}.png`,
      XPosition: 3,
      YPosition,
    });
  }
  // Render the Kings
  pieces.push({
    image: "assets/images/king_w.png",
    XPosition: 4,
    YPosition: 0,
  });
  // Render the Queens
  pieces.push({
    image: "assets/images/queen_w.png",
    XPosition: 3,
    YPosition: 0,
  });

  // Functionality to interact with the piece
  function grabPiece(event: React.MouseEvent) {
    // Cast the class name to an HTML element
    const element = event.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      // Get the mouse s and y positions
      const x = event.clientX - 50; // Calculate offset of where the piece is bieng grabbed from top left corner
      const y = event.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      // If piece has been grabbed then set it to active
      activePiece = element;
    }
  }

  // Used to actuvely move a piece when grabbed and thus "active"
  function movePiece(event: React.MouseEvent) {
    const chessboard = chessboardRef.current; // To check if null before accessing

    // Only want to move the piece actually being grabbed, not just whats under the mouse
    // Check if a piece has been grabbed (Must not be null)
    if (activePiece && chessboard) {
      //Getting boundries on board so pieces cant move outside
      const minX = chessboard.offsetLeft - 10;
      const minY = chessboard.offsetTop - 10;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 90;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 90;

      // Get the mouse s and y positions
      const x = event.clientX - 60; // Calculate offset of where the piece is bieng grabbed from top left corner
      const y = event.clientY - 60;
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
    if (activePiece) {
      activePiece = null; // Set it back to null
    }
  }

  let board = [];

  for (let j = Yaxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < Xaxis.length; i++) {
      const number = j + i + 2;

      let image = undefined;

      // Loop through pieces array and place each piece in its position defined in array
      pieces.forEach((element) => {
        if (element.XPosition === i && element.YPosition === j) {
          image = element.image;
        }
      });

      // Push the pieces to the board
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseMove={(event) => movePiece(event)}
      onMouseDown={(event) => grabPiece(event)}
      onMouseUp={(event) => dropPiece(event)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
