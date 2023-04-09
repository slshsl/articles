import { useEffect, useRef } from 'react';
import { Observable, from, fromEvent, take, tap } from 'rxjs';

function TapCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const source = from([
					{ num: 1 },
					{ num: 2 },
					{ num: 3 },
					{ num: 4 },
					{ num: 5 }
				]);

				source
					.pipe(
						tap((val) => {
							// tap一般用来处理一些副作用，比如日志记录
							// 对于引用的数据，不要改变其内部属性的值
							// 重，你看这些对数据的处理直接影响到了数据源
							val.num = val.num + 10;
							console.log(val);
						})
					)
					.subscribe({
						next: (val) => console.log(`Tap: `, val),
						complete: () => console.log('Tap Complete')
					});

				// 自己实现的tap
				const myTap = function (project: (...args: any[]) => any) {
					return function (preObservable: Observable<any>) {
						const nextObservable = new Observable((subscriber) => {
							preObservable.subscribe({
								next: (value) => {
									project(value);
									subscriber.next(value);
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

				source
					.pipe(
						myTap((val) => {
							// tap一般用来处理一些副作用，比如日志记录
							// 对于引用的数据，不要改变其内部属性的值
							// 重，你看这些对数据的处理直接影响到了数据源
							// 其输出是在上面订阅对源数据处理之后的基础上在加了10
							// 运行看一下结果更明显
							val.num = val.num + 10;
							console.log(val);
						})
					)
					.subscribe({
						next: (val) => console.log(`MyTap: `, val),
						complete: () => console.log('MyTap Complete')
					});

				// 重，对于所有的数据源，对于引用类型不建议更改数据，否则会影响所有的订阅，造成数据源的污染
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Tap</button>
		</div>
	);
}

export default TapCp;
