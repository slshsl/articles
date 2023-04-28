import { useEffect, useRef } from 'react';
import { fromEvent, take, asyncScheduler } from 'rxjs';

function AsyncSchedulerCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				function task(this: any, state: any) {
					console.log(state);
					this.schedule(state + 1, 1000); // `this` references currently executing Action,
					// which we reschedule with new state and delay
				}

				asyncScheduler.schedule(task, 3000, 0);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>AsyncScheduler</button>
		</div>
	);
}

export default AsyncSchedulerCp;
