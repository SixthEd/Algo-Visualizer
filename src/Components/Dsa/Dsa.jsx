import React, { useMemo, useState } from "react";
import DsaNavBar from "./DsaNavBar";

import BinaryTrees from "./BinaryTrees";
import Heaps from "./Heaps";
import LinkedList from "./LinkedList";

function Dsa() {

    const [algo, setAlgo] = useState(null);

    return <div>
        <DsaNavBar algo={setAlgo} />
        {algo==="Heaps"?<Heaps/>:algo==="Binary Tree"?<BinaryTrees/>:<LinkedList/>}
    </div>
}

export default Dsa;