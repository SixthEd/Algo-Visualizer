import React, { useEffect, useState } from "react";

function Cell(props)
{
    let [color,setColor] = useState("rgb(223, 249, 251)");


    return <div className="cells" id={`cell_${[props.rowIndex]}-${[props.colIndex]}`} style={{backgroundColor: {color}}} >

    </div> 
}

export default Cell;