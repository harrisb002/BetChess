export class Position{
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Can compare two pieces or button or anything as positions
    samePosition(otherPosition: Position) : boolean {
        return this.x === otherPosition.x && this.y === otherPosition.y;
    }

}