import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Canvas from "./Canvas";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useCallback, useRef } from 'react';
import BinaryTree from '../DsaAlgo/binaryTree';

function BinaryTrees() {

    const [addInput, SetAddInput] = useState("1,2,3,4,5");
    const [deleteInput, SetDeleteInput] = useState("");
    const [searchInput, SetSearchInput] = useState("");
    const binaryTreeRef = useRef(new BinaryTree());
    const canvasRef = useRef(null);
    const [traversalType, setTraversalType] = useState(null);
    const [traversalOutput, setTraversalOutput] = useState([]);
    const buttons = [
        {
            label: "INORDER TRAVERSAL",
            onclick: () => { binaryTreeRef.current.inOrder(binaryTreeRef.current.root,send, canvasRef);  }
        },
        {
            label: "PREORDER TRAVERSAL",
            onclick: () => {  binaryTreeRef.current.preOrder(binaryTreeRef.current.root,send, canvasRef); }
        },
        {
            label: "POSTORDER TRAVERSAL",
            onclick: () => {  binaryTreeRef.current.postOrder(binaryTreeRef.current.root,send, canvasRef); }

        },
        {
            label: "INVERT BINARY TREE",
            onclick: () => { 
                binaryTreeRef.current.inverted(binaryTreeRef.current.root, canvasRef);
                // console.log(binaryTreeRef.current.root)
             }
        }
    ]

    const send = useCallback((data)=>{
        console.log("send",data)
        setTraversalOutput((prev)=>{return [...prev,data]});
    },[traversalOutput])

    const addNode = useCallback(() => {
        // drawSquare(addInput);

        let data = addInput.split(",").filter((e) => !Number.isNaN(e)).map(e => parseInt(e));

        binaryTreeRef.current.insert(data, canvasRef)
        console.log(binaryTreeRef.current.root)
    }, [addInput])

    const search = useCallback(()=>{
        binaryTreeRef.current.search(parseInt(searchInput), binaryTreeRef.current.root,canvasRef);
    },[searchInput])

    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];

    return <div id="dsa-container">
        <div id="dsa-container-left">
            <div id="inner-left">
                <p id="top-text">Binary Tree Algorithms</p>

                {buttons.map((e, index) => {
                    return <button onClick={() => {
                        setTraversalType(e.label);
                        setTraversalOutput([]);
                        e.onclick(); 
                    }}

                        className="action-button" key={index}>{e.label} </button>
                })}

                <div id="input-containers">
                    <div className="input-button">
                        <div className="input-label">
                            <label>Add New Node</label>
                            <input onChange={(e) => { SetAddInput(e.target.value) }} value={addInput}></input>
                        </div>
                        <button onClick={() => { addNode() }} style={{ backgroundColor: "#2ecc71" }}><AddIcon /></button>
                    </div>

                    <div className="input-button">
                        <div className="input-label">
                            <label>Delete Node</label>
                            <input onChange={(e) => { SetDeleteInput(e.target.value) }} value={deleteInput}></input>
                        </div>
                        <button onClick={() => { }} style={{ backgroundColor: "#e74c3c" }}><DeleteIcon /></button>
                    </div>

                    <div className="input-button">
                        <div className="input-label">
                            <label>Search Node</label>
                            <input onChange={(e) => { SetSearchInput(e.target.value); }} value={searchInput}></input>
                        </div>
                        <button onClick={() => { search() }} style={{ backgroundColor: "#3298dc" }}><SearchIcon /></button>
                    </div>
                </div>

                <div id="legend">
                    <p>Legend</p>
                    {legend.map((e, index) => {
                        return <div key={index} className="legend-color" id={`legend-color-${index}`}>
                            <div></div><p>{e}</p>
                        </div>
                    })}
                </div>

            </div>
        </div>
        <div id="dsa-container-right">
            {/* <Node data={null} />
                <div>
                    <Arrow />
                </div> */}
            <canvas ref={canvasRef} height={"800px"} width={"1450px"}>

            </canvas>
            {traversalType &&
                <div id="output-board">
                    {traversalOutput?.map((e,index) => { return <p key={index}>{e} {traversalOutput.length-1!==index && <span>--&gt;</span>}</p> })}
                </div>}
        </div>
    </div>
}

export default BinaryTrees;