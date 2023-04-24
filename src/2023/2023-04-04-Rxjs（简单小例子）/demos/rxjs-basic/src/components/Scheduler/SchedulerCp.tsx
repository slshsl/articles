import { useEffect, useRef } from 'react';
import { fromEvent, take, Observable, observeOn, asyncScheduler } from 'rxjs';

function SchedulerCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// const observable = new Observable((observer) => {
				// 	observer.next(1);
				// 	observer.next(2);
				// 	observer.next(3);
				// 	observer.complete();
				// }).pipe(observeOn(asyncScheduler));

				// console.log('just before subscribe');
				// observable.subscribe({
				// 	next(x) {
				// 		console.log('got value ' + x);
				// 	},
				// 	error(err) {
				// 		console.error('something wrong occurred: ' + err);
				// 	},
				// 	complete() {
				// 		console.log('done');
				// 	}
				// });
				// console.log('just after subscribe');

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
			<button ref={btnRef}>Scheduler</button>
		</div>
	);
}

export default SchedulerCp;
