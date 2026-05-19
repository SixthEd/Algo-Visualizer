const drawSquare =(text, width, height, push, canvasRef) => {
    
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        const dpr = window.devicePixelRatio || 1;

        // Scale back to logical coordinates
        ctx.scale(dpr, dpr);
        const rectWidth = 35;
        const rectHeight = 35;

        const x = Math.floor((width-rectWidth) / 2) + 0.5;
        const y = height;

        // Draw rectangle

        ctx.clearRect(x, y, rectWidth, rectHeight, 5)

        if(push)
        {
            ctx.fillStyle= "rgb(52, 152, 219)"
        }
        else
        {
            ctx.fillStyle="black";
        }

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

        ctx.fillText(
            text,
            x + rectWidth / 2,
            y + rectHeight / 2
        );

   
    }

export default drawSquare;