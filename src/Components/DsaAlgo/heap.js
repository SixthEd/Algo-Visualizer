import Node from "./node";
import drawSquare from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";
import swap from "./swap";
import time from "./time";

class MaxHeap {

    constructor() {
        this.arr = [];
        this.level = [];
        this.size = 0;
    }

    async createUi(data, canvasRef) {
        let squareSize = 35;

        let currentLevelNode = this.level[0];

        if (!currentLevelNode.leftNode) {

            let node = new Node(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);

            drawArrow((currentLevelNode.x - squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x - currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, true,canvasRef);

            await time(25);

            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, false, canvasRef);

            currentLevelNode.leftNode = node;

            this.level.push(node);
            return node;
        }

        if (!currentLevelNode.rightNode) {

            let node = new Node(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);

            drawArrow((currentLevelNode.x + squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x + currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120,true, canvasRef);

            await time(25);

            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120,false, canvasRef);


            currentLevelNode.rightNode = node;

            this.level.push(node);

            this.level.shift();
            return node;
        }

    }

    async insert(data, canvasRef) {
        data = Number(data);
        if (this.size === 0) {
            let node = new Node(data, 1450, 0.5, 725);

            this.level.push(node);
            this.arr.push(node);

            drawSquare(data, 1450, 0.5, true,canvasRef);
            await time(25);
            drawSquare(data, 1450, 0.5, false,canvasRef);

            this.size++;
            return;
        }

        let node = await this.createUi(data, canvasRef);

        this.arr.push(node);
        this.size++;

        let index = this.size - 1;

        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);

            if (this.arr[parent].data < this.arr[index].data) {

                await swap(this.arr, parent, index, canvasRef)

                index = parent;
            }
            else {
                return;
            }
        }

    }
}

export default MaxHeap;