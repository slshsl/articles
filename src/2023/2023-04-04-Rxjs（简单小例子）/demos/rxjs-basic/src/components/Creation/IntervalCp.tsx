import { useEffect, useRef } from 'react';
import { Observable, fromEvent, interval, take, tap } from 'rxjs';

function IntervalCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				interval(1000).subscribe({
					next: (value) => console.log('Interval:', value)
				});

				// 自己实现的interval
				const myInterval = function (period: number) {
					return new Observable<number>((subscriber) => {
						let count = 0;
						const timeInterId = setInterval(() => {
							subscriber.next(count++);
						}, period);

						return () => {
							clearInterval(timeInterId);
						};
					});
				};

				const myIntervalSubscription = myInterval(1000).subscribe({
					next: (value: number) => console.log('MyInterval:', value)
				});

				setTimeout(() => {
					myIntervalSubscription.unsubscribe();
				}, 5000);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Interval</button>
		</div>
	);
}

export default IntervalCp;
