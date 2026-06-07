import time from "./time"

// direction for traveling N,S,E,W
let dr = [-1, +1, 0, 0]
let dc = [0, 0, -1, +1]


async function bfs(startNode, endNode, matrix, setMatrix, speedRef) {
    let startrow = startNode.row;
    let startcol = startNode.col;

    startNode.isVisited = true;

    let queue = [];
    // let path = []
    queue.push([startrow, startcol])

    while (queue.length) {

        //select current cell row and col

        let [row, col] = queue.shift();

        matrix[row][col].isOpen = false;
        matrix[row][col].isClose = true;
        let newMatrix = [];

        for (const row of matrix) {
            let newNew = [];
            for (const col of row) {
                newNew.push(col);
            }
            newMatrix.push(newNew);
        }

        setMatrix(newMatrix);

        //backtracking to track the path from endNode to startNode
        if (endNode.row === row && endNode.col === col) {

            let pathRow = endNode.previousRow;
            let pathCol = endNode.previousCol;
            matrix[endNode.row][endNode.col].isFinalPath = true;

            while (true) {

                await time(speedRef.current)

                let node = matrix[pathRow]?.[pathCol]

                if (!node) {
                    break;
                }

                node.isOpen = false;
                node.isClose = false;
                node.isFinalPath = true;

                if (pathRow === startrow && pathCol === startcol) {

                    let newMatrix = [];

                    for (const row of matrix) {
                        let newNew = [];
                        for (const col of row) {
                            newNew.push(col);
                        }
                        newMatrix.push(newNew);
                    }

                    setMatrix(newMatrix);
                    break;
                }

                pathRow = node.previousRow;
                pathCol = node.previousCol;
                let newMatrix = [];

                for (const row of matrix) {
                    let newNew = [];
                    for (const col of row) {
                        newNew.push(col);
                    }
                    newMatrix.push(newNew);
                }

                setMatrix(newMatrix);

            }
            return;
        }

        await time(speedRef.current);

        //go through each neighbour of cell and check the row and col for neighbour is valid if it is then push it into the queue and mark it as visited
        for (let i = 0; i < 4; i++) {

            let newRow = row + dr[i];
            let newCol = col + dc[i];

            //check conditon row and col should in the matrix
            if (newRow < 0 || newRow >= matrix.length) continue;
            if (newCol < 0 || newCol >= matrix[0].length) continue;


            //check the cell is not visited and is not a wall
            if (!matrix[newRow][newCol].isVisited && !matrix[newRow][newCol].isWall) {

                matrix[newRow][newCol].isVisited = true;
                matrix[newRow][newCol].isOpen = true;
                matrix[newRow][newCol].isClose = false;

                matrix[newRow][newCol].previousRow = row;
                matrix[newRow][newCol].previousCol = col;

                queue.push([newRow, newCol]);
                let newMatrix = [];

                for (const row of matrix) {
                    let newNew = [];
                    for (const col of row) {
                        newNew.push(col);
                    }
                    newMatrix.push(newNew);
                }

                setMatrix(newMatrix);
            }

        }

    }


    let newMatrix = [];

    for (const row of matrix) {
        let newNew = [];
        for (const col of row) {
            newNew.push(col);
        }
        newMatrix.push(newNew);
    }

    setMatrix(newMatrix);
}

export default bfs;