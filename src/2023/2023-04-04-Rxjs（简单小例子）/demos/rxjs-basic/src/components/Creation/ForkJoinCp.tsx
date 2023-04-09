import { useEffect, useRef } from 'react';
import {
	Observable,
	catchError,
	delay,
	forkJoin,
	fromEvent,
	interval,
	of,
	take
} from 'rxjs';

function ForkJoinCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 当所有 observables 完成时，发出每个 observable 的最新值。
				const example = forkJoin(
					// 立即发出 'Hello'
					of('Hello'),
					// 1秒后发出 'World'
					of('World').pipe(delay(1000)),
					// 1秒后发出0
					interval(1000).pipe(take(1)),
					// 以1秒的时间间隔发出0和1
					interval(1000).pipe(take(2))
				);

				//输出: ["Hello", "World", 0, 1]
				example.subscribe((val) => console.log(val));

				const a$ = new Observable((subscriber) => {
					setTimeout(() => {
						subscriber.next('A');
						subscriber.complete();
					}, 5000);
					return () => {
						console.log('A teardown');
					};
				});

				const b$ = new Observable((subscriber) => {
					setTimeout(() => {
						subscriber.error('Failure!');
					}, 3000);
					return () => {
						console.log('B teardown');
					};
				});

				forkJoin([a$, b$]).subscribe({
					next: (value) => console.log(value),
					error: (err) => console.log('Error:', err)
				});

				// Error: Failure!
				// A teardown
				// B teardown

				// 对于forkJoin中发生错误，如果发生错误的observable没有处理，那么会在forkJoin中抛出，并且next中不会运行
				// 且会对所有的obeservable之情清理函数

				forkJoin([a$, b$.pipe(catchError((error) => of(error)))]).subscribe({
					next: (value) => console.log(value),
					error: (err) => console.log('Error:', err)
				});

				// 对于forkJoin中发生错误，如果发生错误的observable处理了，那么forkJorn的next会正常运行，value中也会有值

				// 总结：对于forkJoin中的错误处理有两种方式，一种是内部处理，这样可以得到所有的value;
				// 另一种是外部处理

				// 对于那种处理方法，个人认为外部处理更合理些，因为forkJoin就是为了得到所有 observables 完成时每个 observable 的最新值；
				// 如果一个observable出错，得到其他的值也没有意义
				// 所以外部处理更合理些，一但一个observable出错了，依次调用所有observable的清理函数，很合理
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>ForkJoin</button>
		</div>
	);
}

export default ForkJoinCp;
