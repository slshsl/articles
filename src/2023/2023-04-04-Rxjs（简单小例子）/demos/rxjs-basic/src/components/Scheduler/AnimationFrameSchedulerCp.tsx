import { useEffect, useRef } from 'react';
import { fromEvent, take, animationFrameScheduler } from 'rxjs';

function AnimationFrameSchedulerCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				animationFrameScheduler.schedule(
					function (width: any) {
						divRef.current!.style.width = width + 'px';

						this.schedule(width + 1); // `this` references currently executing Action,
						// which we reschedule with new state
					},
					0,
					0
				);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<div
				ref={divRef}
				style={{ backgroundColor: 'red', height: '10px', width: '10px' }}
			></div>
			<button ref={btnRef}>AsapScheduler</button>
		</div>
	);
}

export default AnimationFrameSchedulerCp;
