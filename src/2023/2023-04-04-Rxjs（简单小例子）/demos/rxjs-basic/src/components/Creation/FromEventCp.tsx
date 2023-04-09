import { useEffect, useRef } from 'react';
import { Observable, fromEvent, take } from 'rxjs';

function FromEventCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const helloBtnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				//
				const fromEventSubscription = fromEvent(
					helloBtnRef.current!,
					'click'
				).subscribe({
					next: (event) => console.log('fromEvent:', event.type)
				});

				// 自己实现的fromEvent
				const myFromEvent = function (ele: HTMLElement, eventName: string) {
					return new Observable<Event>((subscriber) => {
						const calFn = (event: Event) => {
							subscriber.next(event);
						};
						ele.addEventListener(eventName, calFn);
						return () => {
							ele.removeEventListener(eventName, calFn);
						};
					});
				};

				const myFromEventSubscription = myFromEvent(
					helloBtnRef.current!,
					'click'
				).subscribe({
					next: (event) => console.log('myFromEvent:', event.type)
				});

				setTimeout(() => {
					fromEventSubscription.unsubscribe();
					myFromEventSubscription.unsubscribe();
				}, 5000);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>FromEvent</button>
			<button ref={helloBtnRef}>Hello</button>
		</div>
	);
}

export default FromEventCp;
