import React, { useCallback, useEffect, useRef, useState } from "react";
import PathFinderNavBar from "./PathFinderNavBar";
import Cell from "./Cell";


function PathFinder() {
    let [cellSize, setCellSize] = useState(15);
    let [rows, setRows] = useState([]);
    let [cols, setCols] = useState([]);
    let [algo, setAlgo] = useState(null);
    let [speed, setSpeed] = useState(0.5);
    let speedRef = useRef(speed);


    




    const sort = useCallback(() => {
        switch (algo) {
            case "A Star":
                break;
            case "Dijkstra's Algorithm":
                break;
            case "Breath First Search":
                break;
            case "Depth First Search":
                break;
            default:
        }
    }, [algo])


    useEffect(() => {
        let row = new Array(35).fill(0);
        let col = new Array(85).fill(0)
        setRows(row)
        setCols(col)
    }, [cellSize])


    useEffect(() => {
        if (algo === null || algo === undefined) return;
        sort()
    }, [algo])


    useEffect(() => {
        speedRef.current = speed;
    }, [speed])


    return <div>
        <PathFinderNavBar noOfElement={setCellSize} setAlgo={setAlgo} setSpeed={setSpeed} setCellSize={setCellSize}/>
        <div>
            <ul id="pathfinder-middle">
                <ul>
                    <li></li>
                    <li>Digital Movement</li>
                </ul>
                <ul>
                    <li>Visualizing</li>
                    <li>{algo}</li>
                </ul>
                <ul>
                    <li>Algo Speed</li>
                    <li>{speed * 1000}</li>
                </ul>
                <ul>
                    <li className="node-color"><div id="unvisited-node"></div> <div>Unvisited Node</div></li>
                    <li className="node-color"><div id="wall-node"></div> <div>Wall Node</div></li>
                </ul>
                <ul>
                    <li className="node-color"><div id="open-node"></div>Open Node</li>
                    <li className="node-color"><div id="close-node"></div>Close Node</li>
                </ul>
                <ul>
                    <li className="node-color"><div id="final-path"></div>Final Path</li>
                </ul>
            </ul>
        </div>

        <div class="grid-container">
            {rows.map((_, rowIndex) => {
                return <div className="is-flex" id={`flex-${rowIndex}`} key={rowIndex}>
                    { cols.map((_, index) => {
                            return <Cell  rowindex={rowIndex} colIndex={index} key={index} wallnode={3} unvisitednode={index} closenode={5} finalpath={9} />
                        })
                    }
                </div>
            })}
        </div>


    </div>
}

export default PathFinder;





