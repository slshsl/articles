import { useEffect, useRef } from 'react';
import {
	Observable,
	Subscriber,
	from,
	fromEvent,
	interval,
	map,
	take,
	tap
} from 'rxjs';

import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

import { operate } from 'rxjs/internal/util/lift';

function MapCp() {
	const a: object = {};
	console.log(a);
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 发出 (1,2,3,4,5)
				let source = from([1, 2, 3, 4, 5]);

				// source.pipe(map((val) => val + 10)).subscribe({
				// 	next: (val) => console.log(`Map: ${val}`),
				// 	complete: () => console.log('Map Complete')
				// });

				// 自己实现的map
				const myMap = function (project: (...args: any[]) => any) {
					// 第一种方式
					// return operate((source, subscriber) => {
					// 	source.subscribe(
					// 		createOperatorSubscriber(subscriber, (value) => {
					// 			subscriber.next(project(value));
					// 		})
					// 	);
					// });
					// 第二种方式
					// return function (source: Observable<any>) {
					// 	const newObservable = new Observable((subscriber) => {
					// 		source.subscribe(
					// 			createOperatorSubscriber(subscriber, (value: any) => {
					// 				subscriber.next(project(value));
					// 			})
					// 		);
					// 	});
					// 	return newObservable;
					// };
					// 第三种方式
					// return function (source: Observable<any>) {
					// 	const newObservable = new Observable((subscriber) => {
					// 		const subscription = source.subscribe((value: any) => {
					// 			subscriber.next(project(value));
					// 		});
					// 		subscriber.add(subscription);
					// 	});
					// 	return newObservable;
					// };
					// 第四种方式
					return function (source: Observable<any>) {
						const newObservable = new Observable((subscriber) => {
							const subscription = source.subscribe((value: any) => {
								subscriber.next(project(value));
							});
							return subscription;
							// return () => {
							// 	subscription.unsubscribe();
							// };
						});
						return newObservable;
					};
				};

				source = interval(1000);

				source
					.pipe(
						tap(console.log),
						myMap((val) => val + 10),
						take(5)
					)
					.subscribe({
						next: (val) => console.log(`MyMap: ${val}`),
						complete: () => console.log('MyMap Complete')
					});
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Map</button>
		</div>
	);
}

export default MapCp;
