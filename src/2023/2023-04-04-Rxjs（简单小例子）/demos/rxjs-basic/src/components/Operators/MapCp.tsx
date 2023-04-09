import { useEffect, useRef } from 'react';
import { Observable, from, fromEvent, interval, take, tap } from 'rxjs';

import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

import { operate } from 'rxjs/internal/util/lift';

function MapCp() {
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
					// return function (preObservable: Observable<any>) {
					// 	const operator = function (
					// 		this: Subscriber<any>,
					// 		source: Observable<any>
					// 	) {
					// 		const init = function (
					// 			source: Observable<any>,
					// 			subscriber: Subscriber<any>
					// 		) {
					// 			source.subscribe({
					// 				next: (value) => {
					// 					subscriber.next(project(value));
					// 				},
					// 				complete: () => {
					// 					subscriber.complete();
					// 				},
					// 				error: (err) => {
					// 					subscriber.error(err);
					// 				}
					// 			});
					// 		};
					// 		return init(source, this);
					// 	};
					// 	return preObservable.lift(operator);
					// };
					return function (preObservable: Observable<any>) {
						const newObservable = new Observable((subscriber) => {
							preObservable.subscribe(
								createOperatorSubscriber(subscriber, (value: any) => {
									subscriber.next(project(value));
								})
							);
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
