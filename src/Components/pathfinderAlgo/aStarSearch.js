import heuristics from "./heuristics";

let dr = [+1, -1, 0, 0];
let dc = [0, 0, +1, -1];


function aStarSearch(startNode, endNode, matrix, setMatrix) {
    let row = startNode.row;
    let col = startNode.col;

    let gScore = 0
    startNode.gScore = gScore;

    let hScore = heuristics(startNode, endNode);

    startNode.hScore = hScore;
    startNode.fScore = gScore + hScore;

    startNode.isVisited = true;

    let queue = [[row, col]]

    while (queue.length) {
        let [row, col] = minHeuristics(queue, matrix);

        if (row === endNode.row && col === endNode.col) {
            return;
        }

        for (let i = 0; i < 4; i++) {
            let newRow = row + dr[i];
            let newCol = col + dc[i];

            if (newRow < 0 || newRow >= matrix.length) continue;
            if (newCol < 0 || newCol >= matrix[0].length) continue;


            if (!matrix[newRow][newCol].isVisited && !matrix[newRow][newCol].isWall) {
                matrix[newRow][newCol].isVisited = true;

                let newGScore = matrix[row][col].gScore + 1;

                if (newGScore < matrix[newRow][newCol].gScore) {

                    matrix[newRow][newCol].previousRow = row;
                    matrix[newRow][newCol].previousCol = col;

                    matrix[newRow][newCol].gScore = newGScore;

                    let newHScore = heuristics(matrix[newRow][newCol], endNode);
                    matrix[newRow][newCol].hScore = newHScore;

                    matrix[newRow][newCol].fScore = newGScore + newHScore;

                    queue.push([newRow, newCol]);
                }
            }

        }
    }
}


function minHeuristics(arr, matrix) {
    let min = Infinity;
    let row = -1;
    let col = -1;
    for (let i = 0; i < arr.length; i++) {
        let [r, c] = arr[i];
        if (min > matrix[r][c].fScore) {
            min = matrix[r][c].fScore;
            row = r;
            col = c;
        }
    }

    return [row, col]

}

export default aStarSearch;