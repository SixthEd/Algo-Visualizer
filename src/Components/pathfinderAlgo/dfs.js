import time from "./time";

let dr = [+1, 0, 0, -1];
let dc = [0, +1, -1, 0];


async function dfs(startNode, endNode, row, col, matrix, setMatrix, speedRef) {

    if (row < 0 || row >= matrix.length) return false;
    if (col < 0 || col >= matrix[0].length) return false;

    if (row === endNode.row && col === endNode.col) {
        return true;
    }

    let node = matrix[row]?.[col];

    if (!node || node.isVisited || node.isWall) {
        return false;
    }

    node.isVisited = true;

    node.isOpen = true;
    node.isClose = false;
    setMatrix([...matrix]);
    
    for (let i = 0; i < 4; i++) {
        let newRow = row + dr[i];
        let newCol = col + dc[i];

        setMatrix([...matrix])
        await time(speedRef.current)

        if (await dfs(startNode, endNode, newRow, newCol, matrix, setMatrix, speedRef)) {
            
            startNode.isFinalPath=true;
            matrix[newRow][newCol].isFinalPath = true;
            setMatrix([...matrix])
            return true;
        }

    }
    node.isOpen = false;
    node.isClose = true;
    setMatrix([...matrix])

}

export default dfs;