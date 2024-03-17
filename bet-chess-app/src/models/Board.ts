import { Piece } from "./Piece";

export class Board{
    pieces: Piece[]; 

    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }
}