  const drawArrow = (x1, y1, x2, y2, canvasRef) => {
        const canvas = canvasRef.current;

        let ctx = canvas.getContext("2d")
        ctx.beginPath();

        // let x1 = 0;
        // let x2 = 200;
        // let y1 = 0;
        // let y2 = 100;
        // Set a start-point
        ctx.moveTo(x1, y1);

        // Set an end-point
        ctx.lineTo(x2, y2);


        ctx.strokeStyle = "rgb(52, 152, 219)";
        ctx.lineWidth = 2;
        // Draw it
        ctx.stroke();


        let angle = Math.atan2(y2 - y1, x2 - x1)
        let size = 15;
        // Define a new path:
        ctx.beginPath();

        ctx.moveTo(x2, y2);

        ctx.lineTo(
            x2 - size * Math.cos(angle - Math.PI / 6),
            y2 - size * Math.sin(angle - Math.PI / 6)
        );

        ctx.lineTo(
            x2 - size * Math.cos(angle + Math.PI / 6),
            y2 - size * Math.sin(angle + Math.PI / 6)
        );

        // Connect last point back to first point
        ctx.closePath();

        ctx.strokeStyle = "rgb(52, 152, 219)";
        ctx.lineWidth = 1;
        ctx.fillStyle = "rgb(52, 152, 219)";
        ctx.fill();
        ctx.stroke();

    }


    export default drawArrow;