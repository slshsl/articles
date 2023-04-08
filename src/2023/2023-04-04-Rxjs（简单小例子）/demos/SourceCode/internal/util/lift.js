import { isFunction } from '../../isFunction.js';

export function hasLift(source) {
	return isFunction(source?.lift);
}

export function operate(init) {
	return (source) => {
		if (hasLift(source)) {
			return source.lift(function (liftedSource) {
				try {
					return init(liftedSource, this);
				} catch (err) {
					this.error(err);
				}
			});
		}
		throw new TypeError('Unable to lift unknown Observable type');
	};
}
