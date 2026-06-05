import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useCallback, useEffect, useRef } from "react";
import MaxHeap from '../DsaAlgo/maxheap';
import MinHeap from '../DsaAlgo/minheap';


function Heaps(props) {


    const [addInput, setAddInput] = useState("1,2,3,4,5");

    const [heapType, setHeapType] = useState(null);

    let canvasRef = useRef(null);
    let maxHeapRef = useRef(null);
    let minHeapRef = useRef(new MinHeap());


    const addNode = useCallback(() => {

        let data = addInput.split(",").filter((e) => !Number.isNaN(e)).map(e => parseInt(e));

        // console.log(data)

        switch (heapType) {
            case 0:
                if (!maxHeapRef.current) {
                    minHeapRef.current = null;
                    maxHeapRef.current = new MaxHeap();
                }
                maxHeapRef.current.insert(data, canvasRef, props.speedRef);
                break;
            case 1:
                if (!minHeapRef.current) {
                    maxHeapRef.current = null;
                    minHeapRef.current = new MinHeap();
                }
                minHeapRef.current.insert(data, canvasRef, props.speedRef);
                break;
            default:
        }


    }, [addInput, heapType])


    const buttons = {
        0: [
            {
                label: "TAKE OUT MAXIMUM ELEMENT",
                onclick: () => { maxHeapRef.current?.delete(canvasRef, props.speedRef) }
            }
        ],
        1: [
            {
                label: "TAKE OUT MINIMUM ELEMENT",
                onclick: () => { minHeapRef.current?.delete(canvasRef,props.speedRef) }
            }
        ]
    }

    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];
    

    useEffect(() => {

        canvasRef.current.height = canvasRef.current.clientHeight;
        canvasRef.current.width = canvasRef.current.clientWidth;

    }, [])

    return <div id="dsa-container">
        <div id="dsa-container-left">
            <div id="inner-left">
                <p id="top-text">Heaps Algorithms</p>
                <div id="heap-button">
                    <div>
                        <input type="radio" name="heap" checked={heapType === 0} onChange={() => {
                            setHeapType(0);
                            const canvas = canvasRef.current;
                            let ctx = canvas.getContext("2d");
                            ctx.reset();
                        }} />
                        <label>MaxHeap</label>
                    </div>
                    <div>
                        <input type="radio" name="heap" checked={heapType === 1} onChange={() => {
                            setHeapType(1);
                            const canvas = canvasRef.current;
                            let ctx = canvas.getContext("2d");
                            ctx.reset();
                        }} />
                        <label>Min  Heap</label>
                    </div>
                </div>
                {buttons[heapType]?.map((e, index) => {
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
            <canvas ref={canvasRef} style={{ height: "100%", width: "100%" }}>

            </canvas>
        </div>
    </div>
}

export default Heaps;