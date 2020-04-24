import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import getMergeSortAnimations from "../SortingAlgorithms/mergeSort";
import getInsertionSortAnimations from "../SortingAlgorithms/insertionSort";
import getQuickSortAnimations from "../SortingAlgorithms/quickSort";
import getSelectionSortAnimations from "../SortingAlgorithms/selectionSort";
import getBubbleSortAnimations from "../SortingAlgorithms/bubbleSort";
import getHeapSortAnimations from "../SortingAlgorithms/heapSort";
import {
    Button,
    Grid,
    Fab,
    Container,
    Typography,
    Slider,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "#878684";
const SORTED_COLOR = "#5fcf8a";
const FOUND_COLOR = "red";
const NUM_BARS = 95;

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(5);
    const [isRunning, setIsRunning] = useState(false);
    const [canClick, setCanClick] = useState(true);

    const refreshArray = () => {
        resetArrayColor();
        const newArray = [];
        for (let i = 0; i < NUM_BARS; i++) {
            newArray.push(randomIntFromInterval(20, 600));
        }
        setArray(newArray);
        setCanClick(true);
    };

    const resetArrayColor = () => {
        const arrayBars = document.getElementsByClassName("array-bar");

        for (const bar of arrayBars) {
            bar.style.backgroundColor = PRIMARY_COLOR;
        }
    };

    useEffect(() => {
        const resetArray = () => {
            resetArrayColor();
            const newArray = [];
            for (let i = 0; i < NUM_BARS; i++) {
                newArray.push(randomIntFromInterval(20, 600));
            }
            setArray(newArray);
            setIsRunning(false);
            setCanClick(true);
        };
        resetArray();
        console.log("UseEffect: resetArray() called.");
    }, []);

    const mergeSort = () => {
        const arrayCopy = array.slice();
        const animations = getMergeSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        let time = 0;
        for (let i = 0; i < animations.length; i++) {
            const isCompare = animations[i].length === 2;
            const isAppending = animations[i].length === 1;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                    setTimeout(function () {
                        arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                        arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                    }, 40 / speed);
                }, time);
                time += 80 / speed;
            } else if (isAppending) {
                const [index] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.backgroundColor = SECONDARY_COLOR;
                    setTimeout(function () {
                        arrayBars[index].style.backgroundColor = PRIMARY_COLOR;
                    }, 40 / speed);
                }, time);
                time += 80 / speed;
            } else {
                const [index, newHeight] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.height = `${newHeight}px`;
                    arrayBars[index].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 80 / speed;
            }
        }
        setTimeout(() => {
            setIsRunning(false);
        }, time);
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
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;

                    setTimeout(function () {
                        arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                    }, 40 / speed);
                }, time);
                time += 80 / speed;
            } else if (isFoundSmallest) {
                const [smallestIndex] = animations[i];
                setTimeout(() => {
                    arrayBars[
                        smallestIndex
                    ].style.backgroundColor = FOUND_COLOR;
                }, time);
                time += 1000 / speed;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = SORTED_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 80 / speed;
            }
        }
        setTimeout(() => {
            setIsRunning(false);
        }, time);
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
                    }, 40 / speed);
                }, time);
                time += 80 / speed;
            } else if (isFinalPosition) {
                const [index] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.backgroundColor = SORTED_COLOR;
                }, time);
                time += 1000 / speed;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 80 / speed;
            }
        }
        setTimeout(() => {
            setIsRunning(false);
        }, time);
    };

    const heapSort = () => {
        const arrayCopy = array.slice();
        const animations = getHeapSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        let time = 0;
        for (let i = 0; i < animations.length; i++) {
            const isCompare = animations[i].length === 2;
            const isSorted = animations[i].length === 5;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                    setTimeout(function () {
                        arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                        arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                    }, 40 / speed);
                }, time);
                time += 80 / speed;
            } else if (isSorted) {
                const [index1, newHeight1, index2, newHeight2] = animations[i];

                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = FOUND_COLOR;

                    setTimeout(() => {
                        arrayBars[index1].style.height = `${newHeight1}px`;
                        arrayBars[index2].style.height = `${newHeight2}px`;
                        arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                        arrayBars[index2].style.backgroundColor = SORTED_COLOR;
                    }, 400 / speed);
                }, time);
                time += 440 / speed;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 80 / speed;
            }
        }
        setTimeout(() => {
            setIsRunning(false);
        }, time);
    };

    const bubbleSort = () => {
        const arrayCopy = array.slice();
        const animations = getBubbleSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        let time = 0;
        for (let i = 0; i < animations.length; i++) {
            const isCompare = animations[i].length === 2;
            const isSorted = animations[i].length === 1;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                }, time);
                time += 60 / speed;
            } else if (isSorted) {
                const [index] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.backgroundColor = SORTED_COLOR;
                }, time);
                time += 60 / speed;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 60 / speed;
            }
        }
        setTimeout(() => {
            setIsRunning(false);
        }, time);
    };

    const insertionSort = () => {
        const arrayCopy = array.slice();
        const animations = getInsertionSortAnimations(arrayCopy);
        const arrayBars = document.getElementsByClassName("array-bar");
        let time = 0;
        for (let i = 0; i < animations.length; i++) {
            const isCompare = i % 2 === 0;

            if (isCompare) {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[index2].style.backgroundColor = SECONDARY_COLOR;
                }, time);
                time += 60 / speed;
            } else {
                const [index1, newHeight1, index2, newHeight2] = animations[i];
                setTimeout(() => {
                    arrayBars[index1].style.height = `${newHeight1}px`;
                    arrayBars[index2].style.height = `${newHeight2}px`;
                    arrayBars[index1].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[index2].style.backgroundColor = PRIMARY_COLOR;
                }, time);
                time += 60 / speed;
            }
        }
        setTimeout(() => {
            setIsRunning(false);
        }, time);
    };

    return (
        <Container>
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: "40px" }}
                    spacing={3}
                >
                    <Grid item>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => {
                                refreshArray();
                                setCanClick(true);
                            }}
                            disabled={isRunning}
                        >
                            <RefreshIcon fontSize="large" />
                        </Fab>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning || !canClick}
                            onClick={() => {
                                setIsRunning(true);
                                setCanClick(false);
                                insertionSort();
                            }}
                            variant="contained"
                            size="small"
                            style={{ fontWeight: "bold" }}
                        >
                            Insertion Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning || !canClick}
                            onClick={() => {
                                setIsRunning(true);
                                setCanClick(false);
                                selectionSort();
                            }}
                            variant="contained"
                            size="small"
                            style={{ fontWeight: "bold" }}
                        >
                            Selection Sort
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isRunning || !canClick}
                            onClick={() => {
                                setIsRunning(true);
                                setCanClick(false);
                                bubbleSort();
                            }}
                            variant="contained"
                            size="small"
                            style={{ fontWeight: "bold" }}
                        >
                            Bubble Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning || !canClick}
                            onClick={() => {
                                setIsRunning(true);
                                setCanClick(false);
                                mergeSort();
                            }}
                            variant="contained"
                            size="small"
                            style={{ fontWeight: "bold" }}
                        >
                            Merge Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning || !canClick}
                            onClick={() => {
                                setIsRunning(true);
                                setCanClick(false);
                                quickSort();
                            }}
                            variant="contained"
                            size="small"
                            style={{ fontWeight: "bold" }}
                        >
                            Quick Sort
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={isRunning || !canClick}
                            onClick={() => {
                                setIsRunning(true);
                                setCanClick(false);
                                heapSort();
                            }}
                            variant="contained"
                            size="small"
                            style={{ fontWeight: "bold" }}
                        >
                            Heap Sort
                        </Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography
                            id="disabled-slider"
                            style={{ fontWeight: "bold" }}
                        >
                            Speed
                        </Typography>
                        <Slider
                            disabled={isRunning || !canClick}
                            defaultValue={5}
                            max={15}
                            min={1}
                            onChange={(event, value) => setSpeed(value)}
                        />
                    </Grid>
                </Grid>
            </div>

            <div
                style={{
                    height: "600px",
                    marginTop: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                }}
            >
                <Container style={{ alignSelf: "end" }}>
                    {array.map((value, index) => (
                        <div
                            className="array-bar"
                            key={index}
                            style={{ height: `${value}px` }}
                        ></div>
                    ))}
                </Container>
            </div>
        </Container>
    );
};

export default SortingVisualizer;
