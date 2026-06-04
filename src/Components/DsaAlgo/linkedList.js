import time from "./time"

//LinkedList
function drawSquare(text, width, height, nodePush, nodeCompare, nodeSwap, canvasRef, remove = false) {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");


    // Scale back to logical coordinates
    // ctx.scale(dpr, dpr);
    const rectWidth = 35;
    const rectHeight = 35;

    const x = width;
    const y = height;

    // clear rectangle

    ctx.clearRect(x, y, rectWidth, rectHeight, 5)

    if (nodePush) {
        ctx.fillStyle = "rgb(52, 152, 219)"
    }
    else if (nodeCompare) {
        ctx.fillStyle = "rgb(231, 76, 60)";
    }
    else if (nodeSwap) {
        ctx.fillStyle = "rgb(39, 174, 96)";
    }
    else {
        ctx.fillStyle = "black";
    }

    //draw rectangle

    ctx.strokeStyle = remove ? "black" : "white";
    ctx.lineWidth = remove ? 3 : 1;

    ctx.beginPath();
    ctx.roundRect(x, y, rectWidth, rectHeight, 5);
    ctx.fill();

    ctx.stroke();

    // Center text
    if (remove) return;

    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        text,
        x + rectWidth / 2,
        y + rectHeight / 2
    );


}


function drawArrow(x1, y1, x2, y2, canvasRef, remove = false, ptr = false) {


    const canvas = canvasRef.current;

    let ctx = canvas.getContext("2d");
    ctx.beginPath();

    if (remove) {
        ctx.strokeStyle = "#000";

    }
    else if (ptr) {
        ctx.strokeStyle = "rgb(231, 76, 60)"
    }
    else {
        ctx.strokeStyle = "rgb(52, 152, 219)";
    }
    ctx.moveTo(x1, y1);

    // Set an end-point
    ctx.lineTo(x2, y2);

    ctx.lineWidth = remove ? 5 : 2;
    // Draw it
    ctx.stroke();

    let angle = Math.atan2(y2 - y1, x2 - x1);
    let size = 15;
    // Define a new path:
    ctx.beginPath();

    ctx.moveTo(x2, y2);

    ctx.lineTo(x2 - size * Math.cos(angle - Math.PI / 6), y2 - size * Math.sin(angle - Math.PI / 6));

    ctx.lineTo(x2 - size * Math.cos(angle + Math.PI / 6), y2 - size * Math.sin(angle + Math.PI / 6));

    // Connect last point back to first point
    ctx.closePath();


    if (remove) {
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";

    }
    else if (ptr) {
        ctx.strokeStyle = "rgb(231, 76, 60)"
        ctx.fillStyle = "rgb(231, 76, 60)"
    }
    else {
        ctx.strokeStyle = "rgb(52, 152, 219)";
        ctx.fillStyle = "rgb(52, 152, 219)"
    }

    ctx.fill();
    ctx.stroke();

    if (!ptr) return;


    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "ptr",
        x2,
        y1 + 10
    );
};





class Node {
    constructor(data, x, y, next = null) {
        this.data = data;
        this.next = next;
        this.x = x;
        this.y = y;
    }
}

class LinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.run = false;
        this.delRun = false;
        this.input = [];
        this.arr = [];
        this.squareWidth = 35;
        this.squareHeight = 35;
    }
    //     // console.log(data)
    //     this.input.push(...data);
    //     this.arr.push(...data)

    //     if (this.run) {
    //         return;
    //     }

    //     this.run = true;

    //     while (this.input.length) {
    //         if (this.size === 0) {

    //             let node = new Node(this.input[0], 50, (canvasRef.current.height / 2) - 35);

    //             this.head = node;
    //             this.tail = node;
    //             this.size++;
    //             drawSquare(node.data, node.x, node.y, false, false, false, canvasRef, true);
    //             await time(25)
    //             drawSquare(node.data, node.x, node.y, false, false, false, canvasRef);
    //             this.input.shift();
    //             continue;
    //         }

    //         let node = new Node(this.input[0], this.tail.x + 100, (canvasRef.current.height / 2) - 35);


    async insert(data, canvasRef) {

        //if delete node function is running then do not insert
        if (this.delRun) {
            return
        }

        //insertion of data coming from user
        this.input.push(...data);


        //check the insertion is still in running  process if true then return
        if (this.run) {
            return;
        }

        // run for the first time so run become true to hold the upcoming insertion
        this.run = true;

        while (this.input.length) {
            //check the linked list length is zero
            if (this.size === 0) {

                //create node
                let node = new Node(this.input[0], 50, (canvasRef.current.height / 2) - this.squareHeight);

                //head and tail both are equal to node 
                this.head = node;
                this.tail = node;
                this.size++;


                // remove older square and create new
                drawSquare(node.data, node.x, node.y, false, false, false, canvasRef, true);
                await time(25)
                drawSquare(node.data, node.x, node.y, false, false, false, canvasRef);

                // remove inserted element 
                this.input.shift();
                this.arr.push(node);

                //create for null

                drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef, true)
                await time(25)
                drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef)

                //removing old square and create new one
                drawSquare("null", node.x + 100, node.y, false, false, false, canvasRef, true);
                await time(25)
                drawSquare("null", node.x + 100, node.y, false, false, false, canvasRef);
                continue;
            }

            // create a pointer called current
            let current = this.head;

            //first current pointer arrow create then remove
            await time(25)
            drawArrow(current.x + this.squareWidth / 2, current.y + this.squareHeight + 100, current.x + this.squareWidth / 2, current.y + this.squareHeight + 10, canvasRef, false, true);
            await time(25)
            drawSquare(current.data, current.x, current.y + this.squareHeight + 100, false, false, false, canvasRef, true)
            drawArrow(current.x + this.squareWidth / 2, current.y + this.squareHeight + 100, current.x + this.squareWidth / 2, current.y + this.squareHeight + 10, canvasRef, true);


            //go to the last node  and create arrow as we go to the next node;
            while (current.next) {
                current = current.next;
                drawArrow(current.x + this.squareWidth / 2, current.y + this.squareHeight + 100, current.x + this.squareWidth / 2, current.y + this.squareHeight + 10, canvasRef, false, true);
                await time(25);
                drawSquare(current.data, current.x, current.y + this.squareHeight + 100, false, false, false, canvasRef, true)
                drawArrow(current.x + this.squareWidth / 2, current.y + this.squareHeight + 100, current.x + this.squareWidth / 2, current.y + this.squareHeight + 10, canvasRef, true);

            }

            //last node next point to new node
            let node = new Node(this.input[0], current.x + 100, current.y);
            this.tail = node;
            current.next = node;

            // remove old arrow point to the next node then create 
            drawArrow(current.x + this.squareWidth + 5, current.y + this.squareHeight / 2, node.x - 5, node.y + 35 / 2, canvasRef, true)
            drawArrow(current.x + this.squareWidth + 5, current.y + this.squareHeight / 2, node.x - 5, node.y + 35 / 2, canvasRef)

            //removing old square and create new one
            drawSquare(node.data, node.x, node.y, false, false, false, canvasRef, true);
            drawSquare(node.data, node.x, node.y, false, false, false, canvasRef);

            this.size++;
            this.input.shift();

            //create for null
            drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef, true)
            await time(25)
            drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef)

            //removing old square and create new one
            drawSquare("null", node.x + 100, node.y, false, false, false, canvasRef, true);
            await time(25)
            drawSquare("null", node.x + 100, node.y, false, false, false, canvasRef);

            this.arr.push(node);

        }
        this.run = false
    }

    //sending remove node and create square and arrow from that again by checking next node
    async backSquareCreate(node, canvasRef) {

        while (node.next) {
            //remove old square and create new
            drawSquare(node.next.data, node.x, node.y, false, false, false, canvasRef, true);
            await time(25)
            drawSquare(node.next.data, node.x, node.y, false, false, false, canvasRef);


            //create for next
            await time(25)
            drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef, true)
            await time(25)
            drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef)

            node = node.next;
        }

        // removing last node
        drawSquare("null", node.x, node.y, false, false, false, canvasRef, true);
        await time(25)

        //replacing last node with null 
        drawSquare("null", node.x, node.y, false, false, false, canvasRef);
        drawSquare("null", node.x + 100, node.y, false, false, false, canvasRef, true);

        drawArrow(node.x + this.squareWidth + 5, node.y + this.squareHeight / 2, node.x + 100 - 5, node.y + 35 / 2, canvasRef, true)

    }

    //change node position 
    async changeAxis(node) {
        console.log(node)
        while (node) {
            //remove old square and create new
            node.x -= 100;
            node = node.next;
        }

    }


    //delete node by data to create a new list  from where it was deleted
    async deleteByData(data, canvasRef) {

        if (this.size === 0) {
            return;

        }

        //check is the delete data function is running already if it is then do not delete
        if (this.delRun) {
            return;
        }

        //remove
        this.delRun = true;
        if (data === this.head.data) {

            let deleteNode;
            if (this.size === 1) {

                //pointer
                drawArrow(this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 100, this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 10, canvasRef, false, true);
                await time(25)
                drawSquare(this.head.data, this.head.x, this.head.y + this.squareHeight + 100, false, false, false, canvasRef, true)
                drawArrow(this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 100, this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 10, canvasRef, true);

                //remove square and arrow 
                drawSquare(this.head.data, this.head.x, this.head.y, false, false, false, canvasRef, true)
                await time(25);
                drawArrow(this.head.x + this.squareWidth + 5, this.head.y + this.squareHeight / 2, this.head.x + 100 - 5, this.head.y + 35 / 2, canvasRef, true)

                deleteNode = this.head;

                this.head = null;
                this.tail = null;
                this.size--;
                this.delRun = false;
                return;
            }
            else {

                //pointer
                drawArrow(this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 100, this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 10, canvasRef, false, true);
                await time(25)
                drawSquare(this.head.data, this.head.x, this.head.y + this.squareHeight + 100, false, false, false, canvasRef, true)
                drawArrow(this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 100, this.head.x + this.squareWidth / 2, this.head.y + this.squareHeight + 10, canvasRef, true);


                //remove square and arrow 
                drawSquare(this.head.data, this.head.x, this.head.y, false, false, false, canvasRef, true)
                await time(25);

                drawArrow(this.head.x + this.squareWidth + 5, this.head.y + this.squareHeight / 2, this.head.x + 100 - 5, this.head.y + 35 / 2, canvasRef, true)

                deleteNode = this.head;
                this.head = this.head.next;
            }


            await this.backSquareCreate(deleteNode, canvasRef);
            await this.changeAxis(deleteNode)



            this.size--;
            this.delRun = false;
            return this.head;
        }

        let current = this.head;


        while (current) {
            //pointer
            drawArrow(current.x + this.squareWidth / 2, current.y + this.squareHeight + 100, current.x + this.squareWidth / 2, current.y + this.squareHeight + 10, canvasRef, false, true);
            await time(25)
            //remove pointer
            drawSquare(current.data, current.x, current.y + this.squareHeight + 100, false, false, false, canvasRef, true)
            drawArrow(current.x + this.squareWidth / 2, current.y + this.squareHeight + 100, current.x + this.squareWidth / 2, current.y + this.squareHeight + 10, canvasRef, true);

            if (current.next && current.next.data === data) {
                break;
            }
            current = current.next;
        }

        if (!current) {
            return this.head;
        }

        if (current.next.next === null) {
            this.tail = current;
        }

        //pointer
        drawArrow(current.x + (this.squareWidth / 2) + 100, current.y + this.squareHeight + 100, current.x + (this.squareWidth / 2) + 100, current.y + this.squareHeight + 10, canvasRef, false, true);
        await time(25)
        //remove last pointer
        drawSquare(current.data, current.x + 100, current.y + this.squareHeight + 100, false, false, false, canvasRef, true)
        drawArrow(current.x + (this.squareWidth / 2) + 100, current.y + this.squareHeight + 100, current.x + (this.squareWidth / 2) + 100, current.y + this.squareHeight + 10, canvasRef, true);


        let deleteNode = current.next;


        console.log(deleteNode)
        current.next = current.next.next;
        this.size--;

        //sending deleteNode
        await this.backSquareCreate(deleteNode, canvasRef);
        await this.changeAxis(deleteNode);

        this.delRun = false;
        return this.head;
    }

}


export default LinkedList; 