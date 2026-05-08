import heuristics from "./heuristics";
import minHeuristics from "./minHeuristics";
import time from "./time";

//direction for move to the N, S, E, W
let dr = [+1, -1, 0, 0];
let dc = [0, 0, +1, -1];

//initially mark all cell hScore,fScore inifinity as we don't know distance from the goal
async function aStarSearch(startNode, endNode, matrix, setMatrix, speedRef) {
    let row = startNode.row;
    let col = startNode.col;

    //path distance
    startNode.gScore = 0;

    //distance from goal
    startNode.hScore = heuristics(startNode, endNode);

    //total =path+distance
    startNode.fScore = startNode.gScore + startNode.hScore;

    startNode.isVisited = true;

    let queue = [[row, col]]

    while (queue.length) {
        //find min fScore cell
        let index = minHeuristics(queue, matrix);

        let [row, col] = queue.splice(index, 1)[0];

        matrix[row][col].isVisited = true;
        matrix[row][col].isOpen = false;
        matrix[row][col].isClose = true;

        setMatrix([...matrix]);

        //backtrack the path from goal to start
        if (row === endNode.row && col === endNode.col) {

            let prevRow = endNode.row;
            let prevCol = endNode.col;

            endNode.isFinalPath =true;

            while (true) {
                await time(speedRef.current);
                
                let node = matrix[prevRow]?.[prevCol];

                if(!node)
                {
                    break;
                }
                node.isOpen = false;
                node.isClose = false;
                node.isFinalPath = true;

                if(prevRow === startNode.row && prevCol ===startNode.col)
                {
                    setMatrix([...matrix]);
                    return;
                }

                prevRow =node.previousRow;
                prevCol = node.previousCol;

                setMatrix([...matrix])

            }
            return;
        }

        await time(speedRef.current)
        for (let i = 0; i < 4; i++) {
            let newRow = row + dr[i];
            let newCol = col + dc[i];

            //check the row and col for neighbour is valid
            if (newRow < 0 || newRow >= matrix.length) continue;
            if (newCol < 0 || newCol >= matrix[0].length) continue;

            //check the neighbour is not visited or wall 
            if (!matrix[newRow][newCol].isVisited && !matrix[newRow][newCol].isWall) {


            //go through each neigbour and find hscore, path and calculate fscore and store into queue
                let newGScore = matrix[row][col].gScore + 1;

                if (newGScore < matrix[newRow][newCol].gScore) {

                    matrix[newRow][newCol].previousRow = row;
                    matrix[newRow][newCol].previousCol = col;

                    matrix[newRow][newCol].gScore = newGScore;

                    let newHScore = heuristics(matrix[newRow][newCol], endNode);
                    matrix[newRow][newCol].hScore = newHScore;

                    matrix[newRow][newCol].fScore = newGScore + newHScore;

                    queue.push([newRow, newCol]);

                    matrix[newRow][newCol].isOpen = true;
                    matrix[newRow][newCol].isClose = false;
                    setMatrix([...matrix])
                }
            }

        }
    }
}


export default aStarSearch;