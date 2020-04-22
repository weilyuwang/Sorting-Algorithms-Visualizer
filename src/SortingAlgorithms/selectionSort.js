const selectionSort = (array) => {
    const animations = [];

    for (let i = 0; i < array.length - 1; i++) {
        let smallestIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[smallestIndex] > array[j]) smallestIndex = j;
        }
        swap(array, i, smallestIndex);
    }

    return array;
};

const swap = (array, i, j) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

export default selectionSort;
