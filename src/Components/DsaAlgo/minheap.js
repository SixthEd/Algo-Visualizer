import Node from "./node";
import drawSquare from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";
import swap from "./swap";
import time from "./time";
import clearNode from "./clearNode";
import removeArrow from "./removeArrow";

class MinHeap {

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

        this.inputs.push(...data)

        if (this.run) {
            return;
        }
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

                if (this.arr[parent].data > this.arr[index].data) {

                    //for swap data
                    await swap(this.arr, parent, index, canvasRef)

                    index = parent;
                }
                else {
                    break;
                }
            }
        }

        this.run = false;

    }

    async delete(canvasRef) {

        if (!this.size) {
            return;
        }

        if (this.size === 1) {
            clearNode(this.arr, this.size - 1, canvasRef);
            this.arr.pop();
            this.size--;
            return;
        }

        //then swap root with last node
        await swap(this.arr, 0, this.size - 1, canvasRef);

        // then clear the last node
        clearNode(this.arr, this.size - 1, canvasRef)

        //add that node parent and add in level array
        let parent = Math.floor((this.size - 2) / 2);

        let left = 2 * parent + 1;
        let right = 2 * parent + 2;
        if (right === this.size - 1) {
            console.log("right")
            this.level.unshift(this.arr[parent]);

        }

        //remove it from the node 
        this.arr.pop();
        this.size--;

        let index = 0;

        while (index < this.size) {
            let smallest = index;

            let left = 2 * index + 1;
            let right = 2 * index + 2;

            if (left < this.size && this.arr[left].data < this.arr[smallest].data) {
                smallest = left;
            }

            if (right < this.size && this.arr[right].data < this.arr[smallest].data) {
                smallest = right;
            }

            if (smallest !== index) {
                console.log(smallest, index)
                await swap(this.arr, smallest, index, canvasRef);
                index = smallest;
            }
            else {
                break;
            }
        }

        //check which array has been removed the set its parent left or right node to null

         let removedChild = null;
        if (left === this.size) {
            this.arr[parent].leftNode = null;
            removedChild = "left";
        }
        else if (right === this.size) {
            this.arr[parent].rightNode = null;
            removedChild = "right";
        }
        removeArrow(this.arr, parent, removedChild, canvasRef)


    }
}

export default MinHeap;