import React, { useMemo, useState } from "react";
import DsaNavBar from "./DsaNavBar";
import Node from "./Node";
import Arrow from "./Arrow";
import BinaryTrees from "./BinaryTrees";
import Heaps from "./Heaps";
import LinkedList from "./LinkedList";

function Dsa() {

    const [algo, setAlgo] = useState(null);

    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];
    return <div>
        <DsaNavBar algo={setAlgo} />
        {algo==="Heaps"?<Heaps/>:algo==="Binary Tree"?<BinaryTrees/>:<LinkedList/>}
    </div>
}

export default Dsa;