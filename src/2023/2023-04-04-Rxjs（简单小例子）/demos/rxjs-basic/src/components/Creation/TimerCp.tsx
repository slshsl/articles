import { useEffect, useRef } from 'react';
import { Observable, fromEvent, take, timer } from 'rxjs';

function TimerCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				//2s 结束时发出一个值 0，然后结束
				// timer(2000).subscribe({
				// 	next: (value) => console.log('Timer:',value),
				// 	complete: () => console.log('Timer Complete')
				// });

				//1秒后发出值，然后每2秒发出值
				timer(1000, 2000).subscribe({
					next: (value) => console.log('timer:', value)
				});

				// 自己实现的timer
				const myTimer = function (initialDelay: number, period: number) {
					return new Observable((subscriber) => {
						let count = 0;
						let timeOutId: any;
						let timeInterId: any;
						timeOutId = setTimeout(() => {
							subscriber.next(count);
							if (period !== undefined) {
								timeInterId = setInterval(() => {
									subscriber.next(++count);
								}, period);
							} else {
								subscriber.complete();
							}
						}, initialDelay);
						return () => {
							clearTimeout(timeOutId);
							clearInterval(timeInterId);
						};
					});
				};

				// myTimer(2000).subscribe({
				// 	next: (value) => console.log('MyTimer:',value),
				// 	complete: () => console.log(''MyTimer Complete')
				// });

				const myTimerSubscription = myTimer(1000, 2000).subscribe({
					next: (value) => console.log('MyTimer:', value)
				});

				setTimeout(() => {
					myTimerSubscription.unsubscribe();
				}, 5000);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Timer</button>
		</div>
	);
}

export default TimerCp;
