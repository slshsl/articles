import { isFunction } from '../../isFunction.js';

export function hasLift(source) {
	return isFunction(source?.lift);
}

//init The logic to connect the liftedSource to the subscriber at the moment of subscription.
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
