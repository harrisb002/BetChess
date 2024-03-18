export class Position{
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Allows to clone to a new position for copying all valid moves for board state updates
    clone() : Position {
        return new Position(this.x, this.y)
    }

    // Can compare two pieces or button or anything as positions
    samePosition(otherPosition: Position) : boolean {
        return this.x === otherPosition.x && this.y === otherPosition.y;
    }

}