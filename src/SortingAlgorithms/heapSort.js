const getHeapSortAnimations = (array) => {
    const animations = [];
    buildMaxHeap(array, animations);
    for (let i = array.length - 1; i > 0; i--) {
        animations.push([0, array[i], i, array[0], 0]);
        swap(array, i, 0); // swap the current largest element to back
        sink(array, 0, i - 1, animations); // sink & keep the max-heap order
    }
    return animations;
};

const buildMaxHeap = (array, animations) => {
    const lastElementIndex = array.length - 1;
    // get last parent's index
    const parent = Math.floor((lastElementIndex - 1) / 2);
    for (let i = parent; i >= 0; i--) {
        sink(array, i, lastElementIndex, animations);
    }
};

const sink = (heap, start, end, animations) => {
    let childOne = start * 2 + 1;
    while (childOne <= end) {
        const childTwo = start * 2 + 2 <= end ? start * 2 + 2 : -1;
        let childToSwap;
        if (childTwo !== -1 && heap[childTwo] > heap[childOne]) {
            childToSwap = childTwo;
        } else {
            childToSwap = childOne;
        }

        // check if not in order - swap
        // else if already in order - return
        if (heap[childToSwap] > heap[start]) {
            animations.push([start, childToSwap]);
            animations.push([
                start,
                heap[childToSwap],
                childToSwap,
                heap[start],
            ]);
            swap(heap, childToSwap, start);
            start = childToSwap;
            childOne = start * 2 + 1;
        } else {
            return;
        }
    }
};

const swap = (array, i, j) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

export default getHeapSortAnimations;
