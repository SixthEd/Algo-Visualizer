import Node from "./node";
import drawSquare from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";
import swap from "./swap";

class MaxHeap {

    constructor() {
        this.arr = [];
        this.level = [];
        this.size = 0;
    }

    createUi(data, canvasRef) {
        let squareSize = 35;

        let currentLevelNode = this.level[0];

        if (!currentLevelNode.leftNode) {

            let node = new Node(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, 0, currentLevelNode.gap / 2);

            drawArrow((currentLevelNode.x - squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x - currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, canvasRef);


            currentLevelNode.leftNode = node;

            this.level.push(node);
            return node;
        }

        if (!currentLevelNode.rightNode) {

            let node = new Node(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, 0, currentLevelNode.gap / 2);

            drawArrow((currentLevelNode.x + squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x + currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, canvasRef);

            currentLevelNode.rightNode = node;

            this.level.push(node);

            this.level.shift();
            return node;
        }

    }

    insert(data, canvasRef) {
        data = Number(data);
        if (this.size === 0) {
            let node = new Node(data, 1450, 0.5, 0, 725);

            this.level.push(node);
            this.arr.push(node);

            drawSquare(data, 1450, 0.5, canvasRef);


            this.size++;
            return;
        }

        let node = this.createUi(data, canvasRef);

        this.arr.push(node);
        this.size++;

        let index = this.size - 1;

        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);

            if (this.arr[parent].data < this.arr[index].data) {

                swap(this.arr, parent, index, canvasRef)

                index = parent;
            }
            else {
                return;
            }
        }

    }
}

export default MaxHeap;