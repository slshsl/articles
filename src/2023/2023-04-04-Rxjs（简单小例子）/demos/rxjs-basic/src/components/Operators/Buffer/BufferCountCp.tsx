import { useEffect, useRef } from 'react';
import { bufferCount, fromEvent, interval, take } from 'rxjs';

function BufferCountCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				// 创建每1秒发出值的 observable
				const source = interval(1000);
				/*
                    bufferCount 还接受第二个参数，何时开启下一个缓冲区(每隔几个开启下一个缓存区)
                    举例来说，如果第一个参数(bufferSize)是3，而第二个参数(startBufferEvery)是2:
                    第1次 interval 的值:
                    buffer 1: [0]
                    第2次 interval 的值:
                    buffer 1: [0,1]
                    第3次 interval 的值:
                    buffer 1: [0,1,2]
                    buffer 2: [2]
                    第4次 interval 的值:
                    buffer 1: [0,1,2,3] 缓冲数量已达到4，发出缓冲区
                    buffer 2: [2, 3]
                    第5次 interval 的值:
                    buffer 2: [2, 3, 4]
                    buffer 3: [4]
                    第6次 interval 的值:
                    buffer 2: [2, 3, 4, 5] 缓冲数量已达到4，发出缓冲区
                    buffer 3: [4, 5]
			    */

				//  Interval at which to start a new buffer.
				//  For example if startBufferEvery is 2, then a new buffer will be started on every other value from the source.
				//  A new buffer is started at the beginning of the source by default.
				//  If startBufferEvery is not provided or is null, then new buffers are started immediately at the start of the source and when each buffer closes and is emitted.
				const bufferEveryTwo = source.pipe(bufferCount(4, 2));
				// 打印值到控制台
				bufferEveryTwo.subscribe((val) =>
					console.log('Start Buffer Every 2:', val)
				);
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>BufferCount</button>
		</div>
	);
}

export default BufferCountCp;
