import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getInsertionSortAnimations } from "../SortingAlgorithms/insertionSort";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSort";
import getSelectionSortAnimations from "../SortingAlgorithms/selectionSort";
import getBubbleSortAnimations from "../SortingAlgorithms/bubbleSort";
import {
    Button,
    Grid,
    Fab,
    Container,
    Typography,
    Slider,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#878684";

// Sorted Color
const SORTED_COLOR = "#5fcf8a";

// Found smaller val
const FOUND_COLOR = "red";

// Num of bars
const NUM_BARS = 80;

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(10);
    const [isRunning, setIsRunning] = useState(false);

    const resetArray = () => {
        const arrayBars = document.getElementsByClassName("array-bar");
        console.log(arrayBars);

        for (const bar of arrayBars) {
            bar.style.backgroundColor = PRIMARY_COLOR;
        }

        const newArray = [];
        for (let i = 0; i < NUM_BARS; i++) {
            newArray.push(randomIntFromInterval(10, 600));
        }
        setArray(newArray);
        setIsRunning(false);
    };

    useEffect(() => {
        resetArray();
    }, []);

    const mergeSort = () => {
        const arrayCopy = array.slice();
        const animations = getMergeSortAnimations(arrayCopy);
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
    };

    const selectionSort = () => {
        const arrayCopy = array.slice();
        const animations = getSelectionSortAnimations(arrayCopy);
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
            } else if (isFoundSmallest) {
                const [smallestIndex] = animations[i];
                setTimeout(() => {
                    arrayBars[
                        smallestIndex
                    ].style.backgroundColor = FOUND_COLOR;
                }, time);
                time += 500;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = SORTED_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 50;
            }
        }
    };

    const quickSort = () => {
        const arrayCopy = array.slice();
        const animations = getQuickSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        let time = 0;
        for (let i = 0; i < animations.length; i++) {
            const isCompare = animations[i].length === 2;
            const isFinalPosition = animations[i].length === 1;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                    setTimeout(function () {
                        // do second thing
                        arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                        arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                    }, 20);
                }, time);
                time += 40;
            } else if (isFinalPosition) {
                const [index] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.backgroundColor = SORTED_COLOR;
                }, time);
                time += 500;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 50;
            }
        }
    };

    const heapSort = () => {};

    const bubbleSort = () => {
        const arrayCopy = array.slice();
        const animations = getBubbleSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const isCompare = animations[i].length === 2;
            const isSorted = animations[i].length === 1;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                }, i * 30);
            } else if (isSorted) {
                const [index] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.backgroundColor = SORTED_COLOR;
                }, i * 30);
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, i * 30);
            }
        }
    };

    const insertionSort = () => {
        const arrayCopy = array.slice();
        const animations = getInsertionSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            const isCompare = i % 2 === 0;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                }, i * 30);
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, i * 30);
            }
        }
    };

    return (
        <Container>
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: "80px" }}
                    spacing={3}
                >
                    <Grid item>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => resetArray()}
                        >
                            <RefreshIcon fontSize="large" />
                        </Fab>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning}
                            onClick={() => {
                                setIsRunning(true);
                                insertionSort();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Insertion Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning}
                            onClick={() => {
                                setIsRunning(true);
                                selectionSort();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Selection Sort
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isRunning}
                            onClick={() => {
                                setIsRunning(true);
                                bubbleSort();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Bubble Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning}
                            onClick={() => {
                                setIsRunning(true);
                                mergeSort();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Merge Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning}
                            onClick={() => {
                                setIsRunning(true);
                                quickSort();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Quick Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning}
                            onClick={() => {
                                setIsRunning(true);
                                heapSort();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Heap Sort
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography id="disabled-slider" gutterBottom>
                            Speed
                        </Typography>
                        <Slider
                            disabled={isRunning}
                            defaultValue={40}
                            max={100}
                            min={10}
                            onChange={(event, value) => setSpeed(value)}
                        />
                    </Grid>
                </Grid>
            </div>

            <div
                style={{
                    marginTop: "100px",
                }}
            >
                {array.map((value, index) => (
                    <div
                        className="array-bar"
                        key={index}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
        </Container>
    );
};

export default SortingVisualizer;
