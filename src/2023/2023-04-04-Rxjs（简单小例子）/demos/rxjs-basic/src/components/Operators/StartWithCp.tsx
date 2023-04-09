import { useEffect, useRef } from 'react';
import { fromEvent, startWith, take, timer } from 'rxjs';

function StartWithCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const source = timer(2000, 2000);

				source
					.pipe(startWith(0), take(10))
					.subscribe((val) => console.log(val));
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>StartWith</button>
		</div>
	);
}

export default StartWithCp;
