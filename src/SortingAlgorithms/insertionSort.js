const getInsertionSortAnimations = (array) => {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            animations.push([j - 1, j]);
            animations.push([j - 1, array[j], j, array[j - 1]]);
            swap(array, j, j - 1);
            j--;
        }
    }

    return animations;
};

const swap = (array, i, j) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

export default getInsertionSortAnimations;
