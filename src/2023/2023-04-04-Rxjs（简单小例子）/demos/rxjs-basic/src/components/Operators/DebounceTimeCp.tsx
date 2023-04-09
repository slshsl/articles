import { KeyboardEvent, useEffect, useRef } from 'react';
import { Observable, debounceTime, fromEvent, map, take } from 'rxjs';

function DebounceTimeCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 对于每次键盘敲击，都将映射成当前输入值
				fromEvent<KeyboardEvent<HTMLInputElement>>(inputRef.current!, 'keyup')
					.pipe(
						map((e) => e.currentTarget.value),
						// 舍弃掉在两次输出之间小于指定时间的发出值
						debounceTime(500)
					)
					.subscribe((val) => {
						console.log(`Debounced Input: ${val}`);
					});

				// 自己实现的debounceTime
				const myDebounceTime = function (dueTime: number) {
					return function (preObservable: Observable<any>) {
						const nextObservable = new Observable((subscriber) => {
							let timeOutId: any;
							preObservable.subscribe({
								next: (value) => {
									if (timeOutId) {
										clearTimeout(timeOutId);
									}
									timeOutId = setTimeout(() => {
										subscriber.next(value);
									}, dueTime);
								},
								complete: () => {
									subscriber.complete();
								},
								error: (err) => {
									subscriber.error(err);
								}
							});
							return () => {
								clearTimeout(timeOutId);
							};
						});

						return nextObservable;
					};
				};

				fromEvent<KeyboardEvent<HTMLInputElement>>(inputRef.current!, 'keyup')
					.pipe(
						map((e) => e.currentTarget!.value),
						myDebounceTime(5000)
					)
					.subscribe((val) => {
						console.log(`My Debounced Input: ${val}`);
					});
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>DebounceTime</button>
			<input ref={inputRef} />
		</div>
	);
}

export default DebounceTimeCp;
