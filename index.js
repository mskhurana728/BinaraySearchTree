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
		console.log(`Adding ${value} to the tree`);
		// we will only add the new nodes at the leaf node we will not change the location of old nodes
		if (!this.root) {
			return null;
		}
		// console.log(this.root);
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
		console.log(`Deleting ${value} from the tree`);

		if (!this.root) {
			return null;
		}

		let temp = this.root;
		let tempFather = null;
		if (temp.data == value) {
			// if root is the node we want to delete
			tempFather = temp;
		}
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
		// console.log();

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
			// console.log(tempFather);
		} else {
			console.log(temp);
			let tempLeft = temp.left;
			let tempRight = temp.right;
			// when a node has right and left node which we want to delete then we are going to find the next biggest
			// node
			//then next biggest node will be in the right of node which we want to delete
			let nextBiggestNode = temp.right;
			// and in the right we will go far left till then when there is no left node
			while (nextBiggestNode.left) {
				nextBiggestNode = nextBiggestNode.left;
			}
			//then we are going to store next biggest node value
			let nextBiggestNodeData = nextBiggestNode.data;
			// we have to assign the nodes in the right of next biggest node to the father of it after delete that node

			this.delete(nextBiggestNode.data);
			console.log(nextBiggestNodeData);
			console.log(temp);
			this.delete(nextBiggestNode.data);

			temp.data = nextBiggestNodeData;
			temp.left = tempLeft;
		}
	}
	find(value) {
		let temp = this.root;
		while (temp.data != value) {
			if (temp.data >= value) {
				if (!temp.left) {
					return null;
				}

				temp = temp.left;
			} else {
				if (!temp.right) {
					return null;
				}

				temp = temp.right;
			}
		}
		return temp;
	}
	levelOrder(func = null) {
		let temp = this.root;
		let index = 0;
		console.log(temp, this.root);
		if (temp == null) {
			return null;
		}
		let queue = [temp.data];
		while (temp) {
			if (temp.left) {
				let tempLeftValue = temp.left.data;
				// console.log(tempLeftValue);
				queue.push(tempLeftValue);
			}
			if (temp.right) {
				let tempRightValue = temp.right.data;
				// console.log(tempRightValue);
				queue.push(tempRightValue);
			}
			// queue = queue.push(temp.right);
			index++;
			let value = queue[index];
			temp = this.find(value);
		}
		console.log(queue);
		if (func) {
			while (queue) {
				let value = queue.shift();
				let node = this.find(value);
				func(node);
			}
		} else {
			return queue;
		}
		return queue;
	}

	inOrder(func, node = this.root, result = []) {
		if (!node) {
			return null;
		}
		if (!func) {
			func = null;
		}
		let temp = node;
		this.inOrder(func, temp.left, result);
		if (func) {
			func(node);
		} else {
			result.push(node.data);
			// console.log(node.data);
		}
		this.inOrder(func, temp.right, result);
		return result;
	}
	preOrder(func, node = this.root, result = []) {
		if (!node) {
			return null;
		}
		if (!func) {
			func = null;
		}
		let temp = node;
		if (func) {
			func(node);
		} else {
			result.push(node.data);

			// console.log(node.data);
		}
		this.preOrder(func, temp.left, result);
		this.preOrder(func, temp.right, result);
		return result;
	}
	postOrder(func, node = this.root, result = []) {
		if (!node) {
			return null;
		}
		if (!func) {
			func = null;
		}
		let temp = node;
		this.postOrder(func, temp.left, result);
		this.postOrder(func, temp.right, result);
		if (func) {
			func(node);
		} else {
			result.push(node.data);

			// console.log(node.data);
		}
		return result;
	}
	height(node) {
		//it accepts a node and return its height
		if (!node) {
			return null;
		}
		let height = 0;
		while (node.left || node.right) {
			if (node.left) {
				node = node.left;
			} else {
				node = node.right;
			}
			height++;
		}
		return height;
	}
	depth(node) {
		let temp = this.root;
		let value = node.data;
		let depth = 0;
		while (temp != node) {
			if (temp.data >= value) {
				if (!temp.left) {
					return null;
				}

				temp = temp.left;
				depth++;
			} else {
				if (!temp.right) {
					return null;
				}

				temp = temp.right;
				depth++;
			}
		}
		return depth;
	}
	isBalanced(node = this.root) {
		if (!node) {
			return true;
		}
		let result = true;
		result = this.isBalanced(node.left);
		result = this.isBalanced(node.right);

		let heightLeftSubTree = this.height(node.left);
		let heightRightSubTree = this.height(node.right);
		let difference = Math.abs(heightLeftSubTree - heightRightSubTree);
		// console.log(difference);

		if (difference <= 1 && result == true) {
			return result;
		} else {
			result = false;
			return result;
		}
	}
	reBalance(node = this.root) {
		if (this.isBalanced(node) == true) {
			return;
		}
		if (!node) {
			return;
		}
		let inOrderList = this.inOrder();
		// console.log(inOrderList);
		this.root = this.buildTree(inOrderList);
	}
}
//Driver Script
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bSTree = new Tree(arr);
bSTree.buildTree();
console.log("Is the tree balanced: " + bSTree.isBalanced());
console.log("PreOrder: " + bSTree.preOrder());
console.log("InOrder: " + bSTree.inOrder());
console.log("PostOrder: " + bSTree.postOrder());
bSTree.insert(101);
bSTree.insert(103);
bSTree.insert(125);
bSTree.insert(136);
console.log("Is the tree balanced: " + bSTree.isBalanced());
console.log("Re-balancing the Tree ");
bSTree.reBalance();
console.log("Is the tree balanced: " + bSTree.isBalanced());
console.log("PreOrder: " + bSTree.preOrder());
console.log("InOrder: " + bSTree.inOrder());
console.log("PostOrder: " + bSTree.postOrder());

bSTree.prettyPrint(bSTree.root);

//double checkers while creating the code :)
// // console.log(arr);
// console.log(bSTree.buildTree());
// bSTree.prettyPrint(bSTree.buildTree());
// // bSTree.insert(9);
// // bSTree.insert(6);
// // bSTree.delete(2);
// // bSTree.delete(23);
// // bSTree.delete(6345);
// // bSTree.delete(5);

// // bSTree.delete(8);
// // console.log(bSTree.root);
// // bSTree.delete(67);
// // bSTree.delete(4);
// // bSTree.delete(8);
// // bSTree.delete(5);
// // bSTree.delete(324);
// // bSTree.delete(9);
// // bSTree.delete(23);
// // console.log(bSTree.find(67));
// // console.log(bSTree.find(3));
// // console.log(bSTree.find(5));
// function consoleFunc(node) {
// 	console.log(node.data);
// }
// // console.log(bSTree.levelOrder(consoleFunc));
// // console.log(bSTree.preOrder());
// // // console.log(bSTree.postOrder());
// // console.log(bSTree.height(bSTree.find(67)));
// // console.log(bSTree.height(bSTree.find(4)));
// // console.log(bSTree.height(bSTree.find(8)));
// // console.log(bSTree.depth(bSTree.find(8)));
// // console.log(bSTree.depth(bSTree.find(67)));
// // console.log(bSTree.depth(bSTree.find(7)));
// console.log(bSTree.isBalanced());
// console.log(bSTree.isBalanced());

// // bSTree.delete(1);
// // bSTree.delete(11); // to check if its working if the value is not in the bts
