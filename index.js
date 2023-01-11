import { selectionSort } from "./sortArray.js";

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}
class Tree {
	constructor(arr) {
		this.arr = selectionSort(arr); // a function from other file which also removes the duplicates
		this.root = null;
	}
	buildTree(arr = this.arr, start = 0, end = arr.length - 1) {
		if (start > end) {
			return null;
		}
		console.log(arr);
		let middleIndex = parseInt((start + end) / 2);
		// console.log(middleIndex);
		let root = new Node(arr[middleIndex]);
		root.left = this.buildTree(arr.slice(0, middleIndex));
		root.right = this.buildTree(arr.slice(middleIndex + 1, arr.length));

		return root;
	}

	prettyPrint(node, prefix = "", isLeft = true) {
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	}
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(arr);

let bSTree = new Tree(arr);

// console.log(bSTree.buildTree());
bSTree.prettyPrint(bSTree.buildTree());
