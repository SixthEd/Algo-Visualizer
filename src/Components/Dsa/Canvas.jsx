import { useCallback, useEffect, useRef } from "react";

function Canvas() {
    let canvasRef = useRef(null);

    const setPixel = useCallback(() => {
        const canvas = canvasRef.current;

        const dpr = window.devicePixelRatio || 1;

        // Logical size
        const width = canvas.width;
        const height = canvas.height;

        // Keep visual size same
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        // Increase resolution
        canvas.width = width * dpr;
        canvas.height = height * dpr;
    })

    const drawSquare = useCallback((text,width,height) => {

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

    useEffect(() => {

        setPixel();

        const canvas = canvasRef.current;
        let width = canvas.width;
        let height = canvas.height;
        drawSquare("null",width, 0.5);


    }, []);
    return <canvas ref={canvasRef}>

    </canvas>
}

export default Canvas;