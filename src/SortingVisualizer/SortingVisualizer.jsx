import React from "react";
import "./SortingVisualizer.css";

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
        for (let i = 0; i < 300; i++) {
            array.push(randomIntFromInterval(5, 800));
        }
        this.setState({ array: array });
    }

    componentDidMount() {
        this.resetArray();
    }

    mergeSort() {}

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
