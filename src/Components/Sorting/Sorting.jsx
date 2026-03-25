import React, { useCallback, useEffect, useRef, useState } from "react";
import SortingNavBar from "./SortingNavBar";
import SortingGraph from "./SortingGraph";
function Sorting() {
    let [noOfElement, setNoOfElement] = useState(10);
    let [array, setArray] = useState([5, 10, 30, 20, 40]);
    let [algo, setAlgo] = useState(null);
    let [speed, setSpeed] = useState(0.5);
    let speedRef = useRef(speed);
    let [select, setSelect] = useState({ num1: null, num2: null, sorted: [] })

    let time = useRef(0);

    const generate = useCallback(() => {

        let arr = new Array(Math.floor(Math.random() * 50)).fill(0).map((e) => Math.floor(Math.random() * 100))
        setArray([...arr])

        setSelect(
            {
                num1: null,
                num2: null,
                sorted: []
            })
    }, [])

    const sleep = () => new Promise((res) => setTimeout(() => { res() }, speedRef.current * 1000))

    const bubbleSort = useCallback(async (arr) => {

        var i, j, temp;
        var n = arr.length;
        let sortedArr = [];
        var swapped;
        for (i = 0; i < n - 1; i++) {
            swapped = false;
            for (j = 0; j < n - i - 1; j++) {

                setSelect((prev) => { return { ...prev, num1: j, num2: j + 1 } })
                await sleep()
                if (arr[j] > arr[j + 1]) {

                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
                setArray([...arr])

            }

            sortedArr.push(arr.length - i - 1);

            setSelect(prev => ({
                num1: null,
                num2: null,
                sorted: [...sortedArr]
            }));
            if (!swapped) {
                let remaining = Array.from({length:arr.length-i},(_,k)=>k)
                setSelect(prev => ({
                    num1: null,
                    num2: null,
                    sorted: [...sortedArr, ...remaining]
                }));
            }

        }

    }, [array])


    

    const sort = useCallback(() => {
        switch (algo) {
            case "bubble": bubbleSort([...array])
                break;
            case "insertion": console.log("merge")
                break;
            default:
        }
    }, [array, algo, select])


    useEffect(() => {

        let array = new Array(parseInt(noOfElement)).fill(0).map((e) => Math.floor(Math.random() * 100))
        setArray([...array])
        setSelect(
            {
                num1: null,
                num2: null,
                sorted: []
            })

    }, [noOfElement])


    useEffect(() => {
        if (algo === null || algo === undefined) return;
        sort(algo)
    }, [algo])


    useEffect(() => {
        speedRef.current = speed;
    }, [speed])


    return <div>
        <SortingNavBar noOfElement={setNoOfElement} generate={generate} sort={sort} setAlgo={setAlgo} setSpeed={setSpeed} />
        <div>
            <ul id="sorting-middle">
                <ul>
                    <li>Visualizing</li>
                    <li>{algo}</li>
                </ul>
                <ul>
                    <li>Algo Speed</li>
                    <li>{speed}</li>
                </ul>
                <ul>
                    <li>Initial Element</li>
                    <li>Sorted Element</li>
                </ul>
                <ul>
                    <li>Swap Element</li>
                    <li>Iterating Element</li>
                </ul>
            </ul>
        </div>
        <SortingGraph array={[...array]} select={select} />

    </div>
}

export default Sorting;