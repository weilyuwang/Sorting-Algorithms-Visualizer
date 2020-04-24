const getQuickSortAnimations = (array) => {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
};

const quickSortHelper = (array, l, r, animations) => {
    if (r <= l) return array;
    const pivotIndex = partition(array, l, r, animations);
    quickSortHelper(array, l, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, r, animations);
};

const partition = (array, l, r, animations) => {
    const pivot = array[l];
    let i = l + 1;
    for (let j = l + 1; j <= r; j++) {
        animations.push([i, j]);
        if (array[j] < pivot) {
            animations.push([i, array[j], j, array[i]]);
            swap(array, i, j);
            i++;
        }
    }
    // now array[i] >= pivot
    // so swap pivot with array[i-1] which is the last number that is less than pivot
    animations.push([l, array[i - 1], i - 1, array[l]]);
    animations.push([i - 1]);
    swap(array, l, i - 1);
    // return index of pivot
    return i - 1;
};

const swap = (array, i, j) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

export default getQuickSortAnimations;
