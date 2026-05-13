import time from "../pathfinderAlgo/time";

let dr = [+2, -2, 0, 0]
let dc = [0, 0, +2, -2]

// find Neighbour around a cell
function collectNeighbours(cell, matrix) {
    let row = cell.row;
    let col = cell.col;
    let neighbours = [];

    console.log(row, col)
    for (let i = 0; i < 4; i++) {
        let newRow = row + dr[i];
        let newCol = col + dc[i];

        if (newRow < 0 || newRow >= matrix.length) continue;
        if (newCol < 0 || newCol >= matrix[0].length) continue;

        let newCell = matrix[newRow][newCol];

        if (newCell.isVisited) continue;

        let direction = "";

        if (dr[i] === 2 && dc[i] === 0) direction = "S";
        if (dr[i] === -2 && dc[i] === 0) direction = "N";
        if (dr[i] === 0 && dc[i] === 2) direction = "E";
        if (dr[i] === 0 && dc[i] === -2) direction = "W";


        neighbours.push([newCell, direction]);
    }
    cell.neighbour = [...neighbours];
    return;
}


// select random neighbour
function selectNeighbour(cell) {
    let index = Math.floor(Math.random() * cell.neighbour.length);

    console.log(cell.neighbour)
    return cell.neighbour[index]
}


//remove wall
function removeWall(neighbour, direction, matrix, setMatrix) {
    switch (direction) {
        case "N":
            matrix[neighbour.row + 1][neighbour.col].isWall = false

            break;
        case "S":
            matrix[neighbour.row - 1][neighbour.col].isWall = false

            break;
        case "W":
            matrix[neighbour.row][neighbour.col + 1].isWall = false

            break;
        case "E":
            matrix[neighbour.row][neighbour.col - 1].isWall = false

            break;
        default:
            break;
    }
    setMatrix([...matrix])
}


//applied dfs iterative algo
async function dfs(row, col, startNode, endNode, matrix, setMatrix, speedRef) {
    let cell = matrix[row][col];

    let stack = [cell];

    while (stack.length) {
        let currentCell = stack[stack.length - 1];

        collectNeighbours(currentCell, matrix);

        //check if current cell contains neighbour then push the neighbour into the stack otherwise pop

        if (currentCell.neighbour.length) {
            let [neighbour, direction] = selectNeighbour(currentCell);


            neighbour.isVisited = true;

            //remove wall in the direction where you are moving
            removeWall(neighbour, direction, matrix, setMatrix);

            await time(speedRef.current)

            stack.push(neighbour);
        }
        else {
            stack.pop();
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[i][j].isVisited = false;
        }
    }

    startNode.isWall = false;
    endNode.isWall = false;
    setMatrix([...matrix])
}



function randomizedDfs(startNode, endNode, matrix, setMatrix, speedRef) {

    // create wall and neigbhour pattern
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 0) continue;

                matrix[i][j].isWall = true;
            }
            else {
                matrix[i][j].isWall = true;
            }
        }
    }

    setMatrix([...matrix])
    dfs(0, 0, startNode, endNode, matrix, setMatrix, speedRef)

    //mark all cell as unvisited

}

export default randomizedDfs