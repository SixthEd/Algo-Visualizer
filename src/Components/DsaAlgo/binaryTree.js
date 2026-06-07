import Node from "./node";
import drawSquare from "../Dsa/drawSquare";
import drawArrow from "../Dsa/drawArrow";
import time from "./time";


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
    async createUi(data, canvasRef, speedRef) {
        let squareSize = 35;

        //taking out first element from level then check the left and right node are present if not then add them
        let currentLevelNode = this.level[0];
        let node;
        let filled = false;
        if (!currentLevelNode.leftNode && !filled) {

            filled = true;
            node = new Node(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);
            node.previous = currentLevelNode;
            //create arrow and square with current node color
            drawArrow((currentLevelNode.x - squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x - currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, true, false, false, canvasRef);

            await time(speedRef.current);

            //create arrow and recreate the square without current node color
            drawSquare(data, currentLevelNode.x - currentLevelNode.gap, currentLevelNode.y + 120, false, false, false, canvasRef);

            currentLevelNode.leftNode = node;

            this.level.push(node);
        }

        if (!currentLevelNode.rightNode && !filled) {
            filled = true;
            node = new Node(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, currentLevelNode.gap / 2);
            node.previous = currentLevelNode;
            //create arrow and square with current node color
            drawArrow((currentLevelNode.x + squareSize) / 2, currentLevelNode.y + squareSize, (currentLevelNode.x + currentLevelNode.gap) / 2, currentLevelNode.y + 120, canvasRef)

            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, true, false, false, canvasRef);

            await time(speedRef.current);

            //create arrow and recreate the square without current node color
            drawSquare(data, currentLevelNode.x + currentLevelNode.gap, currentLevelNode.y + 120, false, false, false, canvasRef);


            currentLevelNode.rightNode = node;

            this.level.push(node);

        }

        //check if leftNode and rightNode both are filled then remove the currentNode from the level array
        if (currentLevelNode.leftNode && currentLevelNode.rightNode) {
            //removing the first element from the level array
            this.level.shift();
        }

        //return new created node
        return node;

    }

    //insert the data then create tree
    async insert(data, canvasRef, speedRef) {

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
                await time(speedRef.current);
                //draw square with remove node push color
                drawSquare(data, 1450, 0.5, false, false, false, canvasRef);

                this.size++;
                continue;
            }
            //create square with arrow 
            let node = await this.createUi(data, canvasRef, speedRef);

            this.arr.push(node);
            this.size++;

            // let index = this.size - 1;

        }

        this.run = false;

    }

    //inOrder first go to the left down then print root then go to the right down 
    async inOrder(root, send, canvasRef, speedRef) {

        if (!root) {
            return;
        }

        await this.inOrder(root.leftNode, send, canvasRef, speedRef);

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(speedRef.current)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);

        await this.inOrder(root.rightNode, send, canvasRef, speedRef);
    }


    //preOrder first print root then go to the left down then go to the right down
    async preOrder(root, send, canvasRef,speedRef) {

        if (!root) {
            return;
        }

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(speedRef.current)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);

        await this.preOrder(root.leftNode, send, canvasRef, speedRef);

        await this.preOrder(root.rightNode, send, canvasRef, speedRef);
    }


    //postOrder first go to the left down then right then print root
    async postOrder(root, send, canvasRef, speedRef) {

        if (!root) {
            return;
        }

        await this.postOrder(root.leftNode, send, canvasRef,speedRef);

        await this.postOrder(root.rightNode, send, canvasRef, speedRef);

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(speedRef.current)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        send(root.data);
    }

    // remove square 
    removeSquare(width, height, rectWidth, rectHeight, canvasRef, tree = false) {

        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");


        const x = Math.floor((width - rectWidth) / 2) + 0.5;
        const y = height;

        // clear rectangle

        ctx.clearRect(x, y, rectWidth, rectHeight, 5)


        ctx.fillStyle = "black";


        //draw rectangle

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(x, y, tree ? rectWidth : 35, tree ? rectHeight : 35, 5);
        ctx.fill();

        ctx.stroke();


    }

    //create tree after inverse the binary Tree
    async createTree(root, canvasRef, speedRef) {
        if (!root) {
            return;
        }

        //check rightNode exist if it is then create
        if (root.rightNode) {

            root.rightNode.x = root.x + root.gap;
            root.rightNode.gap = root.gap / 2;

            //first create arrow then draw square
            await time(speedRef.current)
            drawArrow((root.x + 35) / 2, root.y + 35, (root.x + root.gap) / 2, root.y + 120, canvasRef);


            await time(speedRef.current);
            drawSquare(root.rightNode.data, root.x + root.gap, root.y + 120, true, false, false, canvasRef);
            await time(speedRef.current);
            drawSquare(root.rightNode.data, root.x + root.gap, root.y + 120, false, false, false, canvasRef);
        }

        //check leftNode exist if it is then create
        if (root.leftNode) {
            root.leftNode.x = root.x - root.gap;
            root.leftNode.gap = root.gap / 2;

            //first create arrow then square
            await time(speedRef.current)
            drawArrow((root.x - 35) / 2, root.y + 35, (root.x - root.gap) / 2, root.y + 120, canvasRef);

            await time(speedRef.current);
            drawSquare(root.leftNode.data, root.x - root.gap, root.y + 120, true, false, false, canvasRef);
            await time(speedRef.current);
            drawSquare(root.leftNode.data, root.x - root.gap, root.y + 120, false, false, false, canvasRef);
        }

        await this.createTree(root.leftNode, canvasRef, speedRef);
        await this.createTree(root.rightNode, canvasRef, speedRef);
    }


    //inverted

    async inverted(root, canvasRef, speedRef) {
        if (!root) {
            return;
        }

        //check left node is exist if it is then remve left part of the root node and arrow
        if (root.leftNode) {
            await time(speedRef.current)
            this.removeSquare(root.leftNode.x, root.leftNode.y, 2 * root.leftNode.gap, 120 * Math.floor(Math.log2(this.arr.length + 1)) + 1, canvasRef, true);
            await time(speedRef.current)
            drawArrow((root.leftNode.x + root.gap - 35) / 2, root.y + 35, (root.leftNode.x) / 2, root.y + 120, canvasRef, true)


        }

        //check right node is exist if it is then remve right part of the root node and arrow
        if (root.rightNode) {
            await time(speedRef.current)
            this.removeSquare(root.rightNode.x, root.rightNode.y, 2 * root.rightNode.gap, 120 * Math.floor(Math.log2(this.arr.length + 1)) + 1, canvasRef, true);
            await time(speedRef.current)
            drawArrow((root.rightNode.x - root.gap + 35) / 2, root.y + 35, (root.rightNode.x) / 2, root.y + 120, canvasRef, true)

        }

        //swap both the root left and right nodes
        [root.leftNode, root.rightNode] = [root.rightNode, root.leftNode];

        //now create root right node if it is exit and it is sub-tree
        if (root.rightNode) {

            root.rightNode.x = root.x + root.gap;
            root.rightNode.gap = root.gap / 2;
            await time(speedRef.current)
            drawArrow((root.x + 35) / 2, root.y + 35, (root.x + root.gap) / 2, root.y + 120, canvasRef)
            await time(speedRef.current)
            drawSquare(root.rightNode.data, root.x + root.gap, root.y + 120, false, false, true, canvasRef);


            await this.createTree(root.rightNode, canvasRef,speedRef);

        }

        //now create root left node if it is exit and it is sub-tree
        if (root.leftNode) {
            root.leftNode.x = root.x - root.gap;
            root.leftNode.gap = root.gap / 2;

            await time(speedRef.current)

            drawArrow((root.x - 35) / 2, root.y + 35, (root.x - root.gap) / 2, root.y + 120, canvasRef)
            await time(speedRef.current)
            drawSquare(root.leftNode.data, root.x - root.gap, root.y + 120, false, false, true, canvasRef);


            await this.createTree(root.leftNode, canvasRef, speedRef);

        }

        //after create right sub-tree changing the color of swap nodes
        if (root.rightNode) {
            await time(speedRef.current)
            drawSquare(root.rightNode.data, root.x + root.gap, root.y + 120, false, false, false, canvasRef);

        }

        //after create right sub-tree changing the color of swap nodes
        if (root.leftNode) {
            await time(speedRef.current)
            drawSquare(root.leftNode.data, root.x - root.gap, root.y + 120, false, false, false, canvasRef);

        }


        await this.inverted(root.leftNode, canvasRef, speedRef);
        await this.inverted(root.rightNode, canvasRef, speedRef);
    }

    //search
    //go left then right for the search of the node if it is found then return true a
    async search(data, root, canvasRef, speedRef) {
        if (!root) {
            return;
        }

        //check if data is found  then return true
        if (root.data === data) {
            drawSquare(root.data, root.x, root.y, false, false, true, canvasRef);

            setTimeout(() => {
                drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);
            }, 2000);

            return true;
        }

        //check on which node we are for the searching
        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(speedRef.current)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        //go left for the searching if it is found then return true
        if (await this.search(data, root.leftNode, canvasRef, speedRef)) {
            return true;
        }

        //go right for the searching if it is found then return true
        if (await this.search(data, root.rightNode, canvasRef, speedRef)) {
            return true;
        }
    }

    //swapping the data to the depth node and then remove it
    async swapping(data, root, canvasRef, speedRef) {

        //check if root has left and right node if both are not exist then remove the root node and return true
        if (!root.leftNode && !root.rightNode) {
            
            //remove the root square
            drawSquare(root.data, root.x, root.y, false, false, false, canvasRef, true);

            //check if it left node remove if it is the remove the left arrow otherwise remove right arrow
            if (root.previous.leftNode?.data === data) {
                drawArrow((root.previous.leftNode.x + root.previous.gap - 35) / 2, root.previous.y + 35, (root.previous.leftNode.x) / 2, root.previous.y + 120, canvasRef, true)
                root.previous.leftNode=null;
                
                //when root left node remove we need to add it to level
                this.level.unshift(root.previous)

                //need to remove last node which is removed in the tree from level arr
                this.level =[...this.level.filter((node)=>node.data!==data)]

            }
            else {
                drawArrow((root.previous.rightNode.x - root.previous.gap + 35) / 2, root.previous.y + 35, (root.previous.rightNode.x) / 2, root.previous.y + 120, canvasRef, true)
                root.previous.rightNode=null;


                //when root left node remove we need to add it to level
                this.level.shift(root.previous)

                //need to remove last node which is removed in the tree from level arr
                this.level =[...this.level.filter((node)=>node.data!==data)]

            }
            return true;
        }

        //check leftNode exist if it is then swap data with leftNode data
        if (root.leftNode) {

            [root.data, root.leftNode.data] = [root.leftNode.data, root.data];
            drawSquare(root.data, root.x, root.y, false, false, true, canvasRef);
            drawSquare(root.leftNode.data, root.leftNode.x, root.leftNode.y, false, false, true, canvasRef);
            await time(speedRef.current);
            drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);
            drawSquare(root.leftNode.data, root.leftNode.x, root.leftNode.y, false, false, false, canvasRef);

            if (await this.swapping(data,root.leftNode, canvasRef, speedRef)) {
                return true;
            }

        }
        //check rightNode exist if it is then swap data with rightNode data
        if (root.rightNode) {

            [root.data, root.rightNode.data] = [root.rightNode.data, root.data];
            drawSquare(root.data, root.x, root.y, false, false, true, canvasRef);
            drawSquare(root.rightNode.data, root.rightNode.x, root.rightNode.y, false, false, true, canvasRef);
            await time(speedRef.current);
            drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);
            drawSquare(root.rightNode.data, root.rightNode.x, root.rightNode.y, false, false, false, canvasRef);

            if (await this.swapping(data,root.rightNode, canvasRef, speedRef)) {
                return true;
            }

        }
    }

    //delete
    async delete(data, root, canvasRef, speedRef) {
        if (!root) {
            return;
        }

        if (root.data === data) {

            await this.swapping(data, root, canvasRef, speedRef);

            return true;
        }

        drawSquare(root.data, root.x, root.y, true, false, false, canvasRef);
        await time(speedRef.current)
        drawSquare(root.data, root.x, root.y, false, false, false, canvasRef);

        if (await this.delete(data, root.leftNode, canvasRef, speedRef)) {
            return true;
        }

        if (await this.delete(data, root.rightNode, canvasRef, speedRef)) {
            return true;
        }
    }
}

export default BinaryTree;