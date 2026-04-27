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
        this.previousRow=null;
        this.previousCol=null;
        this.isFinalPath=false;
    }
}

export default CellClass;