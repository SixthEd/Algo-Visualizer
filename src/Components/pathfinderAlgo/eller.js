import time from "./time"

async function eller(startNode, endNode, matrix, setMatrix, speedRef) {
    //create wall in whole matrix
    let k = 1;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 1) {
                    matrix[i][j].isWall = true;
                }
                else {
                    matrix[i][j].set = k++;
                }
            }
            else {
                matrix[i][j].isWall = true;
            }
        }
    }

    setMatrix([...matrix]);

    //going through each row 
    for (let i = 0; i < matrix.length - 1; i += 2) {

        //for each row going through each col and check the set value of node to the next node is this value is of same set if not then make them in one set then remove the wall between them 
        //use random<0.5 for the 0.5 possibility to remove wall

        for (let j = 0; j < matrix[0].length - 2; j += 2) {
            if (matrix[i][j].set !== matrix[i][j + 2].set && Math.random() < 0.5) {
                let left = matrix[i][j].set;
                let right = matrix[i][j + 2].set;

                matrix[i][j + 1].isWall = false;
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

                for (let k = j + 2; k < matrix[0].length; k += 2) {
                    if (matrix[i][k].set === right) {
                        matrix[i][k].set = left;
                    }
                }
            }
        }

        //check all set in a row and make a group for them
        let group = {};

        for (let j = 0; j < matrix[0].length; j += 2) {

            let id = matrix[i][j].set;

            if (!group[id]) {
                group[id] = []
            }
            group[id].push(j)
        }

        //for each set at least one wall should be remove
        for (let [key, val] of Object.entries(group)) {
            let open = false;

            for (let j of val) {
                if (!open || Math.random() < 0.5) {
                    matrix[i + 2][j].set = Number(key);
                    matrix[i + 1][j].isWall = false;
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
                    open = true;
                }
            }
        }

    }

    //at the end all col of the last index should be belongs to same set
    let lastRow = matrix.length - 1;

    for (let j = 0; j < matrix[0].length - 2; j += 2) {
        if (matrix[lastRow][j].set !== matrix[lastRow][j + 2].set) {
            let left = matrix[lastRow][j].set;
            let right = matrix[lastRow][j + 2].set;

            matrix[lastRow][j + 1].isWall = false;
            
            let newMatrix = [];

            for (const row of matrix) {
                let newNew = [];
                for (const col of row) {
                    newNew.push(col);
                }
                newMatrix.push(newNew);
            }

            setMatrix(newMatrix);

            await time(speedRef.current);

            for (let k = j + 2; k < matrix[0].length; k += 2) {
                if (matrix[lastRow][k].set === right) {
                    matrix[lastRow][k].set = left;
                }
            }
        }
    }



    startNode.isWall = false;
    endNode.isWall = false;

    setMatrix([...matrix]);

}

export default eller;