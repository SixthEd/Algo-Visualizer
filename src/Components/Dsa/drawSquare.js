const drawSquare =(text, width, height, nodePush, nodeCompare, nodeSwap, canvasRef, remove=false) => {
    
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");


        // Scale back to logical coordinates
        // ctx.scale(dpr, dpr);
        const rectWidth = 35;
        const rectHeight = 35;

        const x = Math.floor((width-rectWidth) / 2) + 0.5;
        const y = height;

        // clear rectangle

        ctx.clearRect(x, y, rectWidth, rectHeight, 5)

        if(nodePush)
        {
            ctx.fillStyle= "rgb(52, 152, 219)"
        }
        else if(nodeCompare)
        {
            ctx.fillStyle="rgb(231, 76, 60)";
        }
        else if(nodeSwap)
        {
            ctx.fillStyle="rgb(39, 174, 96)";
        }
        else
        {
            ctx.fillStyle="black";
        }

        //draw rectangle
        
        ctx.strokeStyle = remove?"black":"white";
        ctx.lineWidth = remove?2:1;

        ctx.beginPath();
        ctx.roundRect(x, y, rectWidth, rectHeight, 5);
        ctx.fill();

        ctx.stroke();

        // Center text
        if(remove) return;
        
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

export default drawSquare;