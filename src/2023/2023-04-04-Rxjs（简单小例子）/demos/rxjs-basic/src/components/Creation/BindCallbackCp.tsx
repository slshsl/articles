import { useEffect, useRef } from 'react';
import { fromEvent, take, bindCallback } from 'rxjs';

function BindCallbackCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const someFunction = (cb: any) => {
					setTimeout(() => {
						cb(5, 'some string', { someProperty: 'someValue' });
					}, 5000);
				};

				const boundSomeFunction = bindCallback(
					someFunction,
					(...args: any[]) => {
						console.log(args);
						return args[0];
					}
				);
				boundSomeFunction().subscribe((values) => {
					console.log(values); // [22, 2]
				});
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>BindCallback</button>
		</div>
	);
}

export default BindCallbackCp;
