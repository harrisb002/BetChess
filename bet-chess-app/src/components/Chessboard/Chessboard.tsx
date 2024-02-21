import React, { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const Xaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const Yaxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

const GRID_SIZE = 100;

// Used to store the starting position for the pieces
interface Piece {
  image: string;
  XPosition: number;
  YPosition: number;
}

// Initialize the board
const initialBoardState: Piece[] = [];

export default function Chessboard() {
  // Set active piece to allow for smooth transition of grabbing functionality
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  // Used to set the x and y position of the peices when dropped to snap to grid
  const [Xgrid, setXgrid] = useState(0);
  const [Ygrid, setYgrid] = useState(0);

  // Pass initial board state to be called when component first rendered
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

  const chessboardRef = useRef<HTMLDivElement>(null);

  // Save the grabbed piece in this variable
  // let activePiece: HTMLElement | null = null;

  // Load the pieces when the component is loaded
  // Store the starting positions for all the pieces
  // Define the starting positions for all the White Pawns
  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "assets/images/pawn_b.png",
      XPosition: i,
      YPosition: 6,
    });
  }

  // Define the starting positions for all the Black Pawns
  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
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
  initialBoardState.push({
    image: "assets/images/king_w.png",
    XPosition: 4,
    YPosition: 0,
  });
  // Render the Queens
  initialBoardState.push({
    image: "assets/images/queen_w.png",
    XPosition: 3,
    YPosition: 0,
  });

  // Functionality to interact with the piece
  function grabPiece(event: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    // Cast the class name to an HTML element
    const element = event.target as HTMLElement;
    if (element.classList.contains("chess-piece") && chessboard) {
      // Set the states of both x and y cordinates of the peice to save location and use in dropPiece function
      setXgrid(Math.floor((event.clientX - chessboard.offsetLeft) / GRID_SIZE));
      setYgrid(
        Math.abs(Math.ceil((event.clientY - chessboard.offsetTop - 800) / GRID_SIZE))
      );

      // Get the mouse s and y positions
      const Xpos = event.clientX - GRID_SIZE / 2; // Calculate offset of where the piece is bieng grabbed from top left corner
      const Ypos = event.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${Xpos}px`;
      element.style.top = `${Ypos}px`;

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
      const Xcord = Math.floor((event.clientX - chessboard.offsetLeft) / GRID_SIZE);
      // Flip y-axis so the mouse lines up with page (board is 800px so can offset it)
      const Ycord = Math.abs(
        Math.abs(Math.ceil((event.clientY - chessboard.offsetTop - 800) / GRID_SIZE))
      );

      setPieces((value) => {
        // Map the pieces to get all the pieces and return them
        const pieces = value.map((piece) => {
          // Only grab the piece in which we have originally grabbed
          // This is done by setting the state in the grabPiece function and comparing it here
          if (piece.XPosition === Xgrid && piece.YPosition === Ygrid) {
            // Snapping to grid functionality
            piece.XPosition = Xcord;
            piece.YPosition = Ycord;
          }
          return piece;
        });
        return pieces;
      });
      setActivePiece(null);
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
