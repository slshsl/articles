import { useEffect, useRef } from 'react';
import { fromEvent, fromEventPattern, take } from 'rxjs';

function FromEventPatternCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const helloBtnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				function addClickHandler(handler: any) {
					helloBtnRef.current!.addEventListener('click', handler);
				}

				function removeClickHandler(handler: any) {
					helloBtnRef.current!.removeEventListener('click', handler);
				}

				const clicks = fromEventPattern(addClickHandler, removeClickHandler);
				clicks.subscribe((x) => console.log(x));
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>FromEventPattern</button>
			<button ref={helloBtnRef}>Hello</button>
		</div>
	);
}

export default FromEventPatternCp;
