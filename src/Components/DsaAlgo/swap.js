import time from "./time";

function swap(arr, parent, index, canvasRef) {

    function changeText(arr, i) {
        // Center text

        let rectHeight = 35;
        let rectWidth = 35;
        let data = arr[i].data;
        let ctx = canvasRef.current.getContext("2d");
        

        const x = Math.floor((arr[i].x - rectWidth) / 2) + 0.5;
        const y = arr[i].y;
        ctx.clearRect(x + 1, y + 1, 33, 33);

        ctx.fillStyle = "white";
        ctx.font = "10px";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            data,
            x + 35 / 2,
            y + 35 / 2
        );
    }


    [arr[parent].data, arr[index].data] = [arr[index].data, arr[parent].data];

    changeText(arr, index)
    changeText(arr, parent)


}

export default swap;