import Node from "./node";
import drawSquare from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";
import swap from "./swap";
import time from "./time";
import clearNode from "./clearNode";
import removeArrow from "./removeArrow"

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

            let node = new Node(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);
            node.previous = currentLevelNode;

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
            node.previous = currentLevelNode;

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

        //add new inputs
        this.inputs.push(...data)

        //check the previous insertion of inputs is still running then return
        if (this.run) {
            return;
        }
        //creating first node   


        this.run = true;
        while (this.inputs.length) {
            let data = this.inputs.shift();
            if (this.size === 0) {
                let node = new Node(data, 1450, 0.5, 725);
                this.root = node;
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

        }

        this.run = false;

    }

    async inOrder(root, send, canvasRef) {

        if (!root) {
            return;
        }

        await this.inOrder(root.leftNode, send, canvasRef);

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(5)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);

        await this.inOrder(root.rightNode, send, canvasRef);
    }



    async preOrder(root, send, canvasRef) {

        if (!root) {
            return;
        }

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(5)
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
        await time(5)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);
    }

    // inverted(root, canvasRef) {
    //     if (!root) {
    //         return;
    //     }

    //     drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

    //     if (root.leftNode && root.rightNode) {
    //         root.leftNode.x=1450-root.leftNode.x;
    //     }
    //     else if(root.leftNode)
    //     {
    //         root.leftNode.x=root.x+ 2*root.gap;
    //     }
    //     else if(root.rightNode)
    //     {
    //         root.rightNode.x=root.x-2*root.gap;
    //     }

    //     [root.leftNode,root.rightNode] =[root.rightNode, root.leftNode];

    //     this.inverted(root.leftNode,canvasRef);
    //     this.inverted(root.rightNode,canvasRef);

    // }


    removesquare(width, height, canvasRef) {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");


        // Scale back to logical coordinates
        const rectWidth = 35;
        const rectHeight = 35;
        const x = Math.floor((width - rectWidth) / 2) + 0.5;
        const y = height;

        // clear rectangle
        ctx.fillStyle = "black"

        ctx.clearRect(x - 1, y - 1, rectWidth + 1, rectHeight + 1, 5)

        ctx.fill()
    }


    inverted(root, canvasRef) {
        if (!root) {
            return;
        }

        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        if (root.leftNode && !root.rightNode) {
            this.removesquare(root.leftNode.x, root.leftNode.y, canvasRef);
        }
        if (root.rightNode && !root.leftNode) {
            this.removesquare(root.rightNode.x, root.rightNode.y, canvasRef);
        }

        if (root.leftNode) {
            // now root.leftNode will be right of root
            root.leftNode.x = (root.x + 2 * root.leftNode.gap);
        }

        if (root.rightNode) {
            // now root.rightNode will be left of root
            root.rightNode.x = (root.x - 2 * root.rightNode.gap);
        }


        

        [root.leftNode, root.rightNode] = [root.rightNode, root.leftNode];


        this.inverted(root.leftNode, canvasRef);
        this.inverted(root.rightNode, canvasRef);
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
        await time(5)
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