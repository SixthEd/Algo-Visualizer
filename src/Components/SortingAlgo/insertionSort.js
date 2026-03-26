import time from "../SortingAlgo/time"

const insertionSort = async (arr, setArray, setSelect, speedRef) => {
    let n = arr.length;
    let sortedArr = [];
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        setSelect((prev) => { return { ...prev, num1: i, num2: j } })

        await time(speedRef.current)

        while (j >= 0 && arr[j] > key) {
            setSelect((prev) => ({
                ...prev,
                num1: j,
                num2: j + 1,
            }));
            await time(speedRef.current)

            arr[j + 1] = arr[j];

            setArray([...arr])

            j--;
        }
        arr[j + 1] = key;
        sortedArr.push(i);
        setSelect((prev) => { return { ...prev, sorted: [...sortedArr] } })

        setSelect((prev) => { return { ...prev, num1: null, num2: null } })

    }
    setSelect((prev) => { return { ...prev, num1: null, num2: null, sorted: Array.from({ length: n }, (_, i) => i) } })

}

export default insertionSort;