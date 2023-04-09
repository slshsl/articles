import { useEffect, useRef } from 'react';
import { Observable, fromEvent, take } from 'rxjs';

function ColdObservableCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const observable$ = new Observable((subscriber) => {
					subscriber.next('A');
					subscriber.next('B');
					return () => console.log('tear down');
				});

				observable$.subscribe((value) => console.log('subscription1:', value));

				observable$.subscribe((value) => console.log('subscription2:', value));

				// 每个订阅的所有值都是独立生成的,这就是将它们描述为Cold observable的原因
				// 每个订阅都有独立于其他订阅产生的值

				// All values were produced independently for each subscription,and this what describes them as Cold

				// Cold Observables并不总是在订阅之后需要在相同的时间点发出完全相同的值。
				// 在这个例子中，我们将看到一个Cold Observable,它会为每个订阅产生不同的结果
				// 这个例子就是比如发出http请求的observable,假如我们订阅了3次,每个订阅收到结果的时间不同，结果也有可能不同（比如有的正常响应了
				// 有的由于网络原因没有正常响应）

				// The Cold Observables don't always need to emit the exact same values at the same points of time,after subscribing.
				// In this example,we'll see a Cold Observable which will produce different results for each subscription
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Cold Observable</button>
		</div>
	);
}

export default ColdObservableCp;
