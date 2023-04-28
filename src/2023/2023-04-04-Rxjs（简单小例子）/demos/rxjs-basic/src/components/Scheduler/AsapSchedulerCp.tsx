import { useEffect, useRef } from 'react';
import { fromEvent, take, asyncScheduler, asapScheduler } from 'rxjs';

function AsapSchedulerCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				asapScheduler.schedule(() => console.log('asapScheduler'));
				Promise.resolve().then(() => {
					console.log('Promise');
				});
				asapScheduler.schedule(() => console.log('asapScheduler'));
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>AsapScheduler</button>
		</div>
	);
}

export default AsapSchedulerCp;
