function push(heap, node) {
	const index = heap.length;
	heap.push(node);
	siftUp(heap, node, index);
}

function peek(heap) {
	return heap.length === 0 ? null : heap[0];
}

function pop(heap) {
	if (heap.length === 0) {
		return null;
	}
	const first = heap[0];
	const last = heap.pop();
	if (last !== first) {
		heap[0] = last;
		siftDown(heap, last, 0);
	}
	return first;
}

function siftUp(heap, node, i) {
	let index = i;
	while (index > 0) {
		const parentIndex = (index - 1) >>> 1;
		const parent = heap[parentIndex];
		if (compare(parent, node) > 0) {
			heap[parentIndex] = node;
			heap[index] = parent;
			index = parentIndex;
		} else {
			return;
		}
	}
}

function siftDown(heap, node, i) {
	let index = i;
	const length = heap.length;
	const halfLength = length >>> 1;
	while (index < halfLength) {
		const leftIndex = (index + 1) * 2 - 1;
		const left = heap[leftIndex];
		const rightIndex = leftIndex + 1;
		const right = heap[rightIndex];

		if (compare(left, node) < 0) {
			if (rightIndex < length && compare(right, left) < 0) {
				heap[index] = right;
				heap[rightIndex] = node;
				index = rightIndex;
			} else {
				heap[index] = left;
				heap[leftIndex] = node;
				index = leftIndex;
			}
		} else if (rightIndex < length && compare(right, node) < 0) {
			heap[index] = right;
			heap[rightIndex] = node;
			index = rightIndex;
		} else {
			return;
		}
	}
}

function compare(a, b) {
	const diff = a.sortIndex - b.sortIndex;
	return diff !== 0 ? diff : a.id - b.id;
}

//-----------------------------------------------------------------------------
const localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;

const localClearTimeout =
	typeof clearTimeout === 'function' ? clearTimeout : null;

const localSetImmediate =
	typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom

const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;

var maxSigned31BitInt = 1073741823;
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;

var taskQueue = [];
var timerQueue = [];
var taskIdCounter = 1;
var isSchedulerPaused = false;
var currentTask = null;
var currentPriorityLevel = NormalPriority;
var isPerformingWork = false;
var isHostCallbackScheduled = false;
var isHostTimeoutScheduled = false;

//------------------------------------------------------------------------------
let getCurrentTime;
const hasPerformanceNow =
	// $FlowFixMe[method-unbinding]
	typeof performance === 'object' && typeof performance.now === 'function';

if (hasPerformanceNow) {
	const localPerformance = performance;
	getCurrentTime = () => localPerformance.now();
} else {
	const localDate = Date;
	const initialTime = localDate.now();
	getCurrentTime = () => localDate.now() - initialTime;
}
//-----------------------------------------------------------------------------
function advanceTimers(currentTime) {
	let timer = peek(timerQueue);
	while (timer !== null) {
		if (timer.callback === null) {
			pop(timerQueue);
		} else if (timer.startTime <= currentTime) {
			pop(timerQueue);
			timer.sortIndex = timer.expirationTime;
			push(taskQueue, timer);
		} else {
			return;
		}
		timer = peek(timerQueue);
	}
}

function handleTimeout(currentTime) {
	isHostTimeoutScheduled = false;
	advanceTimers(currentTime);

	if (!isHostCallbackScheduled) {
		if (peek(taskQueue) !== null) {
			isHostCallbackScheduled = true;
			requestHostCallback(flushWork);
		} else {
			const firstTimer = peek(timerQueue);
			if (firstTimer !== null) {
				requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
			}
		}
	}
}

function flushWork(hasTimeRemaining, initialTime) {
	isHostCallbackScheduled = false;
	if (isHostTimeoutScheduled) {
		isHostTimeoutScheduled = false;
		cancelHostTimeout();
	}

	isPerformingWork = true;
	const previousPriorityLevel = currentPriorityLevel;
	try {
		return workLoop(hasTimeRemaining, initialTime);
	} finally {
		currentTask = null;
		currentPriorityLevel = previousPriorityLevel;
		isPerformingWork = false;
	}
}

function workLoop(hasTimeRemaining, initialTime) {
	let currentTime = initialTime;
	advanceTimers(currentTime);
	currentTask = peek(taskQueue);
	while (currentTask !== null && !(false && isSchedulerPaused)) {
		if (
			currentTask.expirationTime > currentTime &&
			(!hasTimeRemaining || shouldYieldToHost())
		) {
			break;
		}

		const callback = currentTask.callback;
		if (typeof callback === 'function') {
			currentTask.callback = null;

			currentPriorityLevel = currentTask.priorityLevel;

			const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;

			const continuationCallback = callback(didUserCallbackTimeout);
			currentTime = getCurrentTime();
			if (typeof continuationCallback === 'function') {
				currentTask.callback = continuationCallback;

				advanceTimers(currentTime);
				return true;
			} else {
				if (currentTask === peek(taskQueue)) {
					pop(taskQueue);
				}
				advanceTimers(currentTime);
			}
		} else {
			pop(taskQueue);
		}
		currentTask = peek(taskQueue);
	}

	if (currentTask !== null) {
		return true;
	} else {
		const firstTimer = peek(timerQueue);
		if (firstTimer !== null) {
			requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
		}
		return false;
	}
}

