import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getInsertionSortAnimations } from "../SortingAlgorithms/insertionSort";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#878684";

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

    // mergeSort() {
    //     const { array } = this.state;
    //     const animations = getMergeSortAnimations(array);
    //     for (let i = 0; i < animations.length; i++) {
    //         const arrayBars = document.getElementsByClassName("array-bar");
    //         const isColorChange = i % 3 !== 2;
    //         if (isColorChange) {
    //             const [barOneIndex, barTwoIndex] = animations[i];
    //             const barOneStyle = arrayBars[barOneIndex].style;
    //             const barTowStyle = arrayBars[barTwoIndex].style;

    //             const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

    //             setTimeout(() => {
    //                 barOneStyle.backgroundColor = color;
    //                 barTowStyle.backgroundColor = color;
    //             }, i * 500);
    //         } else {
    //             setTimeout(() => {
    //                 const [barOneIndex, newHeight] = animations[i];
    //                 const barOneStyle = arrayBars[barOneIndex].style;
    //                 barOneStyle.height = `${newHeight}px`;
    //             }, i * 500);
    //         }
    //     }
    // }

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

    selectionSort() {}

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
