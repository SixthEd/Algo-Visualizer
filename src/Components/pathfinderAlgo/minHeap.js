function minHeap(queue){

    let min=Infinity;
    let index;
    for(let i=0; i<queue.length; i++)
    {
        if(queue[i][0]<min)
        {
            min=queue[i][0]
            index=i;
        }
    }
    return index;
}
export default minHeap;