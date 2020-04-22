// TODO: make merge sort algorithm space efficient
// export const mergeSort = (array) => {
//     if (array.length === 1) return array;
//     const middleIndex = Math.floor(array.length / 2);
//     // merge sort the first half
//     const firstHalf = mergeSort(array.slice(0, middleIndex));

//     // merge sort the second half
//     const secondHalf = mergeSort(array.slice(middleIndex));

//     // merge two halves into the result sorted array
//     const sortedArray = [];

//     let i = 0,
//         j = 0;
//     while (i < firstHalf.length && j < secondHalf.length) {
//         if (firstHalf[i] < secondHalf[j]) {
//             sortedArray.push(firstHalf[i++]);
//         } else {
//             sortedArray.push(secondHalf[j++]);
//         }
//     }

//     // if anything left, append to the back of the sorted array in order
//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);

//     return sortedArray;
// };

export function getMergeSortAnimations(array) {
    const animations = [];

    if (array.length <= 1) return array;
    const auxArray = array.slice(); // auxiliary array

    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);

    return animations;
}

function mergeSortHelper(
    mainArray,
    startIndex,
    endIndex,
    auxArray,
    animations
) {
    if (startIndex >= endIndex) return;
    const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    // sort first half
    mergeSortHelper(mainArray, startIndex, midIndex, auxArray, animations);

    // sort second half
    mergeSortHelper(mainArray, midIndex + 1, endIndex, auxArray, animations);

    // merge
    merge(mainArray, startIndex, midIndex, endIndex, auxArray, animations);
}

// function merge(
//     mainArray,
//     startIndex,
//     midIndex,
//     endIndex,
//     auxArray,
//     animations
// ) {
//     let i = startIndex; // start index of the first half
//     let j = midIndex + 1; // start index of the second half

//     // copy mainArray to auxArray
//     for (let k = startIndex; k <= endIndex; k++) {
//         auxArray[k] = mainArray[k];
//     }

//     // merge back to mainArray
//     for (let k = startIndex; k <= endIndex; k++) {
//         if (i > midIndex) {
//             // left half exhausted
//             animations.push([j, j]);
//             animations.push([j, j]);
//             animations.push([k, auxArray[j]]);
//             mainArray[k] = auxArray[j];
//             j++;
//         } else if (j > endIndex) {
//             // right half exhausted
//             animations.push([i, i]);
//             animations.push([i, i]);
//             animations.push([k, auxArray[i]]);
//             mainArray[k] = auxArray[i];
//             i++;
//         } else if (auxArray[i] < auxArray[j]) {
//             animations.push([i, j]);
//             animations.push([i, j]);
//             animations.push([k, auxArray[i]]);
//             mainArray[k] = auxArray[i];
//             i++;
//         } else {
//             animations.push([i, j]);
//             animations.push([i, j]);
//             animations.push([k, auxArray[j]]);
//             mainArray[k] = auxArray[j];
//             j++;
//         }
//     }
// }

function merge(
    mainArray,
    startIndex,
    midIndex,
    endIndex,
    auxArray,
    animations
) {
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
            animations.push([j, j]);
            animations.push([k, auxArray[j]]);
            mainArray[k] = auxArray[j];
            j++;
        } else if (j > endIndex) {
            // right half exhausted
            animations.push([i, i]);
            animations.push([k, auxArray[i]]);
            mainArray[k] = auxArray[i];
            i++;
        } else if (auxArray[i] < auxArray[j]) {
            animations.push([i, j]);
            animations.push([k, auxArray[i]]);
            mainArray[k] = auxArray[i];
            i++;
        } else {
            animations.push([i, j]);
            animations.push([k, auxArray[j]]);
            mainArray[k] = auxArray[j];
            j++;
        }
    }
}
