import swap from "./swap";
import time from "./time";


async function merge(arr, setArray, setSelect, speedRef, low, mid, high) {
    let tempArr = [];
    let left = low;
    let right = mid + 1;

    while (left <= mid && right <= high) {
        setSelect((prev) => { return { ...prev, num1: left, num2: right } })

        if (arr[left] <= arr[right]) {
            tempArr.push(arr[left])
            left++;
        }
        else {
            tempArr.push(arr[right])
            right++;
        }

        await time(speedRef.current)
   
        setSelect((prev) => { return { ...prev, num1: null, num2: null } })

    }

    while (left <= mid) {
        tempArr.push(arr[left])
        left++;
    }
    while (right <= high) {
        tempArr.push(arr[right])
        right++;
    }

    return tempArr;
}

async function mergeSort(arr, setArray, setSelect, speedRef, low, high) {
    
    let sortedArr =[];

    if (low >= high) return;

    let mid = Math.floor((low + high) / 2);

    await mergeSort(arr, setArray, setSelect, speedRef, low, mid);
    await mergeSort(arr, setArray, setSelect, speedRef, mid + 1, high);

    let newArray = await merge(arr, setArray, setSelect, speedRef, low, mid, high);

    for (let i = low; i <= high; i++) {
        setSelect((prev) => ({ ...prev, num1: i, num2: i - low }));
        arr[i] = newArray[i - low]
        setSelect((prev) => { return { ...prev, num1: i } })
        await time(speedRef.current)
        sortedArr.push(i)
        setSelect((prev) => { return { ...prev, num1: null, num2: null , sorted:[...sortedArr]} })
        
    }

}

export default mergeSort;