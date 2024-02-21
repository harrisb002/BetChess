import React from "react";

import "./Chessboard.css";

const Xaxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const Yaxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Chessboard() {
  let board = [];
  
  //loop for c
  for (let j = Yaxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < Xaxis.length; i++) {
      board.push(
        <span>
          {Xaxis[i]}
          {Yaxis[j]}
        </span>
      );
    }
  }
  return <div id="chessboard">{board}</div>;
}
