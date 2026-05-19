class Node {
    constructor(data, x, y, index,gap) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.index = index;
        this.leftNode = null;
        this.rightNode = null;
        this.swap = false;
        this.compare = false;
        this.gap=gap;
        this.ctx=null;
    }
}


export default Node;