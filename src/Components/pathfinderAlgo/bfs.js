import time from "./time"

let dr = [-1, +1, 0, 0]
let dc = [0, 0, -1, +1]


async function bfs(startNode, endNode, matrix, setMatrix, speedRef) {
    let startrow = startNode.row;
    let startcol = startNode.col;

    startNode.isVisited = true;

    let queue = [];
    let path = []
    queue.push([startrow, startcol])

    while (queue.length) {
        let [row, col] = queue.shift();

        matrix[row][col].isOpen = false;
        matrix[row][col].isClose = true;
        setMatrix([...matrix])

        if (endNode.row === row && endNode.col === col) {

            let pathRow = endNode.previousRow;
            let pathCol = endNode.previousCol;
            matrix[endNode.row][endNode.col].isFinalPath = true;

            while(true) {
                
                let node = matrix[pathRow]?.[pathCol]
                
                if(!node)
                {
                    break;
                }

                node.isOpen = false;
                node.isClose = false;
                node.isFinalPath = true;

                if(pathRow === startrow && pathCol === startcol) 
                {
                    break;
                }

                pathRow = node.previousRow;
                pathCol = node.previousCol;
                setMatrix([...matrix]);
            }
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
                matrix[newRow][newCol].isOpen = true;
                matrix[newRow][newCol].isClose = false;

                matrix[newRow][newCol].previousRow = row;
                matrix[newRow][newCol].previousCol = col;

                queue.push([newRow, newCol]);
                setMatrix([...matrix])
            }

        }

    }


    setMatrix([...matrix]);
}

export default bfs;