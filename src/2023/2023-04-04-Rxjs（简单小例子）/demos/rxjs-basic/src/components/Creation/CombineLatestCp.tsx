import { useEffect, useRef } from 'react';
import { fromEvent, take } from 'rxjs';

function CombineLatestCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/
				// 当任意 observable 发出值时，发出每个 observable 的最新值。
				// combineLatest 直到每个 observable 都至少发出一个值后才会发出初始值。
				// 使用场景，对于多个observable产生的值，只要一个有新的值产生，就需要对利用所有observable的最后一次的值进行计算或者别的
				// 比如计算器，只要一个变化，并且所有的输入都有值了，再去计算结果；如果其中一个没产生值，也不会计算
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>CombineLatest</button>
		</div>
	);
}

export default CombineLatestCp;
