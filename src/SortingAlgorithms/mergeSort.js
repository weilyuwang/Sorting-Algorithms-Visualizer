export function mergeSort(array) {
    if (array.length <= 1) return array;
    const auxArray = array.slice(); // auxiliary array
    mergeSortHelper(array, 0, array.length - 1, auxArray);
    return array;
}

function mergeSortHelper(mainArray, startIndex, endIndex, auxArray) {
    if (startIndex >= endIndex) return;
    const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    // sort first half
    mergeSortHelper(mainArray, startIndex, midIndex, auxArray);

    // sort second half
    mergeSortHelper(mainArray, midIndex + 1, endIndex, auxArray);

    // merge
    merge(mainArray, startIndex, midIndex, endIndex, auxArray);
}

function merge(mainArray, startIndex, midIndex, endIndex, auxArray) {
    let i = startIndex; // start index of the first half
    let j = midIndex + 1; // start index of the second half

    // copy mainArray to auxArray
    for (let k = startIndex; k <= endIndex; k++) {
        auxArray[k] = mainArray[k];
    }

    // merge back to mainArray
    for (let k = startIndex; k <= endIndex; k++) {
        if (i > midIndex) {
            // left half exhausted
            mainArray[k] = auxArray[j];
            j++;
        } else if (j > endIndex) {
            // right half exhausted
            mainArray[k] = auxArray[i];
            i++;
        } else if (auxArray[i] < auxArray[j]) {
            mainArray[k] = auxArray[i];
            i++;
        } else {
            mainArray[k] = auxArray[j];
            j++;
        }
    }
}
