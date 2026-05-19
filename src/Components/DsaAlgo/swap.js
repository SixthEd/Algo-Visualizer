import time from "./time";
import drawSquare from "../Dsa/drawSquare";

async function swap(arr, parent, index, canvasRef) {

    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, false, true, false,canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, false, true, false,canvasRef);

    await time(25);

    [arr[parent].data, arr[index].data] = [arr[index].data, arr[parent].data];

    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, false, false, true, canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, false, false, true, canvasRef);

    await time(25)

    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, false, false, false, canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, false, false, false, canvasRef);
}

export default swap;