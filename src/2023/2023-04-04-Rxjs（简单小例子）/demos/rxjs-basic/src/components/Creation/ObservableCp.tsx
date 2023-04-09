import { useEffect, useRef } from 'react';
import { Observable, fromEvent, take } from 'rxjs';

function ObservableCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const interval$ = new Observable<number>((subscriber) => {
					let counter = 1;
					const intervalId = setInterval(() => {
						console.log('Emitted', counter);
						subscriber.next(counter++);
					}, 2000);
					// tear down清理函数
					// 如果不反悔清理函数，subscription.unsubscribe的作用是取消观察者的订阅，即
					// subscriber.next(counter++)不会再发出通知给观察者，但onsole.log('Emitted', counter)依然输出
					// 所以需要返回一个清理函数
					return () => clearInterval(intervalId);
				});

				const observer = {
					next: (value: number) => console.log(value)
				};

				const subscription = interval$.subscribe(observer);

				console.log(subscription);

				setTimeout(() => {
					console.log('Unsubscribe');
					// 必须定义tear down清理函数才会正常取消订阅
					subscription.unsubscribe();
				}, 7088);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Observable</button>
		</div>
	);
}

export default ObservableCp;
