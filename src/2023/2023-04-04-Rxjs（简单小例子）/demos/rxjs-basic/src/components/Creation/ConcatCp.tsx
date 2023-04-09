import { useEffect, useRef } from 'react';
import {
	Observable,
	Subscription,
	concat,
	delay,
	fromEvent,
	of,
	take
} from 'rxjs';

function ConcatCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 发出 1,2,3
				const sourceOne = of(1, 2, 3).pipe(delay(3000));
				// 发出 4,5,6
				const sourceTwo = of(4, 5, 6).pipe(delay(3000));

				concat(sourceOne, sourceTwo).subscribe((val) =>
					console.log('Concat', val)
				);

				// 自己实现的concat
				const myConcat = function (...args: Observable<any>[]) {
					return new Observable((subscriber) => {
						const iterator = args[Symbol.iterator]();
						let subscription: Subscription;
						let item: any;
						const test = (iterator: IterableIterator<Observable<any>>) => {
							item = iterator.next();
							if (!item.done) {
								subscription = item.value.subscribe({
									next: (val: any) => {
										subscriber.next(val);
									},
									complete: () => {
										test(iterator);
									},
									error: (err: any) => {
										subscriber.error(err);
									}
								});
							} else {
								subscriber.complete();
							}
						};
						test(iterator);
						return () => {
							subscription && subscription.unsubscribe();
						};
					});
				};

				const subscription = myConcat(sourceOne, sourceTwo).subscribe((val) =>
					console.log('MyConcat', val)
				);
				setTimeout(() => {
					subscription.unsubscribe();
				}, 5000);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Concat</button>
		</div>
	);
}

export default ConcatCp;
