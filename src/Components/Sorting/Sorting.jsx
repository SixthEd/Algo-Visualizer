import React, { useCallback, useEffect, useRef, useState } from "react";
import SortingNavBar from "./SortingNavBar";
import SortingGraph from "./SortingGraph";
import bubbleSort from "../SortingAlgo/bubbleSort";
import selectionSort from "../SortingAlgo/selectionSort";
import insertionSort from "../SortingAlgo/insertionSort";

function Sorting() {
    let [noOfElement, setNoOfElement] = useState(10);
    let [array, setArray] = useState([5, 10, 30, 20, 40]);
    let [algo, setAlgo] = useState(null);
    let [speed, setSpeed] = useState(0.5);
    let speedRef = useRef(speed);
    let [select, setSelect] = useState({ num1: null, num2: null, sorted: null })

    const generate = useCallback(() => {

        let arr = new Array(Math.floor(Math.random() * 50)).fill(0).map((e) => Math.floor(Math.random() * 100))
        setArray([...arr])
        setSelect({ num1: null, num2: null, sorted: null })
    }, [])






    const sort = useCallback(() => {
        switch (algo) {
            case "bubble": bubbleSort(array, setArray, setSelect, speedRef)
                break;
            case "selection": selectionSort(array, setArray, setSelect, speedRef)
                break;
            case "insertion": insertionSort(array, setArray, setSelect, speedRef)
                break;
            default:
        }
    }, [array, algo])


    useEffect(() => {

        let array = new Array(parseInt(noOfElement)).fill(0).map((e) => Math.floor(Math.random() * 100))
        setArray([...array])

    }, [noOfElement])


    useEffect(() => {
        if (algo === null || algo === undefined) return;
        sort()
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