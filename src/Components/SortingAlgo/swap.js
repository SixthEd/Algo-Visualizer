function swap(list,a,b)
{
    let temp = list[a];
    list[a]= list[b];
    list[b]=temp;
}

export default swap;