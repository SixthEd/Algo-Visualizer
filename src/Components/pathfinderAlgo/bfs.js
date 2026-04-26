import time from "./time"

let dr = [-1, +1, 0, 0]
let dc = [0, 0, -1, +1]


async function bfs(startNode, endNode, matrix, setMatrix, speedRef) {
    let startrow = startNode.row;
    let startcol = startNode.col;

    startNode.isVisited = true;

    let queue = [];

    queue.push([startrow, startcol])

    while (queue.length) {
        let [row, col] = queue.shift();

        matrix[row][col].isOpen = true;
        matrix[row][col].isClose = false;
        setMatrix([...matrix])

        if (endNode.row === row && endNode.col === col) {
            return;
        }

        for (let i = 0; i < 4; i++) {
            await time(speedRef.current);

            let newRow = row + dr[i];
            let newCol = col + dc[i];
            if (newRow < 0 || newRow >= matrix.length) continue;
            if (newCol < 0 || newCol >= matrix[0].length) continue;



            if (!matrix[newRow][newCol].isVisited && !matrix[newRow][newCol].isWall) {
                matrix[newRow][newCol].isVisited = true;
                matrix[newRow][newCol].isOpen = false;
                matrix[newRow][newCol].isClose = true;
                queue.push([newRow, newCol]);
                setMatrix([...matrix])
            }

        }

    }

    setMatrix([...matrix]);
}

export default bfs;