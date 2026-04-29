

function heuristics(currentNode,endNode)
{
    return Math.abs(currentNode.row-endNode.row) + Math.abs(currentNode.col-endNode.col)
}

export default heuristics;