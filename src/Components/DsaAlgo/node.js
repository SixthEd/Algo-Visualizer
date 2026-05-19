class Node {
    constructor(data, x, y,gap) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.leftNode = null;
        this.rightNode = null;
        this.swap = false;
        this.compare = false;
        this.gap=gap;
    }
}


export default Node;