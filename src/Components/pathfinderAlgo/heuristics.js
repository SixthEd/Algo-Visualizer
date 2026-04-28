

function heuristics(currentNode,endNode)
{
    return Math.abs(currentNode.x-endNode.x) + Math.abs(currentNode.y-endNode.y)
}

export default heuristics;