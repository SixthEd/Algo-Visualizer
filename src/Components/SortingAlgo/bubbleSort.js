import swap from "../SortingAlgo/swap"
import time from "../SortingAlgo/time"
const bubbleSort = async (arr, setArray, setSelect, speedRef) => {

    var i, j, temp;
    var n = arr.length;
    let sortedArr = [];
    var swapped;
    for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                setSelect((prev) => { return { ...prev, num1: j, num2: j + 1 } })
                swapped = true;
                await time(speedRef.current);
                setSelect((prev) => { return { ...prev, num1: null, num2: null } })
            }



        }
        sortedArr.push(arr.length - i - 1);
        setSelect((prev) => ({
            ...prev,
            sorted: [...sortedArr],
        }));    
        if (!swapped) break;
    }
    setSelect((prev) => { return { ...prev, num1: null, num2: null, sorted: Array.from({ length: n }, (_, i) => i) } })
}

export default bubbleSort;