function unstable_getFirstCallbackNode() {
	return peek(taskQueue);
}

function unstable_cancelCallback(task) {
	task.callback = null;
}

function unstable_getCurrentPriorityLevel() {
	return currentPriorityLevel;
}

//------------------------------------------------------------------------------
let isMessageLoopRunning = false;
let scheduledHostCallback = null;
let taskTimeoutID = -1;

function requestHostCallback(callback) {
	scheduledHostCallback = callback;
	if (!isMessageLoopRunning) {
		isMessageLoopRunning = true;
		schedulePerformWorkUntilDeadline();
	}
}

function requestHostTimeout(callback, ms) {
	taskTimeoutID = localSetTimeout(() => {
		callback(getCurrentTime());
	}, ms);
}

function cancelHostTimeout() {
	localClearTimeout(taskTimeoutID);
	taskTimeoutID = -1;
}
//------------------------------------------------------------------------------------------
let frameInterval = 5;
let startTime = -1;

// 告知时间切片是否用尽
function shouldYieldToHost() {
	const timeElapsed = getCurrentTime() - startTime;
	if (timeElapsed < frameInterval) {
		return false;
	}
	return true;
}

const performWorkUntilDeadline = () => {
	if (scheduledHostCallback !== null) {
		const currentTime = getCurrentTime();
		startTime = currentTime;
		const hasTimeRemaining = true;
		let hasMoreWork = true;
		try {
			hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
		} finally {
			if (hasMoreWork) {
				schedulePerformWorkUntilDeadline();
			} else {
				isMessageLoopRunning = false;
				scheduledHostCallback = null;
			}
		}
	} else {
		isMessageLoopRunning = false;
	}
};

//---------------------------------------------------
let schedulePerformWorkUntilDeadline;
if (typeof localSetImmediate === 'function') {
	schedulePerformWorkUntilDeadline = () => {
		localSetImmediate(performWorkUntilDeadline);
	};
} else if (typeof MessageChannel !== 'undefined') {
	const channel = new MessageChannel();
	const port = channel.port2;
	channel.port1.onmessage = performWorkUntilDeadline;
	schedulePerformWorkUntilDeadline = () => {
		port.postMessage(null);
	};
} else {
	schedulePerformWorkUntilDeadline = () => {
		localSetTimeout(performWorkUntilDeadline, 0);
	};
}
//---------------------------------------------------
function unstable_scheduleCallback(priorityLevel, callback, options) {
	var currentTime = getCurrentTime();

	var startTime;
	if (typeof options === 'object' && options !== null) {
		var delay = options.delay;
		if (typeof delay === 'number' && delay > 0) {
			startTime = currentTime + delay;
		} else {
			startTime = currentTime;
		}
	} else {
		startTime = currentTime;
	}

	var timeout;
	switch (priorityLevel) {
		case ImmediatePriority:
			timeout = IMMEDIATE_PRIORITY_TIMEOUT;
			break;
		case UserBlockingPriority:
			timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
			break;
		case IdlePriority:
			timeout = IDLE_PRIORITY_TIMEOUT;
			break;
		case LowPriority:
			timeout = LOW_PRIORITY_TIMEOUT;
			break;
		case NormalPriority:
		default:
			timeout = NORMAL_PRIORITY_TIMEOUT;
			break;
	}

	var expirationTime = startTime + timeout;

	var newTask = {
		id: taskIdCounter++,
		callback,
		priorityLevel,
		startTime,
		expirationTime,
		sortIndex: -1
	};

	if (startTime > currentTime) {
		newTask.sortIndex = startTime;
		push(timerQueue, newTask);
		if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
			if (isHostTimeoutScheduled) {
				cancelHostTimeout();
			} else {
				isHostTimeoutScheduled = true;
			}
			requestHostTimeout(handleTimeout, startTime - currentTime);
		}
	} else {
		newTask.sortIndex = expirationTime;
		push(taskQueue, newTask);
		//
		if (!isHostCallbackScheduled && !isPerformingWork) {
			isHostCallbackScheduled = true;
			requestHostCallback(flushWork);
		}
	}

	return newTask;
}

export {
	ImmediatePriority as unstable_ImmediatePriority,
	UserBlockingPriority as unstable_UserBlockingPriority,
	NormalPriority as unstable_NormalPriority,
	IdlePriority as unstable_IdlePriority,
	LowPriority as unstable_LowPriority,
	unstable_scheduleCallback,
	unstable_cancelCallback,
	unstable_getCurrentPriorityLevel,
	shouldYieldToHost as unstable_shouldYield,
	unstable_getFirstCallbackNode,
	getCurrentTime as unstable_now
};
