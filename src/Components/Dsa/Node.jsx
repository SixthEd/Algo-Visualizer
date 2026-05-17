function Node(props)
{
    return <div id="node-container">
        {props.data?props.data:"Null"}
    </div>
}

export default Node;