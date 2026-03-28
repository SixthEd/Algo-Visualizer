import swap from "../SortingAlgo/swap"
import time from "../SortingAlgo/time"
const bubbleSort = async (arr, setArray, setSelect, speedRef) => {

    let n = arr.length;
    let sortedArr = [];

    for (let i = n - 1; i >= 1; i--) {
        let isSwapped = false

        for (let j = 0; j <= i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                isSwapped = true;

                //swap bar color added
                setSelect((prev) => { return { ...prev, num1: j, num2: j + 1 } });

                //add time to see animation delay
                await time(speedRef.current)

                //swap pipes
                swap(arr, j, j + 1);

            }

        }

        // add sorted element
        sortedArr.push(i);

        setSelect((prev) => { return { ...prev, num1: null, num2: null, sorted: [...sortedArr] } })
      
        if (!isSwapped) {
            break;
        }
    }
    setSelect((prev) => { return { ...prev, sorted: Array.from({ length: n }, (_, i) => i) } })

}

export default bubbleSort;