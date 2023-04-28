import { useEffect, useRef } from 'react';
import { defer, fromEvent, interval, take } from 'rxjs';

function DeferCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const clicksOrInterval = defer(() => {
					return Math.random() > 0.5
						? fromEvent(document, 'click')
						: interval(1000);
				});
				clicksOrInterval.subscribe((x) => console.log(x));
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Defer</button>
		</div>
	);
}

export default DeferCp;
