import time from "../SortingAlgo/time"
import swap from "./swap";

const insertionSort = async (arr, setArray, setSelect, speedRef) => {
    // let n = arr.length;
    // let sortedArr = [];
    // for (let i = 1; i < n; i++) {
    //     let key = arr[i];
    //     let j = i - 1;
    //     setSelect((prev) => { return { ...prev, num1: i, num2: j } })

    //     await time(speedRef.current)

    //     while (j >= 0 && arr[j] > key) {
    //         setSelect((prev) => ({
    //             ...prev,
    //             num1: j,
    //             num2: j + 1,
    //         }));
    //         await time(speedRef.current)

    //         arr[j + 1] = arr[j];

    //         setArray([...arr])

    //         j--;
    //     }
    //     arr[j + 1] = key;
    //     sortedArr.push(i);
    //     setSelect((prev) => { return { ...prev, sorted: [...sortedArr] } })

    //     setSelect((prev) => { return { ...prev, num1: null, num2: null } })

    // }

    let n= arr.length;
    let sortedArr = [];

    for(let i=0; i<=n-1; i++)
    {
        let j=i;
        while(j>0 && arr[j-1]>arr[j])
        {
            //add color on swap elements

            setSelect((prev)=>{return {...prev, num1: j-1, num2: j}});

            //swap element
            swap(arr, j-1, j);

            await time(speedRef.current);
            j--;

        }
        
        sortedArr.push(i);

        setSelect((prev)=>{return {...prev ,num1: null, num2: null, sorted:[...sortedArr]}})
    }

    setSelect((prev) => { return { ...prev,  sorted: Array.from({ length: n }, (_, i) => i) } })

}

export default insertionSort;