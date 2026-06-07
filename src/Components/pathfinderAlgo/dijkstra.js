import minHeap from "./minHeap";
import time from "./time";

//direction for N, E,S,W

let dr = [+1, 0, -1, 0];
let dc = [0, +1, 0, -1];

async function dijkstra(startNode, endNode, matrix, setMatrix, speedRef) {
    let row = startNode.row;
    let col = startNode.col;
    startNode.dist = 0;

    matrix[row][col].isOpen = true;
    matrix[row][col].isClose = false;

    let queue = [[0, row, col]];

    while (queue.length) {
        let index = minHeap(queue);

        let [dist, row, col] = queue.splice(index, 1)[0];

        //if there are duplicate
        if (dist > matrix[row][col].dist) continue;

        if (row === endNode.row && col === endNode.col) {
            let prevRow = endNode.previousRow;
            let prevCol = endNode.previousCol;

            endNode.isOpen = false;
            endNode.isClose = false;
            endNode.isFinalPath = true;

            setMatrix([...matrix])

            while (true) {
                let node = matrix[prevRow]?.[prevCol];

                if (!node) {
                    return;
                }

                node.isOpen = false;
                node.isClose = false;
                node.isFinalPath = true;

                setMatrix([...matrix])
                await time(speedRef.current)


                if (prevRow === startNode.row && prevCol === startNode.col) {
                    return;
                }

                prevRow = node.previousRow;
                prevCol = node.previousCol;
            }
        }
        await time(speedRef.current)

        //go through each direction and calcutate distance then find if the distance is smaller than prev if it is then put it into arr
        for (let i = 0; i < 4; i++) {

            let newRow = row + dr[i];
            let newCol = col + dc[i];

            if (newRow < 0 || newRow >= matrix.length) continue;
            if (newCol < 0 || newCol >= matrix[0].length) continue;

            if (matrix[newRow][newCol].isWall) continue;

            // matrix[newRow][newCol].isVisited = true;


            let newDist = dist + 1;
            let oldDist = matrix[newRow][newCol].dist;


            if (newDist < oldDist) {
                matrix[newRow][newCol].dist = newDist;

                matrix[newRow][newCol].previousRow = row;
                matrix[newRow][newCol].previousCol = col;

                matrix[newRow][newCol].isOpen = true;
                matrix[newRow][newCol].isClose = false;

                setMatrix([...matrix])

                queue.push([newDist, newRow, newCol])
            }
        }
    }
}

export default dijkstra;    