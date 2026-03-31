import swap from "./swap";
import time from "./time";

async function findPivot(arr, setSelect, speedRef, low, high) {
    let pivotValue = arr[low];
    let i = low;
    let j = high;

    setSelect((prev) => { return { ...prev, pivot: low } })
    while (i < j) {

        while (i <= high && arr[i] <= pivotValue) {
            setSelect((prev) => { return { ...prev, num1: i, num2: j } })

            i++;
            await time(speedRef.current);
        }

        while (j >= low && arr[j] > pivotValue) {
            setSelect((prev) => { return { ...prev, num1: i, num2: j } })

            j--;
            await time(speedRef.current);
        }

        if (i < j) {
            swap(arr, i, j);
            await time(speedRef.current);
        }
    }

    
    swap(arr, j, low);
    return j;
}

async function quickSort(arr, sortedArr, setSelect, speedRef, low, high) {
    if (low < high) {
        let pivotIndex = await findPivot(arr, setSelect, speedRef, low, high);
        sortedArr.push(pivotIndex);

        setSelect((prev)=>{return {...prev, sorted: [...sortedArr]}})
        await quickSort(arr, sortedArr,setSelect, speedRef, low, pivotIndex - 1);
        await quickSort(arr, sortedArr, setSelect, speedRef, pivotIndex + 1, high);
    }

    // move this outside recursion if needed
    if (low === 0 && high === arr.length - 1) {
        setSelect((prev) => ({
            ...prev,
            num1: null,
            num2: null,
            pivot: null,
            sorted: Array.from({ length: arr.length }, (_, i) => i) 
        }));
    }
}

export default quickSort;