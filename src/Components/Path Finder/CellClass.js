class CellClass{

    constructor(row, col, totalRows, totalCols)
    {
        this.row =row;
        this.col =col;
        this.totalRow= totalRows;
        this.totalCols = totalCols;
        this.isWall =false;
        this.neighbour = [];
        this.isDefault=true;
    }
}

export default CellClass;