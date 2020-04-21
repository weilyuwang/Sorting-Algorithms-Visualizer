// TODO: make merge sort algorithm space efficient
export const mergeSort = (array) => {
    if (array.length === 1) return array;
    const middleIndex = Math.floor(array.length / 2);
    // merge sort the first half
    const firstHalf = mergeSort(array.slice(0, middleIndex));

    // merge sort the second half
    const secondHalf = mergeSort(array.slice(middleIndex));

    // merge two halves into the result sorted array
    const sortedArray = [];

    let i = 0,
        j = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++]);
        }
    }

    // if anything left, append to the back of the sorted array in order
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);

    return sortedArray;
};
