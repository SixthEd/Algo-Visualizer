import React,{ useState, useRef } from "react";
import DsaNavBar from "./DsaNavBar";

import BinaryTrees from "./BinaryTrees";
import Heaps from "./Heaps";
import LinkedList from "./LinkedList";

function Dsa() {
    const [algo, setAlgo] = useState(null);
    const speedRef = useRef(0.05)


    return <div>
        <DsaNavBar algo={setAlgo} speedRef={speedRef} />
        {algo==="Heaps"?<Heaps speedRef={speedRef}/>:algo==="Binary Tree"?<BinaryTrees speedRef={speedRef}/>:<LinkedList speedRef={speedRef}/>}
    </div>
}

export default Dsa;