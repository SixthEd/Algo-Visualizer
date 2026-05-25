export const SquareWidth = 35;

const drawSquare = (text, width, height, nodePush, nodeCompare, nodeSwap, canvasRef) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    // const dpr = window.devicePixelRatio || 1;

    // Scale back to logical coordinates
    // ctx.scale(dpr, dpr);
    const rectWidth = 35;
    const rectHeight = 35;

    const x = Math.floor((width - rectWidth) / 2) + 0.5;
    const y = height;

    // clear rectangle

    ctx.clearRect(x, y, rectWidth, rectHeight, 5);

    if (nodePush) {
        ctx.fillStyle = "rgb(52, 152, 219)";
    } else if (nodeCompare) {
        ctx.fillStyle = "rgb(231, 76, 60)";
    } else if (nodeSwap) {
        ctx.fillStyle = "rgb(39, 174, 96)";
    } else {
        ctx.fillStyle = "black";
    }

    //draw rectangle

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(x, y, rectWidth, rectHeight, 5);
    ctx.fill();

    ctx.stroke();

    // Center text
    ctx.fillStyle = "white";
    ctx.font = "10px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(text, x + rectWidth / 2, y + rectHeight / 2);
};

export const drawSquareNew = (node, nodePush, nodeCompare, nodeSwap, canvasRef) => {
    const canvas = canvasRef.current;

    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");

    // const dpr = window.devicePixelRatio || 1;

    // Scale back to logical coordinates
    // ctx.scale(dpr, dpr);
    const rectWidth = 35;
    const rectHeight = 35;

    // clear rectangle
    ctx.clearRect(node.x, node.y, rectWidth, rectHeight, 5);

    if (nodePush) {
        ctx.fillStyle = "rgb(52, 152, 219)";
    } else if (nodeCompare) {
        ctx.fillStyle = "rgb(231, 76, 60)";
    } else if (nodeSwap) {
        ctx.fillStyle = "rgb(39, 174, 96)";
    } else {
        ctx.fillStyle = "black";
    }

    // draw rectangle
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(node.x, node.y, rectWidth, rectHeight, 5);
    ctx.fill();

    ctx.stroke();

    // Center text
    ctx.fillStyle = "white";
    ctx.font = "10px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(node.data, node.x + rectWidth / 2, node.y + rectHeight / 2);
};

export default drawSquare;
