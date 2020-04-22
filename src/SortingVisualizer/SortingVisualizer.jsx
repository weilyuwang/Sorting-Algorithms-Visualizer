import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getInsertionSortAnimations } from "../SortingAlgorithms/insertionSort";

import getSelectionSortAnimations from "../SortingAlgorithms/selectionSort";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#878684";

// Sorted Color
const SORTED_COLOR = "#5fcf8a";

// Found smaller val
const FOUND_COLOR = "red";

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({ array: array });
    }

    componentDidMount() {
        this.resetArray();
    }

    mergeSort() {
        const { array } = this.state;
        const animations = getMergeSortAnimations(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const isCompare = i % 2 === 0;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                }, i * 50);
            } else {
                const [index1, index2] = animations[i - 1];
                const [index, newHeight] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.height = `${newHeight}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, i * 50);
            }
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    // Working on this
    selectionSort() {
        const { array } = this.state;
        const animations = getSelectionSortAnimations(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        let time = 0;
        for (let i = 0; i < animations.length; i++) {
            const isCompare = animations[i].length === 2;
            const isFoundSmallest = animations[i].length === 1;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    // do first
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;

                    setTimeout(function () {
                        // do second thing
                        arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                    }, 20);
                }, time);
                time += 40;
                console.log(time);
            } else if (isFoundSmallest) {
                const [smallestIndex] = animations[i];
                setTimeout(() => {
                    arrayBars[
                        smallestIndex
                    ].style.backgroundColor = FOUND_COLOR;
                }, time);
                time += 500;
                console.log(time);
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = SORTED_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 50;
                console.log(time);
            }
        }
    }

    // Done
    insertionSort() {
        const { array } = this.state;
        const animations = getInsertionSortAnimations(array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const isCompare = i % 2 === 0;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                }, i * 50);
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, i * 50);
            }
        }
    }

    render() {
        const { array } = this.state;
        return (
            <>
                <div className="array-container">
                    {array.map((value, index) => (
                        <div
                            className="array-bar"
                            key={index}
                            style={{ height: `${value}px` }}
                        ></div>
                    ))}
                </div>
                <div>
                    <button onClick={() => this.resetArray()}>
                        Generate New Array
                    </button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.insertionSort()}>
                        Insertion Sort
                    </button>
                    <button onClick={() => this.selectionSort()}>
                        Selection Sort
                    </button>
                    <button onClick={() => this.bubbleSort()}>
                        Bubble Sort
                    </button>
                </div>
            </>
        );
    }
}

export default SortingVisualizer;
