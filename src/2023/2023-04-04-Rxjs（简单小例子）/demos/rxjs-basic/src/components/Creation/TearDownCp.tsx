import { useEffect, useRef } from 'react';
import { Observable, fromEvent, take } from 'rxjs';

function TearDownCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const observable$ = new Observable<string>((subscriber) => {
					subscriber.next('A');
					subscriber.next('B');

					// 场景一
					subscriber.complete();

					// 场景二
					// subscriber.error(new Error('Failure'));

					// return的函数作为清理函数，它被执行的场景有三个
					// 场景一：当调用subscriber.complete()之后运行
					// 场景二：当调用subscriber.error()之后运行
					// 场景三：当订阅被取消之后运行
					return () => {
						console.log('tear down');
					};
				});

				const subscription = observable$.subscribe({
					next: (value: string) => console.log(value),
					complete: () => console.log('Completed'),
					error: (err) => console.log(err)
				});

				// 场景三
				subscription.unsubscribe();

				// 总结tear down清理函数的作用就是释放资源，避免内存泄漏；其运行时机是subscription在complete()、error()、unsubscribe()的时候会自动运行
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>TearDown</button>
		</div>
	);
}

export default TearDownCp;
