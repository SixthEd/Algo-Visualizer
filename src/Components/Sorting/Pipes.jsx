import React from "react";
import { useState } from "react";

function Pipes(props) {

const isSwap = props.select?.num1 == props.index|| props.select?.num2 == props.index;
const isSorted = props.select?.sorted?.includes(props.index);
const isPivot= props.select?.pivot== props.index

let color = "#34495e";
if(isSwap) 
{
  color ="orange"
}
else if(isSorted)
{
  color="green"
}
else if(isPivot)
{
  color="purple"
}

return <div id="pipe" style={{height:`${props.height*2}px` , background:color}}>
    {props.height}
  </div>

}

export default Pipes;