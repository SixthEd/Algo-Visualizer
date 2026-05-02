import time from "../pathfinderAlgo/time";

 let ORIENTATION = Object.freeze({
    vertical: 1,
    horizontal: 2,
});

 function recursiveDivision(row, col, endRow, endCol, startNode, endNode, matrix, setMatrix, speedRef) {
    if (row >= endRow || col >= endCol) return;

    const height = endRow - row;
    const width = endCol - col;

    let wallRow, wallCol;
    let wallSpaceRow, wallSpaceCol;
    let dCol = 0;
    let dRow = 0;
    let length;

    let orientation = endRow - row > endCol - col ? ORIENTATION.vertical : ORIENTATION.horizontal;

    switch (orientation) {
        case ORIENTATION.vertical: {
            // Draw Horizontal wall

            // Wall row doesn't change
            wallRow = row + Math.floor(Math.random() * (height));
            wallCol = col;
            dCol = 1;
            wallSpaceRow =wallRow;
            wallSpaceCol = col + Math.floor(Math.random() * width);
            length = width;

            break;
        }

        case ORIENTATION.horizontal: {
            // Draw vertical wall

            // Wall col doesn't change
            wallCol = col + Math.floor(Math.random() * (width));
            wallRow = row;
            dRow = 1;
            wallSpaceRow = row + Math.floor(Math.random() * height);
            wallSpaceCol =wallCol;
            length = height;

            break;
        }
    }

    console.log(wallRow,wallCol,wallSpaceRow, wallSpaceCol , orientation)
    // debugger

    //loop to create wall
    let wRow = wallRow;
    let wCol = wallCol;

    for (let i = 0; i < length; i++) {
        // await time(speedRef);

        let skip = false;

        if (wRow === wallSpaceRow && wCol === wallSpaceCol) skip = true;
        if (wRow === startNode.row && wCol === startNode.col) skip = true;
        if (wRow === endNode.row && wCol === endNode.col) skip = true;

        if (!skip) {
            matrix[wRow][wCol].isWall = true;
        }

        wRow += dRow;
        wCol += dCol;
    }
    setMatrix([...matrix])

    if (orientation === ORIENTATION.horizontal) {
        // We drew vertical wall, divide vertically
         recursiveDivision(row, col, endRow, wallCol - 1, startNode, endNode, matrix, setMatrix, speedRef);
         recursiveDivision(row, wallCol + 1, endRow, endCol, startNode, endNode, matrix, setMatrix, speedRef);

        return;
    }

    // We drew vertical wall, divide Horizontally
     recursiveDivision(row, col, wallRow - 1, endCol, startNode, endNode, matrix, setMatrix, speedRef);
     recursiveDivision(wallRow + 1, col, endRow, endCol, startNode, endNode, matrix, setMatrix, speedRef);
}

export default recursiveDivision