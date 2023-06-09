import { isFunction } from './isFunction.js';
import { UnsubscriptionError } from './UnsubscriptionError.js';
import { arrRemove } from './arrRemove.js';

export class Subscription {
	closed = false;

	_parentage = null;

	_finalizers = null;

	constructor(initialTeardown) {
		this.initialTeardown = initialTeardown;
	}

	unsubscribe() {
		let errors;

		if (!this.closed) {
			this.closed = true;

			const { _parentage } = this;
			if (_parentage) {
				this._parentage = null;
				if (Array.isArray(_parentage)) {
					for (const parent of _parentage) {
						parent.remove(this);
					}
				} else {
					_parentage.remove(this);
				}
			}

			const { initialTeardown: initialFinalizer } = this;
			if (isFunction(initialFinalizer)) {
				try {
					initialFinalizer();
				} catch (e) {
					errors = e instanceof UnsubscriptionError ? e.errors : [e];
				}
			}

			const { _finalizers } = this;
			if (_finalizers) {
				this._finalizers = null;
				for (const finalizer of _finalizers) {
					try {
						execFinalizer(finalizer);
					} catch (err) {
						errors = errors ?? [];
						if (err instanceof UnsubscriptionError) {
							errors = [...errors, ...err.errors];
						} else {
							errors.push(err);
						}
					}
				}
			}

			if (errors) {
				throw new UnsubscriptionError(errors);
			}
		}
	}

	add(teardown) {
		if (teardown && teardown !== this) {
			if (this.closed) {
				execFinalizer(teardown);
			} else {
				if (teardown instanceof Subscription) {
					if (teardown.closed || teardown._hasParent(this)) {
						return;
					}
					teardown._addParent(this);
				}
				(this._finalizers = this._finalizers ?? []).push(teardown);
			}
		}
	}

	_hasParent(parent) {
		const { _parentage } = this;
		return (
			_parentage === parent ||
			(Array.isArray(_parentage) && _parentage.includes(parent))
		);
	}

	_addParent(parent) {
		const { _parentage } = this;
		this._parentage = Array.isArray(_parentage)
			? (_parentage.push(parent), _parentage)
			: _parentage
			? [_parentage, parent]
			: parent;
	}

	_removeParent(parent) {
		const { _parentage } = this;
		if (_parentage === parent) {
			this._parentage = null;
		} else if (Array.isArray(_parentage)) {
			arrRemove(_parentage, parent);
		}
	}

	remove(teardown) {
		const { _finalizers } = this;
		_finalizers && arrRemove(_finalizers, teardown);

		if (teardown instanceof Subscription) {
			teardown._removeParent(this);
		}
	}
}

export function isSubscription(value) {
	return (
		value instanceof Subscription ||
		(value &&
			'closed' in value &&
			isFunction(value.remove) &&
			isFunction(value.add) &&
			isFunction(value.unsubscribe))
	);
}

function execFinalizer(finalizer) {
	if (isFunction(finalizer)) {
		finalizer();
	} else {
		finalizer.unsubscribe();
	}
}
