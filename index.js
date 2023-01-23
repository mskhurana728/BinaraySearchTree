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
		// console.log(arr);
		let middleIndex = parseInt((start + end) / 2);
		// console.log(middleIndex);
		let root = new Node(arr[middleIndex]);
		root.left = this.buildTree(arr.slice(0, middleIndex));
		root.right = this.buildTree(arr.slice(middleIndex + 1, arr.length));
		this.root = root;
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
	insert(value) {
		// we will only add the new nodes at the leaf node we will not change the location of old nodes
		if (!this.root) {
			return null;
		}
		console.log(this.root);
		let temp = this.root;
		// console.log(value);
		while (temp.left || temp.right) {
			// console.log(JSON.stringify(temp, null, 2));
			if (temp.data >= value) {
				if (!temp.left) {
					//if there left is null then assign the new node otherwise temp is equal to temp.left
					temp.left = new Node(value);
					return temp;
				}
				temp = temp.left;
			} else {
				if (!temp.right) {
					temp.right = new Node(value);

					return temp;
				}
				temp = temp.right;
			}
		}
		if (value > temp.data) {
			temp.right = new Node(value);
		} else {
			temp.left = new Node(value);
		}
		return temp;
	}

	delete(value) {
		if (!this.root) {
			return null;
		}
		let temp = this.root;
		let tempFather = null;
		while (temp.data != value) {
			if (temp.data >= value) {
				if (!temp.left) {
					return null;
				}
				tempFather = temp;
				temp = temp.left;
			} else {
				if (!temp.right) {
					return null;
				}
				tempFather = temp;

				temp = temp.right;
			}
		}
		console.log();

		if (!temp.left && !temp.right) {
			//deleting a leaf just delete the leaf with the node nothing else has to change
			tempFather.left = null;
			tempFather.right = null;
		} else if ((temp.left && !temp.right) || (!temp.left && temp.right)) {
			//deleting a node which has only one child we just have to replace  the node with its child
			if (temp.left) {
				if (tempFather.left == temp) {
					tempFather.left = temp.left;
				} else {
					tempFather.right = temp.left;
				}
			} else if (temp.right) {
				if (tempFather.left == temp) {
					tempFather.left = temp.right;
				} else {
					tempFather.right = temp.right;
				}
			}
		}
	}
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// console.log(arr);

let bSTree = new Tree(arr);
// console.log(bSTree.buildTree());
bSTree.prettyPrint(bSTree.buildTree());
bSTree.insert(9);
bSTree.insert(2);
// bSTree.insert(2);
bSTree.delete(2);
bSTree.delete(23);
bSTree.delete(6345);
bSTree.delete(5);
bSTree.delete(1);

bSTree.prettyPrint(bSTree.root);
console.log(bSTree.root);
