import React from "react";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';


function PathFinderNavBar(props) {

    let [speed, setSpeed] = useState(0.05);

    let [speedToggle, setSpeedToggle] = useState(false);
    let [algoToggle, setAlgoToggle] = useState(false);
    let [mazeToggle, setMazeToggle] = useState(false);

    return <div id="sorting-navbar">
        <ul id="sorting-left-navbar">
            <li><a href="/home"><HomeIcon sx={{ fontSize: 30, color: "rgb(46, 204, 113)" }}/></a></li>
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

            <ul onClick={() => { setMazeToggle((prev) => !prev) }}>Maze ▼
                {mazeToggle && <div id="maze-algo">
                    <button onClick={() => {props.mazeAlgo("Randomized Dfs"); }}>Randomized DFS</button>
                    <button onClick={() => {props.mazeAlgo("Recursive Division");}}>Recursive Division</button>
                    <button onClick={() => {props.mazeAlgo("Eller"); }}>Eller's Algorithm</button>
                    {/* <button onClick={() => {}}>Random Maze</button> */}
                </div>}
            </ul>
        </ul>

        <ul id="sorting-right-navbar">
            <button onClick={()=>{props.start()}}>Start</button>
            <button onClick={()=>{props.clear()}}>Clear Path</button>
            <button onClick={()=>{props.reset()}}>Reset Board</button>
        </ul>
    </div>
}

export default PathFinderNavBar;