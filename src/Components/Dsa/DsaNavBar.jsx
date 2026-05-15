import { useState } from "react";
function DsaNavBar(props) {

    const [speed, setSpeed] = useState(0.05);

    const [algoToggle, setAlgoToggle] = useState(false);
    const [speedToggle, setSpeedToggle] = useState(false);


    return <div id="dsa-navbar">
        <ul id="dsa-left-navbar">
            <li>Home</li>


        </ul>

        <ul id="dsa-right-navbar">
            <ul onClick={()=>{setAlgoToggle((prev)=>!prev)}}>Algorithms ▼
                {algoToggle && <div id="dsa-algo">
                    <button onClick={()=>{props.algo("Linked List")}}>LinkedList</button>
                    <button onClick={()=>{props.algo("Binary Tree")}}>Binary Trees</button>
                    <button onClick={()=>{props.algo("Heaps")}}>Heaps</button>
                </div>}
            </ul>

            <ul onClick={()=>{setSpeedToggle((prev)=>!prev)}}>Speed ▼
                {speedToggle && <div id="dsa-navspeed">
                    <li>
                        Speed:{speed}
                    </li>
                    <li>
                        <input type="range" min="0.5" max="2" step={0.05}  value={speed} onChange={(e)=>{
                            let value = parseFloat(e.target.value)
                            setSpeed(value);
                        }}/>
                    </li>
                </div>}
            </ul>
        </ul>


    </div>
}

export default DsaNavBar;