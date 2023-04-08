import { Subscriber } from '../../Subscriber.js';

export function createOperatorSubscriber(
	destination,
	onNext,
	onComplete,
	onError,
	onFinalize
) {
	return new OperatorSubscriber(
		destination,
		onNext,
		onComplete,
		onError,
		onFinalize
	);
}

export class OperatorSubscriber extends Subscriber {
	constructor(
		destination,
		onNext,
		onComplete,
		onError,
		onFinalize,
		shouldUnsubscribe
	) {
		super(destination);
		this._next = onNext
			? function (value) {
					try {
						onNext(value);
					} catch (err) {
						destination.error(err);
					}
			  }
			: super._next;
		this._error = onError
			? function (err) {
					try {
						onError(err);
					} catch (err) {
						destination.error(err);
					} finally {
						this.unsubscribe();
					}
			  }
			: super._error;
		this._complete = onComplete
			? function () {
					try {
						onComplete();
					} catch (err) {
						destination.error(err);
					} finally {
						this.unsubscribe();
					}
			  }
			: super._complete;
	}

	unsubscribe() {
		if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
			const { closed } = this;
			super.unsubscribe();
			!closed && this.onFinalize?.();
		}
	}
}
