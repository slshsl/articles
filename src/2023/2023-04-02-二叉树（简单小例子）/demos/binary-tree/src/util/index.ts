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

export { random, initNodeArr, nodeArrToTree };
