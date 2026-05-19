import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useCallback, useEffect, useRef } from "react";
import MaxHeap from '../DsaAlgo/heap';
import Node from '../DsaAlgo/node';


function Heaps() {


    const [addInput, setAddInput] = useState("1");
    const [heap, setHeap] = useState([]);

    let canvasRef = useRef(null);
    let maxHeapRef = useRef(new MaxHeap());

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


    const addNode = useCallback(() => {
        // drawSquare(addInput);
        maxHeapRef.current.insert(addInput, canvasRef);

        setHeap(prev => [...prev, addInput]);

    }, [addInput])

    useEffect(() => {

        setPixel();
        const canvas = canvasRef.current;
        let width = canvas.width;
        let height = 0.5

    }, []);

    const buttons = [
        {
            label: "TAKE OUT MAXIMUM ELEMENT",
            onclick: () => { console.log("Working") }
        }
    ]


    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];

    return <div id="dsa-container">
        <div id="dsa-container-left">
            <div id="inner-left">
                <p id="top-text">Heaps Algorithms</p>
                <div id="heap-button">
                    <div>
                        <input type="radio" name="heap" />
                        <label>MaxHeap</label>
                    </div>
                    <div>
                        <input type="radio" name="heap" />
                        <label>Min  Heap</label>
                    </div>
                </div>
                {buttons.map((e, index) => {
                    return <button onClick={() => { e.onclick() }} className="action-button" key={index}>{e.label} </button>
                })}

                <div id="input-containers">
                    <div className="input-button">
                        <div className="input-label">
                            <label>Add New Node</label>
                            <input onChange={(e) => { setAddInput(e.target.value) }} value={addInput}></input>
                        </div>
                        <button onClick={() => { addNode(addInput) }} style={{ backgroundColor: "#2ecc71" }}><AddIcon /></button>
                    </div>
                </div>

                <div id="legend">
                    <p>Legend</p>
                    {legend.map((e, index) => {
                        return <div key={index} className="legend-color" id={`legend-color-${index}`}>
                            <div></div><p>{e}</p>
                        </div>
                    })}
                </div>

            </div>
        </div>
        <div id="dsa-container-right">
            <canvas ref={canvasRef} height={"800px"} width={"1450px"}>
            </canvas>
        </div>
    </div>
}

export default Heaps;