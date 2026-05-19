import Node from "./node";
import drawSquare from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";

class MaxHeap {

    constructor() {
        this.arr = [];
        this.level = [];
        this.size = 0;
    }

    insert(data, canvasRef) {

        if (this.size === 0) {
            let node = new Node(data, 1450, 0.5, 0, 725);

            this.level.push(node);
            this.arr.push(node);

            drawSquare(data, 1450, 0.5, canvasRef);

            this.size++;
            return;
        }


        let currentLevelNode = this.level[0];
        this.size++;

        let squareSize=35;

        if (!currentLevelNode.leftNode) {

            let node = new Node(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120 , 0, currentLevelNode.gap / 2);

            drawArrow((currentLevelNode.x -squareSize)/ 2, currentLevelNode.y+squareSize, (currentLevelNode.x - currentLevelNode.gap) / 2, currentLevelNode.y + 120 , canvasRef)

            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, canvasRef);

            currentLevelNode.leftNode = node;

            this.level.push(node);
            return;
        }

        if (!currentLevelNode.rightNode) {

            let node = new Node(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, 0, currentLevelNode.gap / 2);

            drawArrow((currentLevelNode.x + squareSize)/ 2, currentLevelNode.y+squareSize, (currentLevelNode.x + currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, canvasRef);

            currentLevelNode.rightNode = node;

            this.level.push(node);

            this.level.shift();
            return;
        }

    }
}

export default MaxHeap;