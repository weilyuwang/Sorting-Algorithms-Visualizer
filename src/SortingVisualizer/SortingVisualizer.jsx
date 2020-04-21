import React from "react";
import "./SortingVisualizer.css";
import * as SortingAlgorithms from "../SortingAlgorithms/sortingAlgorithms";

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const arraysAreEqual = (arrayOne, arrayTwo) => {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
};

class SortingVisualizer extends React.Component {
    constructor() {
        super();
        this.state = {
            array: [],
        };
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 300; i++) {
            array.push(randomIntFromInterval(5, 800));
        }
        this.setState({ array: array });
    }

    componentDidMount() {
        this.resetArray();
    }

    mergeSort() {
        // copy and sort using javascript built-in sort()
        const javaScriptSortedArray = this.state.array
            .slice()
            .sort((a, b) => a - b);
        const sortedArray = SortingAlgorithms.mergeSort(this.state.array);
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        className="array-bar"
                        key={index}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
                <button onClick={() => this.resetArray()}>
                    Generate New Array
                </button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }
}

export default SortingVisualizer;
