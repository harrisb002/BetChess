import React from "react";

import "./Chessboard.css";

const Xaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const Yaxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Chessboard() {
  let board = [];

  //loop for c
  for (let j = Yaxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < Xaxis.length; i++) {
      const number = j + i + 2;

      if (number % 2 === 0) {
        board.push(
          <div className="tile black-tile">
            [{Xaxis[i]}
            {Yaxis[j]}]
          </div>
        );
      } else {
        board.push(
          <div className="tile white-tile">
            [{Xaxis[i]}
            {Yaxis[j]}]
          </div>
        );
      }
    }
  }
  return <div id="chessboard">{board}</div>;
}
