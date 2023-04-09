import { useEffect, useRef } from 'react';
import {
	EMPTY,
	Observable,
	catchError,
	concatMap,
	delay,
	fromEvent,
	map,
	of,
	take,
	throwError
} from 'rxjs';

function ConcatMapCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const fetchBtnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const source$ = new Observable((subscriber) => {
					setTimeout(() => subscriber.next('A'), 2000);
					setTimeout(() => subscriber.next('B'), 5000);
				});
				console.log('App has started');
				source$
					.pipe(concatMap((value) => of(1, 2)))
					.subscribe((value) => console.log(value));

				// 通过使用concat map运算符将源observable产生的数据映射到其他observable。
				// by the source observable were mapped into other observables by using
				// concat map operator.

				// 如果原有的observable数据的速度快于隐射的observable的complete完成，则下一个映射的observable必须等到上一个observable
				// 完成，才能向主订阅发出值。

				// 所有映射的observable都不会把complete的通知发送到主订阅，因为一旦把complete通知传递下去，即使原observable再有数据产生，主订阅也不会再收到值了

				// 但是会把映射成的observable的错误转发到主订阅，这也是我们不想看到了，所以对于错误处理要采用内部处理，将错误转换成一个空的立即完成的订阅
				// 由于完成的通知不会转发到主订阅，所以完成了我们的要求

				fromEvent(fetchBtnRef.current!, 'click')
					.pipe(
						map(() => inputRef.current!.value),
						concatMap((value) => {
							const newObservable = () => {
								if (Math.random() > 1) {
									return throwError('发生错误');
								} else {
									return of('发送请求').pipe(delay(2000));
								}
							};
							// 对于使用concatMap，其错误处理要在自身解决，以免传递到下方，造成主订阅完成
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

				// concatMap总结
				// 1、concatMap要返回一个订阅
				// 2、concatMap返回的订阅不会向后面传递complete通知
				// 3、concatMap返回的订阅要阻止错误传递，以免造成后续的订阅完成，一般在concatMap返回的订阅加一个catchError
				// 该catchError返回乐意立即完成的订阅即Empty

				// 以上3个特点是所有的扁平化操作符都有的
				// 第4个特点是concatMap区别于其他的
				// 4.concatMap中返回的新的订阅要发出值必须等到上一次返回的新的订阅完成以后才可以，在此之前都被放到缓存里
				// 连续点击请求按钮可以看出
				// 重：concatMap在处理并发的时候是处理完一个才处理完下一个
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>ConcatMap</button>
			<input ref={inputRef} />
			<button ref={fetchBtnRef}>请求</button>
		</div>
	);
}

export default ConcatMapCp;
