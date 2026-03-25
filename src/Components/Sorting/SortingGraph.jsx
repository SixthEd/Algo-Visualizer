import React from "react";
import Pipes from "./Pipes.jsx"
function SortingGraph(props)
{
    
    return <div id="pipe-container">
        {props.array.map((e,index)=><Pipes height={e} key={index} select={props.select} index={index} />)}
    </div>
}

export default SortingGraph;