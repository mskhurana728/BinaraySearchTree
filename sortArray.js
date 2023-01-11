function removeDuplicates(arr) {
	let newArr = arr.filter((item, index) => arr.indexOf(item) === index);
	return newArr;
}
function swap(arr, indexOfFirst, indexOfSecond) {
	let temp = arr[indexOfFirst];
	arr[indexOfFirst] = arr[indexOfSecond];
	arr[indexOfSecond] = temp;
	return arr;
}
function findMinIndex(arr, startingIndex) {
	// console.log(arr);
	let minIndex = startingIndex;
	let minValue = arr[startingIndex];
	//here i set i =  startIndex +1 so that it should start looking for min value from the next element
	for (let i = startingIndex + 1; i < arr.length; i++) {
		if (minValue > arr[i]) {
			minValue = arr[i];
			minIndex = i;
		}
	}
	return minIndex;
}
export function selectionSort(arr) {
	// console.log(arr);
	arr = removeDuplicates(arr);
	// console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		let minIndex = findMinIndex(arr, i);
		// console.log(arr[minIndex]);
		arr = swap(arr, i, minIndex);
	}
	// console.log(arr);
	return arr;
}
