function minHeuristics(arr, matrix) {
    let min = Infinity;
    let index=0;
    for (let i = 0; i < arr.length; i++) {
        let [r, c] = arr[i];
        if (min > matrix[r][c].fScore) {
            min = matrix[r][c].fScore;
            index=i;
        }
    }

    return index;

}

export default minHeuristics;