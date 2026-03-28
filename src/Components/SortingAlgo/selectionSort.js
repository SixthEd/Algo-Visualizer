
import swap from "../SortingAlgo/swap"
import time from "../SortingAlgo/time"

const selectionSort = async (arr, setArray, setSelect, speedRef) => {

    let n = arr.length;
    let sortedArr = [];

    for (let i = 0; i <= n - 1; i++) {
        let minIndex = i;

        for (let j = i; j <= n - 1; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }

        //change color of swap bar
        setSelect((prev) => { return { ...prev, num1: i, num2: minIndex } })

        //swap array 
        swap(arr, i, minIndex);

        //add time to see animation
        await time(speedRef.current)

        //after change to see swap change in the last
        // setArray([...arr]);

        sortedArr.push(i)

        //update sorted array and bar color
        setSelect((prev)=>{return {...prev , num1:null, num2:null,sorted:[...sortedArr]}})

    }
    //add already sorted bar 
    setSelect((prev) => { return { ...prev, num1: null, num2: null, sorted: Array.from({ length: n }, (_, i) => i)} })

    return;
}

export default selectionSort;