import React from "react";
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

// Store the starting positions for all the pieces
const pieces: Piece[] = [];

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

  pieces.push({
    image: `assets/images/rook_${color}.png`,
    XPosition: 0,
    YPosition,
  });
  pieces.push({
    image: `assets/images/rook_${color}.png`,
    XPosition: 7,
    YPosition,
  });

  pieces.push({
    image: `assets/images/bishop_${color}.png`,
    XPosition: 2,
    YPosition,
  });
  pieces.push({
    image: `assets/images/bishop_${color}.png`,
    XPosition: 5,
    YPosition,
  });
  pieces.push({
    image: `assets/images/knight_${color}.png`,
    XPosition: 1,
    YPosition,
  });
  pieces.push({
    image: `assets/images/knight_${color}.png`,
    XPosition: 6,
    YPosition,
  });

  pieces.push({
    image: `assets/images/king_${color}.png`,
    XPosition: 4,
    YPosition,
  });
  pieces.push({
    image: `assets/images/queen_${color}.png`,
    XPosition: 3,
    YPosition,
  });
}
// Render the Kings
pieces.push({ image: "assets/images/king_w.png", XPosition: 4, YPosition: 0 });
// Render the Queens
pieces.push({ image: "assets/images/queen_w.png", XPosition: 3, YPosition: 0 });

// Save the grabbed piece in this variable
let activePiece: HTMLElement | null = null;

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
  // Only want to move the piece actually being grabbed, not just whats under the mouse

  // Check if a piece has been grabbed (Must not be null)
  if (activePiece) {
    // Get the mouse s and y positions
    const x = event.clientX - 50; // Calculate offset of where the piece is bieng grabbed from top left corner
    const y = event.clientY - 50;
    activePiece.style.position = "absolute";
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
  }
}

function dropPiece(event: React.MouseEvent) {
  if (activePiece) {
    activePiece = null; // Set it back to null
  }
}

export default function Chessboard() {
  let board = [];

  //loop for c
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

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseMove={(event) => movePiece(event)}
      onMouseDown={(event) => grabPiece(event)}
      onMouseUp={(event) => dropPiece(event)}
      id="chessboard"
    >
      {board}
    </div>
  );
}
