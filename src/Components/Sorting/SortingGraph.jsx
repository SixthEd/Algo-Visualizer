import React from "react";
import Pipes from "./Pipes.jsx"
function SortingGraph(props)
{
    
    return <div id="pipe-container">
        {props.array.map((e,index)=><Pipes height={e} key={index} index={index} select={props.select} />)}
    </div>
}

export default SortingGraph;