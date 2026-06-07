import time from "./time";

//direction for the neighbours
let dr = [+1, 0, 0, -1];
let dc = [0, +1, -1, 0];


async function dfs(startNode, endNode, row, col, matrix, setMatrix, speedRef) {

    //check row and col for current cell is between matrix

    if (row < 0 || row >= matrix.length) return false;
    if (col < 0 || col >= matrix[0].length) return false;

    if (row === endNode.row && col === endNode.col) {
        return true;
    }

    let node = matrix[row]?.[col];

    //check node is undefined or visited or wall 

    if (!node || node.isVisited || node.isWall) {
        return false;
    }

    node.isVisited = true;

    node.isOpen = true;
    node.isClose = false;
    let newMatrix = [];

    for (const row of matrix) {
        let newNew = [];
        for (const col of row) {
            newNew.push(col);
        }
        newMatrix.push(newNew);
    }

    setMatrix(newMatrix);

    //go through each neighbour select and go through the depth if the goal is found the return true
    for (let i = 0; i < 4; i++) {
        let newRow = row + dr[i];
        let newCol = col + dc[i];

        let newMatrix = [];

        for (const row of matrix) {
            let newNew = [];
            for (const col of row) {
                newNew.push(col);
            }
            newMatrix.push(newNew);
        }

        setMatrix(newMatrix);
        await time(speedRef.current)

        if (await dfs(startNode, endNode, newRow, newCol, matrix, setMatrix, speedRef)) {

            startNode.isFinalPath = true;
            matrix[newRow][newCol].isFinalPath = true;
            setMatrix([...matrix]);
            await time(speedRef.current);
            return true;
        }

    }
    node.isOpen = false;
    node.isClose = true;
    let newmatrix = [];

    for (const row of matrix) {
        let newNew = [];
        for (const col of row) {
            newNew.push(col);
        }
        newmatrix.push(newNew);
    }

    setMatrix(newmatrix);

}

export default dfs;