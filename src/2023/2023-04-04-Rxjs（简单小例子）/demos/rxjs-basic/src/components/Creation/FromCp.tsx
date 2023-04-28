import { useEffect, useRef } from 'react';
import { Observable, from, fromEvent, take } from 'rxjs';

function FromCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// // 接受一个可迭代对象
				// from([1, 2, 3]).subscribe({
				// 	next: (value) => console.log(value),
				// 	complete: () => console.log('Complete')
				// });

				// // 接受一个promise
				// from(Promise.resolve(1)).subscribe({
				// 	next: (value) => console.log(value),
				// 	complete: () => console.log('Complete')
				// });

				// 自己实现的from
				const myFrom = function (iteratorableObj: any) {
					return new Observable((subscriber) => {
						if (
							typeof iteratorableObj === 'object' &&
							typeof iteratorableObj.then === 'function'
						) {
							iteratorableObj
								.then((val: any) => {
									subscriber.next(val);
								})
								.catch((err: any) => {
									subscriber.error(err);
								})
								.finally(() => {
									subscriber.complete();
								});
						} else {
							for (const iterator of iteratorableObj) {
								subscriber.next(iterator);
							}
							subscriber.complete();
						}
					});
				};

				myFrom([1, 2, 3]).subscribe({
					next: (value) => console.log(value),
					complete: () => console.log('Complete')
				});

				myFrom(Promise.resolve(1)).subscribe({
					next: (value) => console.log(value),
					complete: () => console.log('Complete')
				});
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>From</button>
		</div>
	);
}

export default FromCp;
