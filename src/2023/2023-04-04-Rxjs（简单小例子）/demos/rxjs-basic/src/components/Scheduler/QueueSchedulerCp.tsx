import { useEffect, useRef } from 'react';
import { fromEvent, take, queueScheduler } from 'rxjs';

function QueueSchedulerCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				queueScheduler.schedule(
					function (this: any, state: any) {
						if (state !== 0) {
							console.log('before', state);
							this.schedule(state - 1); // `this` references currently executing Action,
							// which we reschedule with new state
							console.log('after', state);
						}
					},
					0,
					3
				);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>QueueScheduler</button>
		</div>
	);
}

export default QueueSchedulerCp;
