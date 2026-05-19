import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Canvas from "./Canvas";
import { useState } from 'react';

function LinkedList() {
    const [addInput, SetAddInput] = useState("1");
    const [deleteInput, SetDeleteInput] = useState("");

    const buttons = [
        {
            label: "REVERSE THE LINKED LIST",
            onclick: () => { console.log("Working") }
        }
    ]

    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];

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
                        <button onClick={() => {  }} style={{ backgroundColor: "#2ecc71"}}><AddIcon /></button>
                    </div>
                  
                     <div className="input-button">
                        <div className="input-label">
                            <label>Delete Node</label>
                            <input onChange={(e)=>{SetDeleteInput(e.target.value)}} value={deleteInput}></input>
                        </div>
                        <button onClick={() => {  }} style={{ backgroundColor: "#e74c3c"}}><DeleteIcon /></button>
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
            <Canvas />
        </div>
    </div>
}

export default LinkedList;