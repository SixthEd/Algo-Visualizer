import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Canvas from "./Canvas";
import SearchIcon from '@mui/icons-material/Search';

function Heaps() {
    const buttons = [
        {
            label: "TAKE OUT MAXIMUM ELEMENT",
            onclick: () => { console.log("Working") }
        }
    ]


    const inputs = [
        {
            label: "Add new Node",
            buttonType: <AddIcon />,
            color: "#2ecc71",
            onclick: () => { console.log("Working") }

        },
    ]
    const legend = ["On this node", "Comparing Nodes", "Swapping Nodes"];

    return <div id="dsa-container">
        <div id="dsa-container-left">
            <div id="inner-left">
                <p id="top-text">Heaps Algorithms</p>
                <div id="heap-button">
                    <div>
                        <input type="radio" name="heap" />
                        <label>MaxHeap</label>
                    </div>
                    <div>
                        <input type="radio" name="heap" />
                        <label>Min  Heap</label>
                    </div>
                </div>
                {buttons.map((e, index) => {
                    return <button onClick={() => { e.onclick() }} className="action-button" key={index}>{e.label} </button>
                })}

                <div id="input-containers">
                    {inputs.map((e, index) => {
                        return <div className="input-button" key={index}>
                            <div className="input-label">
                                <label>{e.label}</label>
                                <input></input>
                            </div>
                            <button onClick={() => { e.onclick() }} style={{ backgroundColor: e.color }}>{e.buttonType}</button>
                        </div>
                    })}
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
            <Canvas />
        </div>
    </div>
}

export default Heaps;