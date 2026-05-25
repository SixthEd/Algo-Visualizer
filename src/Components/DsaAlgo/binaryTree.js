import Node from "./node";
import drawSquare, { drawSquareNew, SquareWidth } from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";
import swap from "./swap";
import time from "./time";
import clearNode from "./clearNode";
import removeArrow from "./removeArrow";

class BinaryTree {
    constructor() {
        this.arr = [];
        this.level = [];
        this.size = 0;
        this.run = false;
        this.inputs = [];
        this.root = null;
        this.inorderOutput = [];
    }

    //check left and right are present if not then add and draw arrow then draw square
    async createUi(data, canvasRef) {
        let squareSize = 35;

        //taking out first element from level then check the left and right node are present if not then add them
        let currentLevelNode = this.level[0];

        if (!currentLevelNode.leftNode) {
            let node = new Node(
                data,
                currentLevelNode.x - currentLevelNode.gap,
                currentLevelNode.y + 120,
                currentLevelNode.gap / 2,
            );
            node.previous = currentLevelNode;

            //create arrow and square with current node color
            drawArrow(
                (currentLevelNode.x - squareSize) / 2,
                currentLevelNode.y + squareSize,
                (currentLevelNode.x - currentLevelNode.gap) / 2,
                currentLevelNode.y + 120,
                canvasRef,
            );

            drawSquare(
                data,
                currentLevelNode.x - currentLevelNode.gap,
                currentLevelNode.y + 120,
                true,
                false,
                false,
                canvasRef,
            );

            await time(5);

            //create arrow and recreate the square without current node color
            drawSquare(
                data,
                currentLevelNode.x - currentLevelNode.gap,
                currentLevelNode.y + 120,
                false,
                false,
                false,
                canvasRef,
            );

            currentLevelNode.leftNode = node;

            this.level.push(node);
            return node;
        }

        if (!currentLevelNode.rightNode) {
            let node = new Node(
                data,
                currentLevelNode.x + currentLevelNode.gap,
                currentLevelNode.y + 120,
                currentLevelNode.gap / 2,
            );
            node.previous = currentLevelNode;

            //create arrow and square with current node color
            drawArrow(
                (currentLevelNode.x + squareSize) / 2,
                currentLevelNode.y + squareSize,
                (currentLevelNode.x + currentLevelNode.gap) / 2,
                currentLevelNode.y + 120,
                canvasRef,
            );

            drawSquare(
                data,
                currentLevelNode.x + currentLevelNode.gap,
                currentLevelNode.y + 120,
                true,
                false,
                false,
                canvasRef,
            );

            await time(25);

            //create arrow and recreate the square without current node color
            drawSquare(
                data,
                currentLevelNode.x + currentLevelNode.gap,
                currentLevelNode.y + 120,
                false,
                false,
                false,
                canvasRef,
            );

            currentLevelNode.rightNode = node;

            this.level.push(node);

            // if current Node has left and right node then remove from the level node
            this.level.shift();
            return node;
        }
    }

    // Plant the node in the middle
    async createNewUi(canvasRef, node, minX, maxX) {
        if (!node) {
            return;
        }

        const midX = (minX + maxX) / 2;

        // root node. Handled differently
        if (node.previous === null) {
            node.x = midX - SquareWidth / 2;
            node.y = 10;

            drawSquareNew(node, true, false, false, canvasRef);
            await time(5);
            drawSquareNew(node, false, false, false, canvasRef);

            await this.createNewUi(canvasRef, node.leftNode, minX, midX);
            await this.createNewUi(canvasRef, node.rightNode, midX, maxX);
            return;
        }

        /* 0           1450
         * |     r      |
         * |            |
         * |            |
         * |            |
         * |            |
        */

        // A child node
        // Draw the node, and the arrow from the parent

        let parent = node.previous;

        node.x = midX - SquareWidth / 2;
        node.y = parent.y + 120;

        drawSquareNew(node, true, false, false, canvasRef);
        node.drawArrow(canvasRef);
        await time(5);
        drawSquareNew(node, false, false, false, canvasRef);

        await this.createNewUi(canvasRef, node.leftNode, minX, midX);
        await this.createNewUi(canvasRef, node.rightNode, midX, maxX);
    }

