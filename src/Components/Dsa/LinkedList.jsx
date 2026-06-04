import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Canvas from "./Canvas";
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import linkedList from '../DsaAlgo/linkedList';

function LinkedList() {
    const [addInput, SetAddInput] = useState("1,2,3,4,5,6");
    const [deleteInput, SetDeleteInput] = useState("");
    const linkedListRef= useRef(null);
    const canvasRef= useRef(null);

    const buttons = [
        {
            label: "REVERSE THE LINKED LIST",
            onclick: () => { console.log("Working") }
        }
    ]

    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];

    const add = useCallback(()=>{
        
        if(!linkedListRef.current)
        {
            linkedListRef.current= new linkedList();
        }
        
        let arr= addInput.split(",").map((e)=>Number(e)).filter((e)=>!isNaN(e))

        linkedListRef.current.insert(arr,canvasRef)

    },[addInput]);

    const deletion = useCallback(()=>{
        if(!linkedListRef.current)
        {
            return;
        }

        linkedListRef.current.deleteByData(Number(deleteInput),canvasRef);

    },[deleteInput])


    //   useEffect(() => {
    //     const resize = window.addEventListener("resize", () => {
    //         canvasRef.current.height = canvasRef.current.clientHeight;
    //         canvasRef.current.width = canvasRef.current.clientWidth;

    //         // console.log(canvasRef.current.style.height)

    //     })
    //     canvasRef.current.height = canvasRef.current.clientHeight;
    //     canvasRef.current.width = canvasRef.current.clientWidth;



    // }, [])

    return <div id="dsa-container">
        <div id="dsa-container-left">
            <div id="inner-left">
                <p id="top-text">Linked List Algorithms</p>

                {buttons.map((e, index) => {
                    return <button onClick={() => { e.onclick() }} className="action-button" key={index}>{e.label} </button>
                })}

                <div id="input-containers">
                    <div className="input-button">
                        <div className="input-label">
                            <label>Add New Node</label>
                            <input onChange={(e)=>{SetAddInput(e.target.value)}} value={addInput}></input>
                        </div>
                        <button onClick={() => { add()}} style={{ backgroundColor: "#2ecc71"}}><AddIcon /></button>
                    </div>
                  
                     <div className="input-button">
                        <div className="input-label">
                            <label>Delete Node</label>
                            <input onChange={(e)=>{SetDeleteInput(e.target.value)}} value={deleteInput}></input>
                        </div>
                        <button onClick={() => { deletion() }} style={{ backgroundColor: "#e74c3c"}}><DeleteIcon /></button>
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
            {/* <Node data={null} />
                <div>
                    <Arrow />
                </div> */}
            <canvas ref={canvasRef} height={"800px"} width={"1450px"}>

            </canvas>
        </div>
    </div>
}

export default LinkedList;