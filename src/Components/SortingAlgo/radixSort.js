import time from "./time";

function noOfDigits(num) {

    if (num === 0) return 1;

    let count = 0;

    while (num) {
        count++;
        num = Math.floor(num / 10)
    }
    return count;
}

function digitOnPlace(num, place) {
    return Math.floor(num / Math.pow(10, place)) % 10;
}

async function radixSort(arr, setArray, setSelect, speedRef) {
    let digitMax = Math.max(...arr);

    let totalDigits = noOfDigits(digitMax);

    for (let d = 0; d < totalDigits; d++) {
        let bucket = new Array(10).fill(0).map(() => []);

        for (let i = 0; i < arr.length; i++) {
            let num = arr[i];
            setSelect((prev)=>{return{...prev, pivot:i}});

            await time(speedRef.current);

            let digit = digitOnPlace(num, d);
            bucket[digit].push(num);
            setSelect((prev)=>{return{...prev, pivot:null}})

        }
        arr = [].concat(...bucket)
        setArray([...arr])
    }
    setArray([...arr])
    setSelect((prev) => { return { ...prev,  sorted: Array.from({ length: arr.length }, (_, i) => i) } })

}

export default radixSort;