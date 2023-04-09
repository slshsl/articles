import { useEffect, useRef } from 'react';
import { Observable, fromEvent, take } from 'rxjs';

function HotObservableCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const helloBtnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const helloclick$ = new Observable<MouseEvent>((subscriber) => {
					helloBtnRef.current!.addEventListener('click', (event) => {
						subscriber.next(event);
					});
				});

				helloclick$.subscribe((event) =>
					console.log('Sub 1:', event.type, event.x, event.y)
				);

				setTimeout(() => {
					console.log('Subscription 2 starts');
					helloclick$.subscribe((event) =>
						console.log('Sub 2:', event.type, event.x, event.y)
					);
				}, 5080);

				// 对于hot observable，每次订阅同样要执行observable里的逻辑，主要区别的数据的源不是observable内部产生的
				// 数据是来源于点击事件，每次订阅都会给helloButton注册一个点击事件，当按钮点击时，所有订阅者都会收到点击事件产生的数据
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Hot Observable</button>
			<button ref={helloBtnRef}>Hello</button>
		</div>
	);
}

export default HotObservableCp;
