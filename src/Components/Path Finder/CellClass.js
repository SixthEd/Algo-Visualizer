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
        this.isVisited=false;
        this.isOpen=false;
        this.isClose=false;
    }
}

export default CellClass;