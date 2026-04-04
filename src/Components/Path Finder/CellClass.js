class CellClass{

    constructor(row, col, totalRows, totalCols)
    {
        this.row =row;
        this.col =col;
        this.totalRow= totalRows;
        this.totalCols = totalCols;
        this.wall =false;
        this.neighbour = [];
    }
}

export default CellClass;