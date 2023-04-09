import { useEffect, useRef } from 'react';
import {
	EMPTY,
	catchError,
	delay,
	fromEvent,
	interval,
	mergeMap,
	of,
	scan,
	take,
	throwError,
	timer
} from 'rxjs';

function MergeMapCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const fetchBtnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 立即发出值， 然后每5秒发出值
				const source$ = timer(0, 5000);
				console.log('App has started');
				source$
					// 允许同一时间存在多个活动的内部订阅
					.pipe(mergeMap(() => interval(500)));
				// 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
				// .subscribe((value) => console.log(value));

				fromEvent(fetchBtnRef.current!, 'click')
					.pipe(
						scan((count) => count + 1, 0),
						mergeMap((value) => {
							const newObservable = () => {
								if (Math.random() > 0.5) {
									return throwError('发生错误');
								} else {
									const delayPeriod = Math.floor(
										Math.random() * (10000 - 2000) + 2000
									);
									return of(`第${value}次发送请求`).pipe(delay(delayPeriod));
								}
							};
							// 对于使用mergeMap，其错误处理要在自身解决，以免传递到下方，造成主订阅完成
							const result = newObservable().pipe(
								catchError((err) => {
									console.log(err);
									return EMPTY;
								})
							);
							return result;
						})
						// 如果把错误处理放到这里，当发生错误使，返回一个立即王城的observable,这个完成的通知会发送到主订阅，
						// 以后再点击也无法输出数据了
						// catchError((err) => {
						// 	console.log(err);
						// 	return EMPTY;
						// })
					)
					.subscribe({
						next: (value) => console.log(value),
						error: (err) => console.log('Error:', err),
						complete: () => console.log('Completed')
					});

				// mergeMap总结
				// 1、mergeMap要返回一个订阅
				// 2、mergeMap返回的订阅不会向后面传递complete通知
				// 3、mergeMap返回的订阅要阻止错误传递，以免造成后续的订阅完成，一般在concatMap返回的订阅加一个catchError
				// 该catchError返回乐意立即完成的订阅即Empty

				// 以上3个特点是所有的扁平化操作符都有的
				// 第4个特点是mergeMap区别于其他的
				// 4.mergeMap中允许同一时间存在多个活动的内部订阅
				// 重：因为它允许多个订阅同时处于活动状态，所以更容易引起内存泄露，特别是如果产生的内部订阅是永远不完成的订阅，例如计时器或则事件，
				// 这个后应该加上take或者takeUntil操作符
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>MergeMap</button>
			<input ref={inputRef} />
			<button ref={fetchBtnRef}>请求</button>
		</div>
	);
}

export default MergeMapCp;
