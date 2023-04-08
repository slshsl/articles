import { SafeSubscriber, Subscriber } from './Subscriber.js';
import { errorContext } from './errorContext.js';
import { isFunction } from './isFunction.js';
import { isSubscription } from './Subscription.js';
import { pipeFromArray } from './pipe.js';

export class Observable {
	source;
	operator;
	constructor(subscribe) {
		if (subscribe) {
			this._subscribe = subscribe;
		}
	}

	subscribe(observerOrNext, error, complete) {
		const subscriber = isSubscriber(observerOrNext)
			? observerOrNext
			: new SafeSubscriber(observerOrNext, error, complete);

		errorContext(() => {
			const { operator, source } = this;
			subscriber.add(
				operator
					? operator.call(subscriber, source)
					: source
					? this._subscribe(subscriber)
					: this._trySubscribe(subscriber)
			);
		});

		return subscriber;
	}

	lift(operator) {
		const observable = new Observable();
		observable.source = this;
		observable.operator = operator;
		return observable;
	}

	_trySubscribe(sink) {
		try {
			return this._subscribe(sink);
		} catch (err) {
			sink.error(err);
		}
	}

	_subscribe(subscriber) {
		return this.source?.subscribe(subscriber);
	}

	pipe(...operations) {
		return pipeFromArray(operations)(this);
	}
}

function isObserver(value) {
	return (
		value &&
		isFunction(value.next) &&
		isFunction(value.error) &&
		isFunction(value.complete)
	);
}

function isSubscriber(value) {
	return (
		(value && value instanceof Subscriber) ||
		(isObserver(value) && isSubscription(value))
	);
}
