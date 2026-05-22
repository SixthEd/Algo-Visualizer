
function clearNode(arr, index, canvasRef) {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const rectWidth = 35;
    const rectHeight = 35;

    let width = arr[index].x;
    let height = arr[index].y;
    const x = Math.floor((width - rectWidth) / 2) + 0.5;
    const y = height;

    // clear rectangle

    ctx.clearRect(
        x -1,
        y -1,
        rectWidth +2 ,
        rectHeight +2,
    );
}

export default clearNode;