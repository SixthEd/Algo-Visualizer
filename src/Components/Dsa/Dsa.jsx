import React, { useState } from "react";
import DsaNavBar from "./DsaNavBar";

function Dsa() {

    const [algo, setAlgo] = useState(null);

    const actionMap = {
        "Linked List": [
            {
                label: "REVERSE THE LINKED LIST",
            }
        ],
        "Binary Tree": [
            {
                label: "INORDER TRAVERSAL"
            },
            {
                label: "PREORDER TRAVERSAL"
            },
            {
                label: "POSTORDER TRAVERSAL"
            },
            {
                label: "INVERT BINARY TREE"
            }
        ],
        "Heaps": [
            {
                label: "TAKE OUT MAXIMUM ELEMENT"
            }
        ]
    }

    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];
    return <div>
        <DsaNavBar algo={setAlgo} />
        <div id="dsa-container">
            <div id="dsa-container-left">
                {algo &&
                    <div id="inner-left">
                        <p id="top-text">{algo} Algorithms</p>
                        {algo === "Heaps" &&
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
                        }
                        {actionMap[algo].map((e, index) => {
                            return <button key={index}>{e.label}</button>
                        })}

                        <div id="legend">
                            <p>Legend</p>
                            {legend.map((e,index) => {
                                return <div key={index} className="legend-color" id={`legend-color-${index}`}>
                                    <div></div><p>{e}</p>
                                </div>
                            })}
                        </div>

                    </div>
                }
            </div>
            <div id="dsa-container-right"></div>
        </div>
    </div>
}

export default Dsa;