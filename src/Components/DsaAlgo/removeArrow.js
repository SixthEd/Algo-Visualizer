function removeArrow(arr, parent, removedChild, canvasRef) {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const rectWidth = 35;
    const rectHeight = 35;

    let width=null;
    let height = arr[parent].y + rectHeight + 2;
    let x1=null;
    let y1=null;
    let x2=null;
    let y2=null;

    switch (removedChild) {
        case "right":
            width = arr[parent].x + rectWidth;
            x1 = Math.floor((width - rectWidth) / 2) + 0.5;
            y1 = height;
            x2 = rectWidth + arr[parent].gap;
            y2 = rectHeight + 100;

            break;
        case "left":
            width = arr[parent].x;
            x1 = Math.floor((width - rectWidth) / 2) + 0.5;
            y1 = height;
            x2 = rectWidth - arr[parent].gap;
            y2 = rectHeight + 100;
            break;
        default:
    }

    // clear rectangle
    ctx.clearRect(
        x1 - 1,
        y1 - 1,
        x2,
        y2
    );
}

export default removeArrow;