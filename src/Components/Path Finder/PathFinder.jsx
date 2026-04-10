import React, { useCallback, useEffect, useRef, useState } from "react";
import PathFinderNavBar from "./PathFinderNavBar";
import Cell from "./Cell";
import CellClass from "./CellClass";


function PathFinder() {
    let [cellSize, setCellSize] = useState(15);
    let [matrix,setMatrix] = useState([]);
    let [rows, setRows] = useState(35);
    let [cols, setCols] = useState(82);
    let [startNode, setStartNode] = useState(null);
    let [endNode, setEndNode] = useState(null)

    let [algo, setAlgo] = useState(null);
    let [speed, setSpeed] = useState(0.5);
    let speedRef = useRef(speed);

    let [mouseDown ,setMouseDown] = useState(false);

    



    const select = useCallback(() => {
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
    }, [algo]);

    const cellClicked =useCallback((i,j)=>{
        console.log("working")
        if((startNode.row===i && startNode.col===j) || (endNode.row===i && endNode.col===j)) return;

        let newMatrix = [...matrix];

        newMatrix[i][j].isWall = !newMatrix[i][j].isWall
        newMatrix[i][j].isDefault = !newMatrix[i][j].isDefault

        setMatrix(newMatrix)
    },[startNode, endNode, matrix]);

    const moveEnter = useCallback((i,j)=>{
        if(mouseDown)
        {
            cellClicked(i,j)
        }
    },[mouseDown])


    useEffect(() => {
        let matrix = new Array(rows).fill(0).map((_,rowIndex)=> new Array(cols).fill(0).map((_,colIndex)=> new CellClass(rowIndex,colIndex,rows,cols)));
        let middleRow = Math.floor(rows/2);
        let startCol = Math.floor(cols/4);
        let endCol = Math.floor((cols*3)/4);
        setStartNode(matrix[middleRow][startCol])
        setEndNode(matrix[middleRow][endCol])
        setMatrix(matrix);


    }, [rows,cols])


    useEffect(() => {
        if (algo === null || algo === undefined) return;
        select()
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

        <div className="grid-container">
            {matrix.map((row, rowIndex) => {
                return <div className="is-flex" id={`flex-${rowIndex}`} key={rowIndex}>
                    { row.map((cell, colIndex) => {
                            return <Cell  rowindex={rowIndex} colIndex={colIndex} key={`${rowIndex}-${colIndex}`} cell={cell}  isStartNode={cell===startNode} isEndNode={cell===endNode} onMouseDown={(e)=>{ setMouseDown(true); cellClicked(rowIndex,colIndex)}} onMouseEnter={()=>{ moveEnter(rowIndex, colIndex)}} onMouseUp={()=>{setMouseDown(false)}}/>
                        })
                    }
                </div>
            })}
        </div>


    </div>
}

export default PathFinder;





