import { useEffect, useRef } from 'react';
import { empty, fromEvent, take } from 'rxjs';

function EmptyCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				console.log('start');
				empty().subscribe({
					next: () => console.log('Next'),
					complete: () => console.log('Complete!')
				});
				console.log('end');
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Empty</button>
		</div>
	);
}

export default EmptyCp;
