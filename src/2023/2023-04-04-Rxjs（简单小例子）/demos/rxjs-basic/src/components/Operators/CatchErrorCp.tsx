import { useEffect, useRef } from 'react';
import {
	Observable,
	catchError,
	fromEvent,
	map,
	of,
	take,
	throwError
} from 'rxjs';

function CatchErrorCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 发出错误
				const source = throwError('This is an error!');
				// 优雅地处理错误，并返回带有错误信息的 observable
				source
					//记住要在 catch 函数中返回一个 observable !为什么？新版应该没这个限制？
					.pipe(catchError((val) => `I caught: ${val} by catchError`))
					.subscribe((val) => console.log(val));

				// 自己实现的catchError
				const myCatchError = function (project: (...args: any[]) => any) {
					return function (preObservable: Observable<any>) {
						const nextObservable = new Observable((subscriber) => {
							preObservable.subscribe({
								next: (value) => {
									subscriber.next(value);
								},
								complete: () => {
									console.log(123);
									subscriber.complete();
								},
								error: (err) => {
									const temp = project(err);
									if (
										typeof temp === 'object' &&
										typeof temp.subscribe === 'function'
									) {
										temp.subscribe((val: any) => {
											subscriber.next(val);
										});
									} else {
										subscriber.next(temp);
									}
								}
							});
						});

						return nextObservable;
					};
				};

				source
					.pipe(
						myCatchError((val) => of(`I caught: ${val} by mycatchError`)),
						map((val) => {
							return val + '!!!!!!!!!!!!!!!!!!';
						})
					)
					.subscribe((val) => console.log(val));
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>CatchError</button>
		</div>
	);
}

export default CatchErrorCp;
