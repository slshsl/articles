import { useEffect, useRef } from 'react';
import { Observable, fromEvent, of, take } from 'rxjs';

function OfCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				of(1, 2, 3).subscribe({
					next: (value) => console.log(value),
					complete: () => console.log('Complete')
				});

				// 自己实现的of
				const myOf = function (...args: any[]) {
					return new Observable((subscriber) => {
						const length = args.length;
						for (let index = 0; index < length; index++) {
							subscriber.next(args[index]);
						}
						subscriber.complete();
					});
				};

				myOf(1, 2, 3).subscribe({
					next: (value) => console.log(value),
					complete: () => console.log('Complete')
				});
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Of</button>
		</div>
	);
}

export default OfCp;
