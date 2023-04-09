import { useEffect, useRef } from 'react';
import { delay, fromEvent, range, take } from 'rxjs';

function RangeCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				console.log('start');
				range(1, 200)
					.pipe(delay(1000))
					.subscribe((x) => {
						console.log(x);
					});
				console.log('end');
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Range</button>
		</div>
	);
}

export default RangeCp;
