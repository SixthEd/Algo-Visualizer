import drawArrow from "../Dsa/drawArrow";
import { SquareWidth } from "../Dsa/drawSquare";

class Node {
    constructor(data, x, y, gap) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.leftNode = null;
        this.rightNode = null;
        this.swap = false;
        this.compare = false;
        this.gap = gap;
        this.previous = null;
        this.oldX = null;
        this.oldY = null;
    }

    copy() {
        let n = new Node();

        n.data = this.data;
        n.x = this.x;
        n.y = this.y;
        n.leftNode = this.leftNode;
        n.rightNode = this.rightNode;
        n.swap = this.swap;
        n.compare = this.compare;
        n.gap = this.gap;
        n.previous = this.previous;
        n.oldX = this.oldX;
        n.oldY = this.oldY;

        return n;
    }

    // Draw arrow from parent to this node
    drawArrow(canvasRef, remove = false) {
        if (!this.previous) return;

        drawArrow(
            this.previous.x + SquareWidth / 2,
            this.previous.y + SquareWidth,
            this.x + SquareWidth / 2,
            this.y - 10,
            canvasRef,
            remove,
        );
    }
}

export default Node;
