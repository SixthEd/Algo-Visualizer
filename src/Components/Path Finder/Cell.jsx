import React, { useEffect } from "react";

function Cell(props) {
    let color=""
    
    if(props.cell.isWall)
    {
        color="rgb(44, 62, 80)"
    }
    else if(props.cell.isDefault)
    {
        color ="rgb(223, 249, 251)"
    }



    return <div className="cells" id={`cell_${[props.rowIndex]}-${[props.colIndex]}`} onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown} style={{ backgroundColor: color }} >
        {props.isStartNode && <img src="/play.png" alt=""></img>}
        {props.isEndNode && <img src="/target.png" alt=""></img>}
    </div>

}

export default Cell;