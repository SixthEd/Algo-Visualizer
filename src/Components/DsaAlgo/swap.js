import time from "./time";
import drawSquare from "../Dsa/drawSquare";

async function swap(arr, parent, index, canvasRef, speedRef) {

    // recreate square and add color for comparing
    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, false, true, false,canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, false, true, false,canvasRef);

    await time(speedRef.current);

    [arr[parent].data, arr[index].data] = [arr[index].data, arr[parent].data];

    // recreate square and add color for swapping and remove color for comparing
    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, false, false, true, canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, false, false, true, canvasRef);

    await time(speedRef.current)

    //recreate square and remove the swapping color
    drawSquare(arr[parent].data, arr[parent].x, arr[parent].y, false, false, false, canvasRef);

    drawSquare(arr[index].data, arr[index].x, arr[index].y, false, false, false, canvasRef);
}

export default swap;