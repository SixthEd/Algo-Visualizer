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
        this.run = false;
        this.inputs = [];
    }

    //check left and right are present if not then add and draw arrow then draw square
    async createUi(data, canvasRef) {
        let squareSize = 35;

        //taking out first element from level then check the left and right node are present if not then add them
        let currentLevelNode = this.level[0];

        if (!currentLevelNode.leftNode) {

            let node = new Node(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);

            //create arrow and square with current node color
            drawArrow((currentLevelNode.x - squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x - currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, true, false, false, canvasRef);

            await time(5);

            //create arrow and recreate the square without current node color
            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, false, false, false, canvasRef);

            currentLevelNode.leftNode = node;

            this.level.push(node);
            return node;
        }

        if (!currentLevelNode.rightNode) {

            let node = new Node(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);

            //create arrow and square with current node color
            drawArrow((currentLevelNode.x + squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x + currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, true, false, false, canvasRef);

            await time(25);

            //create arrow and recreate the square without current node color
            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, false, false, false, canvasRef);


            currentLevelNode.rightNode = node;

            this.level.push(node);

            // if current Node has left and right node then remove from the level node
            this.level.shift();
            return node;
        }

    }

    async insert(data, canvasRef) {

        console.log(data,this)
        if (this.run) {
            return;
        }
        this.inputs.push(...data)
        //creating first node   


        this.run = true;
        while (this.inputs.length) {
            let data = this.inputs.shift();
            if (this.size === 0) {
                let node = new Node(data, 1450, 0.5, 725);

                //first node is added in level for ui
                this.level.push(node);
                this.arr.push(node);

                //draw square with node push color
                drawSquare(data, 1450, 0.5, true, false, false, canvasRef);
                await time(5);
                //draw square with remove node push color
                drawSquare(data, 1450, 0.5, false, false, false, canvasRef);

                this.size++;
                continue;
            }
            //create square with arrow 
            let node = await this.createUi(data, canvasRef);

            this.arr.push(node);
            this.size++;

            let index = this.size - 1;

            while (index > 0) {
                let parent = Math.floor((index - 1) / 2);

                if (this.arr[parent].data < this.arr[index].data) {

                    //for swap data
                    await swap(this.arr, parent, index, canvasRef)

                    index = parent;
                }
                else {
                    continue;
                }
            }
        }

        this.run = false;

    }
}

export default MaxHeap;