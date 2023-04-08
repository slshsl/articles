interface Node {
	name: string;
	value: number;
	itemStyle: {
		color: string;
	};
	children?: Array<Node>;
}

function random(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateNode(count: number): Node {
	const value = random(1, count);
	const name = Math.random().toString(32).slice(2, 7);
	const node = {
		name,
		value,
		itemStyle: {
			color: `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
		}
	};
	return node;
}

function initNodeArr(count: number): Array<Node> {
	let arrTree = [];
	for (let index = 0; index < count; index++) {
		const node = generateNode(count);
		arrTree.push(node);
	}
	return arrTree;
}

function nodeArrToTree(nodeArr: Array<Node>): Node {
	const length = nodeArr.length;
	if (!length) return null;
	const result = JSON.parse(JSON.stringify(nodeArr));
	for (let index = 0; index < length; index++) {
		const leftIndex = (index + 1) * 2 - 1;
		const rightIndex = leftIndex + 1;
		if (leftIndex < length) {
			result[index].children = [];
			result[index].children.push(result[leftIndex]);
		}
		if (rightIndex < length) {
			result[index].children.push(result[rightIndex]);
		}
	}
	return result[0];
}

class MinHeap {
	historyBuffer: Array<Array<Node>> = [];
	nodeArr: Array<Node> = [];
	constructor(nodeArr: Array<Node>, bufferEnable: boolean = true) {
		if (bufferEnable) {
			for (let index = 0; index < nodeArr.length; index++) {
				this.pushWithHistory(nodeArr[index]);
			}
		} else {
			for (let index = 0; index < nodeArr.length; index++) {
				this.push(nodeArr[index]);
			}
		}
	}

	get historyBufferLength() {
		return this.historyBuffer.length;
	}

	get length(): number {
		return this.nodeArr.length;
	}

	pushWithHistory(node: Node) {
		const index = this.length;
		this.nodeArr.push(node);
		this.historyBuffer.push([...this.nodeArr]);
		const upSwapProcess = this.siftUpWithHistory(node, index);
		this.historyBuffer.push(...upSwapProcess);
	}

	popWithHistory() {
		if (this.nodeArr.length === 0) {
			return null;
		}
		const first = this.nodeArr[0];
		const last = this.nodeArr.pop();
		if (last !== first) {
			this.nodeArr[0] = last;
			this.historyBuffer.push([...this.nodeArr]);
			const downSwapProcess = this.siftDownWithHistory(last, 0);
			this.historyBuffer.push(...downSwapProcess);
		} else {
			this.historyBuffer.push([...this.nodeArr]);
		}
		return first;
	}

	siftUpWithHistory(node: Node, i: number) {
		const upSwapProcess = [];
		let index = i;
		while (index > 0) {
			const parentIndex = (index - 1) >>> 1;
			const parent = this.nodeArr[parentIndex];
			if (this.compare(parent, node) > 0) {
				this.nodeArr[parentIndex] = node;
				this.nodeArr[index] = parent;
				index = parentIndex;
				upSwapProcess.push([...this.nodeArr]);
			} else {
				return upSwapProcess;
			}
		}
		return upSwapProcess;
	}

	siftDownWithHistory(node: Node, i: number) {
		const downSwapProcess = [];
		let index = i;
		const length = this.nodeArr.length;
		const halfLength = length >>> 1;
		while (index < halfLength) {
			const leftIndex = (index + 1) * 2 - 1;
			const left = this.nodeArr[leftIndex];
			const rightIndex = leftIndex + 1;
			const right = this.nodeArr[rightIndex];

			if (this.compare(left, node) < 0) {
				if (rightIndex < length && this.compare(right, left) < 0) {
					this.nodeArr[index] = right;
					this.nodeArr[rightIndex] = node;
					index = rightIndex;
				} else {
					this.nodeArr[index] = left;
					this.nodeArr[leftIndex] = node;
					index = leftIndex;
				}
				downSwapProcess.push([...this.nodeArr]);
			} else if (rightIndex < length && this.compare(right, node) < 0) {
				this.nodeArr[index] = right;
				this.nodeArr[rightIndex] = node;
				index = rightIndex;
				downSwapProcess.push([...this.nodeArr]);
			} else {
				return downSwapProcess;
			}
		}
		return downSwapProcess;
	}

	push(node: Node) {
		const index = this.length;
		this.nodeArr.push(node);
		this.siftUp(node, index);
	}

	pop() {
		if (this.nodeArr.length === 0) {
			return null;
		}
		const first = this.nodeArr[0];
		const last = this.nodeArr.pop();
		if (last !== first) {
			this.nodeArr[0] = last;
			this.siftDown(last, 0);
		}
		return first;
	}

	siftUp(node: Node, i: number) {
		let index = i;
		while (index > 0) {
			const parentIndex = (index - 1) >>> 1;
			const parent = this.nodeArr[parentIndex];
			if (this.compare(parent, node) > 0) {
				this.nodeArr[parentIndex] = node;
				this.nodeArr[index] = parent;
				index = parentIndex;
			} else {
				return;
			}
		}
	}

	siftDown(node: Node, i: number) {
		let index = i;
		const length = this.nodeArr.length;
		const halfLength = length >>> 1;
		while (index < halfLength) {
			const leftIndex = (index + 1) * 2 - 1;
			const left = this.nodeArr[leftIndex];
			const rightIndex = leftIndex + 1;
			const right = this.nodeArr[rightIndex];

			if (this.compare(left, node) < 0) {
				if (rightIndex < length && this.compare(right, left) < 0) {
					this.nodeArr[index] = right;
					this.nodeArr[rightIndex] = node;
					index = rightIndex;
				} else {
					this.nodeArr[index] = left;
					this.nodeArr[leftIndex] = node;
					index = leftIndex;
				}
			} else if (rightIndex < length && this.compare(right, node) < 0) {
				this.nodeArr[index] = right;
				this.nodeArr[rightIndex] = node;
				index = rightIndex;
			} else {
				return;
			}
		}
	}

	compare(a: Node, b: Node) {
		return a.value - b.value;
	}
}

export { random, generateNode, initNodeArr, nodeArrToTree, MinHeap };
