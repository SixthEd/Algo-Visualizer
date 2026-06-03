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
    ctx.font = "10px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        text,
        x + rectWidth / 2,
        y + rectHeight / 2
    );


}


function drawArrow(x1, y1, x2, y2, canvasRef, remove = false) {


    const canvas = canvasRef.current;

    let ctx = canvas.getContext("2d");
    ctx.beginPath();

    ctx.strokeStyle = !remove ? "rgb(52, 152, 219)" : "#000";
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

    ctx.strokeStyle = !remove ? "rgb(52, 152, 219)" : "#000";
    ctx.fillStyle = !remove ? "rgb(52, 152, 219)" : "#000";
    ctx.fill();
    ctx.stroke();
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
        this.input = [];
        this.arr = [];
    }

    insert(data, canvasRef) {

        // console.log(data)
        this.input.push(...data);
        this.arr.push(...data)

        if (this.run) {
            return;
        }

        this.run = true;

        while (this.input.length) {
            if (this.size === 0) {

                let node = new Node(this.input[0], 50, (canvasRef.current.height / 2) - 35);

                this.head = node;
                this.tail = node;
                this.size++;

                drawSquare(node.data, node.x, node.y, false, false, false, canvasRef);
                this.input.shift();
                continue;
            }

            let node = new Node(this.input[0], this.tail.x + 100, (canvasRef.current.height / 2) - 35);

            drawSquare(node.data, node.x, node.y, false, false, false, canvasRef)
            drawArrow(this.tail.x + 35, this.tail.y + 35 / 2, node.x, node.y + 35 / 2, canvasRef)

            this.tail.next = node;
            this.tail = node;
            this.size++;
            this.input.shift();

        }

        drawSquare("null", this.tail.x + 100, this.tail.y, false, false, false, canvasRef)
        drawArrow(this.tail.x + 35, this.tail.y + 35 / 2, this.tail.x + 100, this.tail.y + 35 / 2, canvasRef)
        this.run = false;
        return this.head;
    }


    deleteByData(data, canvasRef) {

        if (this.size === 0) {
            return;

        }

        if (data === this.head.data) {
            if (this.size === 1) {
                drawSquare(this.head.data, this.head.x, this.head.y, false, false, false, canvasRef, true)
                drawArrow(this.head.x + 35, this.head.y + 35 / 2, this.head.x + 100, this.head.y + 35 / 2, canvasRef, true)

                this.head = null;
                this.tail = null;
            }
            else {
                drawSquare(this.head.data, this.head.x, this.head.y, false, false, false, canvasRef, true)
                drawArrow(this.head.x + 35, this.head.y + 35 / 2, this.head.x + 100, this.head.y + 35 / 2, canvasRef, true)

                this.head = this.head.next;
            }


            let val = this.arr.filter((e) => e !== data)

            this.size = 0;
            this.arr = []
            let lastX = this.tail.x;
            let lastY = this.tail.y;
            this.insert(val, canvasRef);
            drawSquare("null", lastX+100, lastY, false, false, false, canvasRef, true)
            drawArrow(lastX + 35, lastY + 35 / 2, lastX + 100, lastY + 35 / 2, canvasRef, true)

            this.size--;
            return this.head;
        }

        // let current = this.head;

        // while (current) {
        //     if (current.next && current.next.data === data) {
        //         break;
        //     }
        //     current = current.next;
        // }

        // if (!current) {
        //     return this.head;
        // }

        // if (current.next.next === null) {
        //     this.tail = current;
        // }

        // current.next = current.next.next;
        // this.size--;
        // return this.head;
    }


}


export default LinkedList; 