    async insert(data, canvasRef) {
        //add new inputs

        this.inputs.push(...data);

        console.log(this.inputs);

        //check the previous insertion of inputs is still running then return
        if (this.run) {
            return;
        }
        //creating first node

        for (let i = 0; i < this.inputs.length; i++) {
            let node = new Node(this.inputs[i], 0, 0, 0);
            this.inputs[i] = node;

            if (i !== 0) {
                /// parent node
                node.previous = this.inputs[Math.floor((i - 1) / 2)];
            }
        }

        for (let i = 0; i < this.inputs.length; i++) {
            const node = this.inputs[i];

            const leftIndex = 2 * i + 1;
            const rightIndex = 2 * i + 2;

            node.leftNode = leftIndex < this.inputs.length ? this.inputs[leftIndex] : null;
            node.rightNode = rightIndex < this.inputs.length ? this.inputs[rightIndex] : null;
        }

        this.root = this.inputs[0];

        this.run = true;
        // while (this.inputs.length) {
        //     let data = this.inputs.shift();
        //     let node = new Node(data, 0, 0, 0);
        //     if (this.size === 0) {
        //         let node = new Node(data, 1450, 0.5, 725);
        //         this.root = node;
        //         //first node is added in level for ui
        //         this.level.push(node);
        //         this.arr.push(node);
        //
        //         //draw square with node push color
        //         drawSquare(data, 1450, 0.5, true, false, false, canvasRef);
        //         await time(5);
        //         //draw square with remove node push color
        //         drawSquare(data, 1450, 0.5, false, false, false, canvasRef);
        //
        //         this.size++;
        //         continue;
        //     }
        //     //create square with arrow
        //     let node = await this.createUi(data, canvasRef);
        //     this.arr.push(node);
        //     this.size++;
        //     let index = this.size - 1;
        // }

        this.createNewUi(canvasRef, this.inputs[0], 0, canvasRef.current.width);

        this.run = false;
    }

    async inOrder(root, send, canvasRef) {
        if (!root) {
            return;
        }

        await this.inOrder(root.leftNode, send, canvasRef);

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(5);
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);

        await this.inOrder(root.rightNode, send, canvasRef);
    }

    async preOrder(root, send, canvasRef) {
        if (!root) {
            return;
        }

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(5);
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);

        await this.preOrder(root.leftNode, send, canvasRef);

        await this.preOrder(root.rightNode, send, canvasRef);
    }

    async postOrder(root, send, canvasRef) {
        if (!root) {
            return;
        }

        await this.postOrder(root.leftNode, send, canvasRef);

        await this.postOrder(root.rightNode, send, canvasRef);

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(5);
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);
    }

    removeSquare(x, y, canvasRef) {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        //it could be possible canvas store previous rectangle values so we need to use it to  restart the ctx rectangle
        ctx.beginPath();

        // clear rectangle
        ctx.clearRect(x - 1, y - 1, x + SquareWidth + 1, y + SquareWidth + 1);

        ctx.fillStyle = "red";
        ctx.fill();
    }

    removeArrow(x, y, gap, removedChild, canvasRef) {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        const rectWidth = 35;
        const rectHeight = 35;

        let width = null;
        let height = y + rectHeight + 2;
        let x1 = null;
        let y1 = null;
        let x2 = null;
        let y2 = null;

        console.log(removedChild);
        switch (removedChild) {
            case "right":
                width = x + rectWidth;
                x1 = Math.floor((width - rectWidth) / 2) + 0.5;
                y1 = height;
                x2 = rectWidth + gap;
                y2 = rectHeight + 100;

                break;
            case "left":
                width = x;
                x1 = Math.floor((width - rectWidth) / 2) + 0.5;
                y1 = height;
                x2 = rectWidth - gap;
                y2 = rectHeight + 100;
                break;
            default:
        }

        // clear rectangle
        ctx.clearRect(x1 - 1, y1 - 1, x2, y2);
    }

    //inverted

    async inverted(root, canvasRef, minX, maxX) {
        if (!root) {
            return;
        }

        const midX = (minX + maxX) / 2;

        // Clear both squares
        if (root.leftNode) {
            let node = root.leftNode.copy();
            node.drawArrow(canvasRef, true);
            node.x = (minX + midX) / 2 - SquareWidth / 2;
            this.removeSquare(node.x, node.y, canvasRef);
        }

        if (root.rightNode) {
            let node = root.rightNode.copy();
            node.drawArrow(canvasRef, true);
            node.x = (minX + midX) / 2 - SquareWidth / 2;
            this.removeSquare(node.x, node.y, canvasRef);
        }

        // TODO: This will die if one doesn't exist
        [root.leftNode, root.rightNode] = [root.rightNode, root.leftNode];

        if (root.leftNode) {
            root.leftNode.x = (minX + midX) / 2 - SquareWidth / 2;
        }

        if (root.rightNode) {
            root.rightNode.x = (midX + maxX) / 2 - SquareWidth / 2;
        }

        // now redraw after switch
        if (root.leftNode) {
            root.leftNode.drawArrow(canvasRef);
            drawSquareNew(root.leftNode, false, true, false, canvasRef);
        }

        if (root.rightNode) {
            root.rightNode.drawArrow(canvasRef);
            drawSquareNew(root.rightNode, false, true, false, canvasRef);
        }

        this.inverted(root.leftNode, canvasRef, minX, midX);
        this.inverted(root.rightNode, canvasRef, midX, maxX);
    }
    //search

    async search(data, root, canvasRef) {
        if (!root) {
            return;
        }

        if (root.data === data) {
            drawSquare(root.data, root.x, root.y, false, false, true, canvasRef);

            setTimeout(() => {
                drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);
            }, 2000);

            return true;
        }

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(5);
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        if (await this.search(data, root.leftNode, canvasRef)) {
            return true;
        }

        if (await this.search(data, root.rightNode, canvasRef)) {
            return true;
        }
    }
}

export default BinaryTree;
