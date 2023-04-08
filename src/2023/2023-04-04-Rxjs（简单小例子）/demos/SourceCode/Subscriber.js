import { isSubscription, Subscription } from './Subscription.js';
import { isFunction } from './isFunction.js';
import { noop } from './noop.js';
import { config } from './config.js';
import { timeoutProvider } from './timeoutProvider.js';
import { captureError } from './errorContext.js';
import { reportUnhandledError } from './reportUnhandledError.js';
import {
	nextNotification,
	errorNotification,
	COMPLETE_NOTIFICATION
} from './NotificationFactories.js';

export class Subscriber extends Subscription {
	isStopped = false;

	destination;

	constructor(destination) {
		super();
		if (destination) {
			this.destination = destination;
			if (isSubscription(destination)) {
				destination.add(this);
			}
		} else {
			this.destination = EMPTY_OBSERVER;
		}
	}

	next(value) {
		if (this.isStopped) {
			handleStoppedNotification(nextNotification(value), this);
		} else {
			this._next(value);
		}
	}

	error(err) {
		if (this.isStopped) {
			handleStoppedNotification(errorNotification(err), this);
		} else {
			this.isStopped = true;
			this._error(err);
		}
	}

	complete() {
		if (this.isStopped) {
			handleStoppedNotification(COMPLETE_NOTIFICATION, this);
		} else {
			this.isStopped = true;
			this._complete();
		}
	}

	unsubscribe() {
		if (!this.closed) {
			this.isStopped = true;
			super.unsubscribe();
			this.destination = null;
		}
	}

	_next(value) {
		this.destination.next(value);
	}

	_error(err) {
		try {
			this.destination.error(err);
		} finally {
			this.unsubscribe();
		}
	}

	_complete() {
		try {
			this.destination.complete();
		} finally {
			this.unsubscribe();
		}
	}
}

export class SafeSubscriber extends Subscriber {
	constructor(observerOrNext, error, complete) {
		super();

		let partialObserver;
		if (isFunction(observerOrNext) || !observerOrNext) {
			partialObserver = {
				next: observerOrNext ?? undefined,
				error: error ?? undefined,
				complete: complete ?? undefined
			};
		} else {
			let context;
			if (this && config.useDeprecatedNextContext) {
				context = Object.create(observerOrNext);
				context.unsubscribe = () => this.unsubscribe();
				partialObserver = {
					next: observerOrNext.next && bind(observerOrNext.next, context),
					error: observerOrNext.error && bind(observerOrNext.error, context),
					complete:
						observerOrNext.complete && bind(observerOrNext.complete, context)
				};
			} else {
				partialObserver = observerOrNext;
			}
		}
		this.destination = new ConsumerObserver(partialObserver);
	}
}

function handleUnhandledError(error) {
	if (config.useDeprecatedSynchronousErrorHandling) {
		captureError(error);
	} else {
		reportUnhandledError(error);
	}
}

class ConsumerObserver {
	constructor(partialObserver) {
		this.partialObserver = partialObserver;
	}

	next(value) {
		const { partialObserver } = this;
		if (partialObserver.next) {
			try {
				partialObserver.next(value);
			} catch (error) {
				handleUnhandledError(error);
			}
		}
	}

	error(err) {
		const { partialObserver } = this;
		if (partialObserver.error) {
			try {
				partialObserver.error(err);
			} catch (error) {
				handleUnhandledError(error);
			}
		} else {
			handleUnhandledError(err);
		}
	}

	complete() {
		const { partialObserver } = this;
		if (partialObserver.complete) {
			try {
				partialObserver.complete();
			} catch (error) {
				handleUnhandledError(error);
			}
		}
	}
}

const _bind = Function.prototype.bind;

function bind(fn, thisArg) {
	return _bind.call(fn, thisArg);
}

function defaultErrorHandler(err) {
	throw err;
}

function handleStoppedNotification(notification, subscriber) {
	const { onStoppedNotification } = config;
	onStoppedNotification &&
		timeoutProvider.setTimeout(() =>
			onStoppedNotification(notification, subscriber)
		);
}

export const EMPTY_OBSERVER = {
	closed: true,
	next: noop,
	error: defaultErrorHandler,
	complete: noop
};
