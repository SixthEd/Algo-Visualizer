import React from "react";

function Cell(props) {
    let color = ""

    if (props.cell.isWall) {
        color = "rgb(44, 62, 80)"
    }
    else if (props.cell.isDefault) {
        color = "rgb(223, 249, 251)"
    }
    if(props.cell.isOpen)
    {
        color="rgb(85, 239, 196)"
    }
    else if(props.cell.isClose)
    {
        color="rgb(253, 121, 168)"
    }
    if(props.cell.isFinalPath)
    {
        color ="rgb(241, 196, 15)"
    }


    return <div
                className="cells"
                id={`cell_${[props.rowIndex]}-${[props.colIndex]}`}
                onMouseEnter={props.onMouseEnter}
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
                onMouseUp={props.onMouseUp}
                onMouseDown={props.onMouseDown}
                style={{ backgroundColor: color }} >
                {props.isStartNode && <div 
                                            className="draggable"
                                            draggable={true}
                                            onDragStart={(event) => {
             
                                                event.dataTransfer.setData("type", "start");
                                        }}>
                                                <img className="drag" src="/play.png" alt=""></img>
                                      </div>}
                {props.isEndNode &&   <div 
                                        className="draggable" 
                                        draggable={true} 
                                        onDragStart={(event) => {
             
                                                event.dataTransfer.setData("type", "end");
                                        }} >
                                            <img src="/target.png" alt=""></img>
                                      </div>}
            </div>

}

export default Cell;