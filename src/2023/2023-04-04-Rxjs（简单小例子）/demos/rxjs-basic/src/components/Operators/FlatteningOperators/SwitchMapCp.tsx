import { useEffect, useRef } from 'react';
import {
	EMPTY,
	catchError,
	delay,
	fromEvent,
	interval,
	map,
	of,
	switchMap,
	take,
	throwError,
	timer
} from 'rxjs';

function SwitchMapCp() {
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
					// 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
					// 在每次发出时，会取消前一个内部 observable (你所提供函数的结果) 的订阅，然后订阅一个新的 observable
					.pipe(switchMap(() => interval(500)));
				// 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
				// .subscribe((value) => console.log(value));

				fromEvent(fetchBtnRef.current!, 'click')
					.pipe(
						map(() => inputRef.current!.value),
						switchMap((value) => {
							const newObservable = () => {
								if (Math.random() > 0.5) {
									return throwError('发生错误');
								} else {
									return of('发送请求').pipe(delay(2000));
								}
							};
							// 对于使用switchMap，其错误处理要在自身解决，以免传递到下方，造成主订阅完成
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

				// switchMap总结
				// 1、switchMap要返回一个订阅
				// 2、switchMap返回的订阅不会向后面传递complete通知
				// 3、cswitchMap返回的订阅要阻止错误传递，以免造成后续的订阅完成，一般在concatMap返回的订阅加一个catchError
				// 该catchError返回乐意立即完成的订阅即Empty

				// 以上3个特点是所有的扁平化操作符都有的
				// 第4个特点是switchMap区别于其他的
				// 4.switchMap中返回的新的订阅要发出值前会取消上一次返回的订阅
				// 重：switchMap在处理并发的时候是总是处理最新的，取消前一个的
				// 重：在用switch处理http请求时，尽量不要发送改变后台数据的请求，因为在处理并发时，它会取消上一个请求，虽然取消了，但取消的请求仍然可能会到达
				// 服务器，如果取消的请求比新的请求万到达服务器，那就是造成后台数据混乱

				// 对于自动联想搜索非常适合该操作符
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>SwitchMap</button>
			<input ref={inputRef} />
			<button ref={fetchBtnRef}>请求</button>
		</div>
	);
}

export default SwitchMapCp;
