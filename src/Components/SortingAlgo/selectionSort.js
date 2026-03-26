
import swap from "../SortingAlgo/swap"
import time from "../SortingAlgo/time"

const selectionSort= async(arr, setArray, setSelect, speedRef) => {
    let n = arr.length;
    let sortedArr =[]
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap arr[i] and arr[minIndex]
        swap(arr, i, minIndex)
        setSelect((prev) => { return { ...prev, num1: i, num2:  minIndex } })
        await time(speedRef.current)
        setSelect((prev) => { return { ...prev, num1: null, num2: null } })
        sortedArr.push(arr.length - i - 1);
        setSelect((prev) => ({
            ...prev,
            sorted: [...sortedArr],
        }));  
    }
    setSelect((prev) => { return { ...prev, num1: null, num2: null, sorted: Array.from({ length: n }, (_, i) => i)} })
    return arr;
}

export default selectionSort;