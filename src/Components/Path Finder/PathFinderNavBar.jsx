import React from "react";
import { useState } from "react";

function PathFinderNavBar(props) {

    let [speed, setSpeed] = useState(0.05);
    let [cells, setCells] = useState(10);

    let [speedToggle, setSpeedToggle] = useState(false);
    let [cellToggle, setCellToggle] = useState(false);
    let [algoToggle, setAlgoToggle] = useState(false);
    let [mazeToggle, setMazeToggle] = useState(false);

    return <div id="sorting-navbar">
        <ul id="sorting-left-navbar">
            <li>Home</li>
            <ul onClick={() => { setAlgoToggle((prev) => !prev) }}>Algorithms ▼
                {algoToggle && <div id="sorting-algo">
                    <button onClick={() => props.setAlgo("A Star")}>A Star</button>
                    <button onClick={() => props.setAlgo("Dijkstra's Algorithm")}>Dijkstra's Algorithm</button>
                    <button onClick={() => props.setAlgo("Breath First Search")}>Breath First Search</button>
                    <button onClick={() => props.setAlgo("Depth First Search")}>Depth First Search</button>
                </div>}
            </ul>

            <ul onClick={() => { setSpeedToggle((prev) => !prev) }}>Speed ▼
                {speedToggle && <div id="sorting-navspeed">
                    <li>
                        Speed {speed}s
                    </li>
                    <li>
                        <input type="range" min="0.05" max="2" step={0.05} value={speed} onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setSpeed(val);
                            props.setSpeed(val);
                        }} />
                    </li>
                </div>}
            </ul>
                
            <ul onClick={() => { setCellToggle((prev) => !prev) }}>Cell Size ▼
                {cellToggle && <div id="sorting-navarray">
                    <li>
                        Cells: {cells}
                    </li>
                    <li>
                        <input type="range" min="5" max="30" step={5} onChange={(e) => { setCells(e.target.value); props.setCellSize(e.target.value) }} />
                    </li>
                </div>}
            </ul>

            <ul onClick={() => { setMazeToggle((prev) => !prev) }}>Maze ▼
                {mazeToggle && <div id="maze-algo">
                    <button onClick={() => {}}>Randomized DFS</button>
                    <button onClick={() => {}}>Recursive Division</button>
                    <button onClick={() => {}}>Eller's Algorithm</button>
                    <button onClick={() => {}}>Random Maze</button>
                </div>}
            </ul>
        </ul>

        <ul id="sorting-right-navbar">
            <button onClick={()=>{props.start(props.algo)}}>Start</button>
            <button onClick={()=>{}}>Clear Path</button>
            <button onClick={()=>{props.reset()}}>Reset Board</button>
        </ul>
    </div>
}

export default PathFinderNavBar;