const bubbleSort = (array) => {
    let isSorted = false;
    let counter = 0;
    const N = array.length;
    while (!isSorted) {
        isSorted = true;
        // array[N-counter-1, ........ , N-1] is already sorted
        for (let i = 0; i < N - 1 - counter; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                isSorted = false;
            }
        }
        counter++;
    }
    return array;
};

const swap = (array, i, j) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

export default bubbleSort;
