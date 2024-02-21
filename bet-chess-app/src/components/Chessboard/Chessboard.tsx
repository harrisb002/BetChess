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

// Render the Rooks
pieces.push({ image: "assets/images/rook_w.png", XPosition: 0, YPosition: 0 });
pieces.push({ image: "assets/images/rook_w.png", XPosition: 7, YPosition: 0 });
pieces.push({ image: "assets/images/rook_b.png", XPosition: 0, YPosition: 7 });
pieces.push({ image: "assets/images/rook_b.png", XPosition: 7, YPosition: 7 });

// Render the Bishops
pieces.push({
  image: "assets/images/bishop_w.png",
  XPosition: 2,
  YPosition: 0,
});
pieces.push({
  image: "assets/images/bishop_w.png",
  XPosition: 5,
  YPosition: 0,
});
pieces.push({
  image: "assets/images/bishop_b.png",
  XPosition: 2,
  YPosition: 7,
});
pieces.push({
  image: "assets/images/bishop_b.png",
  XPosition: 5,
  YPosition: 7,
});

// Render the Knights
pieces.push({
  image: "assets/images/knight_w.png",
  XPosition: 1,
  YPosition: 0,
});
pieces.push({
  image: "assets/images/knight_w.png",
  XPosition: 6,
  YPosition: 0,
});
pieces.push({
  image: "assets/images/knight_b.png",
  XPosition: 1,
  YPosition: 7,
});
pieces.push({
  image: "assets/images/knight_b.png",
  XPosition: 6,
  YPosition: 7,
});

// Render the Kings
pieces.push({ image: "assets/images/king_w.png", XPosition: 4, YPosition: 0 });
pieces.push({ image: "assets/images/king_b.png", XPosition: 4, YPosition: 7 });

// Render the Queens
pieces.push({ image: "assets/images/queen_w.png", XPosition: 3, YPosition: 0 });
pieces.push({ image: "assets/images/queen_b.png", XPosition: 3, YPosition: 7 });

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

      board.push(<Tile image={image} number={number} />);
    }
  }
  return <div id="chessboard">{board}</div>;
}
