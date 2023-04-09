import { useEffect, useRef } from 'react';
import { Observable, filter, from, fromEvent, take } from 'rxjs';

function FilterCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 发出 (1,2,3,4,5)
				const source = from<Array<number>>([1, 2, 3, 4, 5]);

				// 过滤掉奇数
				const example = source.pipe(filter((num: number) => num % 2 === 0));
				// 输出: "Even number: 2", "Even number: 4"
				example.subscribe({
					next: (val: number) => console.log(`Filter: ${val}`),
					complete: () => console.log('Filter Complete')
				});

				// 自己实现的filter
				const myFilter = function (select: (...args: any[]) => any) {
					return function (preObservable: Observable<any>) {
						const nextObservable = new Observable((subscriber) => {
							preObservable.subscribe({
								next: (value) => {
									if (select(value)) {
										subscriber.next(value);
									}
								},
								complete: () => {
									subscriber.complete();
								},
								error: (err) => {
									subscriber.error(err);
								}
							});
						});

						return nextObservable;
					};
				};

				source.pipe(myFilter((num) => num % 2 === 0)).subscribe({
					next: (val) => console.log(`MyFilter: ${val}`),
					complete: () => console.log('MyFilter Complete')
				});
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Filter</button>
		</div>
	);
}

export default FilterCp;
