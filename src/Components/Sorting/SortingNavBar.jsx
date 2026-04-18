import React from "react";
import { useState } from "react";

function SortingNavBar(props) {

    let [speed, setSpeed] = useState(0.05);
    let [arrayElements, setArrayElements] = useState(5);

    let [speedToggle, setSpeedToggle] = useState(false);
    let [arrayToggle, setArrayToggle] = useState(false);
    let [algoToggle, setAlgoToggle] = useState(false);


    return <div id="sorting-navbar">
        <ul id="sorting-left-navbar">
            <li>Home</li>
            <ul onClick={() => { setAlgoToggle((prev) => !prev) }}>Algorithms ▼
                {algoToggle && <div id="sorting-algo">
                    <button onClick={() => props.setAlgo("bubble")}>Bubble Sort</button>
                    <button onClick={() => props.setAlgo("selection")}>Selection Sort</button>
                    <button onClick={() => props.setAlgo("insertion")}>Insertion Sort</button>
                    <button onClick={() => props.setAlgo("merge")}>Merge sort</button>
                    <button onClick={() => props.setAlgo("quick")}>Quick sort</button>
                    <button onClick={() => props.setAlgo("radix")}>Radix sort</button>


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

            <ul onClick={() => { setArrayToggle((prev) => !prev) }}>Array Elements ▼
                {arrayToggle && <div id="sorting-navarray">
                    <li>
                        Elements: {arrayElements}
                    </li>
                    <li>
                        <input type="range" min="5" max="100" step={5} onChange={(e) => { setArrayElements(e.target.value); props.noOfElement(e.target.value) }} value={arrayElements}/>
                    </li>
                </div>}
            </ul>
        </ul>

        <ul id="sorting-right-navbar">
            <button onClick={() => { props.sort() }}>Sort Array</button>
            <button onClick={()=>{props.generate()}}>Generate Random Array</button>
        </ul>
    </div>
}

export default SortingNavBar;