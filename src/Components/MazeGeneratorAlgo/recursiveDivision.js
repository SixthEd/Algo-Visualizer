import time from "../pathfinderAlgo/time";

let ORIENTATION = Object.freeze({
    vertical: 1,
    horizontal: 2,
});

async function recursiveDivision(startRow, startCol, endRow, endCol, startNode, endNode, matrix, setMatrix, speedRef, depth) {
    // if (depth >= 3) return;

    if (startRow >= endRow || startCol >= endCol) return;

    const height = endRow - startRow;
    const width = endCol - startCol;

    let wallRow, wallCol;
    let dCol = 0;
    let dRow = 0;
    let length;

    let orientation = endRow - startRow > endCol - startCol ? ORIENTATION.vertical : ORIENTATION.horizontal;

    // Always draw gap on odd cell
    // Always draw wall on even cell

    let rowsArray = [];
    let colsPassageArray = [];
    let colsArray = [];
    let rowsPassageArray = [];

    let gap = [];

    for (let i = startRow; i <= endRow; i++) {
        if (i % 2 === 0) {
            rowsPassageArray.push(i);
        } else {
            rowsArray.push(i);
        }
    }

    for (let i = startCol; i <= endCol; i++) {
        if (i % 2 === 0) {
            colsPassageArray.push(i);
        } else {
            colsArray.push(i);
        }
    }

    switch (orientation) {
        case ORIENTATION.vertical: {
            // Draw Horizontal wall

            wallRow = rowsArray[Math.floor(Math.random() * rowsArray.length)];
            gap = [wallRow, colsPassageArray[Math.floor(Math.random() * colsPassageArray.length)]];

            wallCol = startCol;
            dCol = 1;
            length = width;

            break;
        }

        case ORIENTATION.horizontal: {
            // Draw vertical wall

            wallCol = colsArray[Math.floor(Math.random() * colsArray.length)];
            gap = [rowsPassageArray[Math.floor(Math.random() * rowsPassageArray.length)], wallCol];

            wallRow = startRow;
            dRow = 1;
            length = height;

            break;
        }
    }

    console.log({
        depth,
        wallRow,
        wallCol,
        orientation,
        rowsArray,
        colsPassageArray,
        colsArray,
        rowsPassageArray,
        gap,
    });
    // debugger

    //loop to create wall
    let wRow = wallRow;
    let wCol = wallCol;

    for (let i = 0; i <= length; i++) {
        await time(speedRef);

        let skip = false;

        if (wRow === gap[0] && wCol === gap[1]) skip = true;
        if (wRow === startNode.row && wCol === startNode.col) skip = true;
        if (wRow === endNode.row && wCol === endNode.col) skip = true;

        if (!skip) {
            matrix[wRow][wCol].isWall = true;
        }

        wRow += dRow;
        wCol += dCol;
    }
    setMatrix([...matrix]);

    if (orientation === ORIENTATION.horizontal) {
        // We drew vertical wall, divide vertically
       await recursiveDivision(
            startRow,
            startCol,
            endRow,
            wallCol - 1,
            startNode,
            endNode,
            matrix,
            setMatrix,
            speedRef,
            depth + 1,
        );
       await recursiveDivision(
            startRow,
            wallCol + 1,
            endRow,
            endCol,
            startNode,
            endNode,
            matrix,
            setMatrix,
            speedRef,
            depth + 1,
        );

        return;
    }

    // We drew vertical wall, divide Horizontally
   await recursiveDivision(
        startRow,
        startCol,
        wallRow - 1,
        endCol,
        startNode,
        endNode,
        matrix,
        setMatrix,
        speedRef,
        depth + 1,
    );
   await recursiveDivision(
        wallRow + 1,
        startCol,
        endRow,
        endCol,
        startNode,
        endNode,
        matrix,
        setMatrix,
        speedRef,
        depth + 1,
    );
}
export default recursiveDivision