const selectionSort = (array) => {
    const animations = [];

    for (let i = 0; i < array.length - 1; i++) {
        let smallestIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            animations.push([i, j]);
            if (array[smallestIndex] > array[j]) {
                smallestIndex = j;
            }
        }

        animations.push([smallestIndex]);
        animations.push([i, array[smallestIndex], smallestIndex, array[i]]);
        swap(array, i, smallestIndex);
    }

    return animations;
};

const swap = (array, i, j) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

export default selectionSort;
