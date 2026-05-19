import time from "./time";
import drawSquare from "../Dsa/drawSquare";

async function swap(arr, parent, index, canvasRef) {

    [arr[parent].data, arr[index].data] = [arr[index].data, arr[parent].data];

    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, canvasRef);


    await time(25)


}

export default swap;