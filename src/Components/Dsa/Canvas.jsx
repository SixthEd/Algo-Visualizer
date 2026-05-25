import { useCallback, useEffect, useRef } from "react";

function Canvas() {
    let canvasRef = useRef(null);
    let previousSquareWidth= useRef(null);
    let previousSquareHeight= useRef(null);

    // const setPixel = useCallback(() => {
    //     const canvas = canvasRef.current;

    //     const dpr = window.devicePixelRatio || 1;

    //     // Logical size
    //     const width = canvas.width;
    //     const height = canvas.height;

    //     // Keep visual size same
    //     canvas.style.width = width + "px";
    //     canvas.style.height = height + "px";

    //     // Increase resolution
    //     canvas.width = width * dpr;
    //     canvas.height = height * dpr;
    // })

    const drawSquare = useCallback((text, width, height) => {

        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        const dpr = window.devicePixelRatio || 1;

        // Scale back to logical coordinates
        ctx.scale(dpr, dpr);
        const rectWidth = 40;
        const rectHeight = 40;

        const x = Math.floor(width / 2) + 0.5;
        const y = height;

        // Draw rectangle
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(x, y, rectWidth, rectHeight, 5);
        ctx.stroke();

        // Center text
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            text,
            x + rectWidth / 2,
            y + rectHeight / 2
        );

    })

    // const drawLine = useCallback(() => {
    //     const canvas = canvasRef.current;

    //     let ctx = canvas.getContext("2d")
    //     ctx.beginPath();

    //     let x1 = 0;
    //     let x2 = 200;
    //     let y1 = 0;
    //     let y2 = 100;
    //     // Set a start-point
    //     ctx.moveTo(0, 0);

    //     // Set an end-point
    //     ctx.lineTo(200, 100);


    //     ctx.strokeStyle = "white";
    //     ctx.lineWidth = 2;
    //     // Draw it
    //     ctx.stroke();


    //     let angle = Math.atan2(y2 - y1, x2 - x1)
    //     let size = 15;
    //     // Define a new path:
    //     ctx.beginPath();

    //     ctx.moveTo(x2, y2);

    //     ctx.lineTo(
    //         x2 - size * Math.cos(angle - Math.PI / 6),
    //         y2 - size * Math.sin(angle - Math.PI / 6)
    //     );

    //     ctx.lineTo(
    //         x2 - size * Math.cos(angle + Math.PI / 6),
    //         y2 - size * Math.sin(angle + Math.PI / 6)
    //     );

    //     // Connect last point back to first point
    //     ctx.closePath();

    //     ctx.strokeStyle = "white";
    //     ctx.lineWidth = 1;
    //     ctx.fillStyle = "white";
    //     ctx.fill();
    //     ctx.stroke();

    // }, [])

    useEffect(() => {

        // setPixel();

        const canvas = canvasRef.current;
        let width = canvas.width;
        let height = canvas.height;
        previousSquareWidth= width;
        previousSquareHeight =height;
        drawSquare("null", width, 0.5);
        // drawLine()


    }, []);
    return <canvas ref={canvasRef}>

    </canvas>
}

export default Canvas;