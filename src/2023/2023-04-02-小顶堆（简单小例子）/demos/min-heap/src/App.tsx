import { useMemo, useState, useEffect, useRef } from 'react';
import {
	random,
	initNodeArr,
	nodeArrToTree,
	MinHeap,
	generateNode
} from './util/index';
import ReactECharts from 'echarts-for-react';
import { fromEvent, Subscription, timer, merge } from 'rxjs';
import { concatMap, map, startWith, switchMap, take } from 'rxjs/operators';

import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

import { operate } from 'rxjs/internal/util/lift';

function App() {
	const initBarBtn = useRef<HTMLButtonElement>();

	const initBarBtnClick$ = useRef<Subscription>();

	const initTreeBtn = useRef<HTMLButtonElement>();

	const initTreeBtnClick$ = useRef<Subscription>();

	const pushNodeBtn = useRef<HTMLButtonElement>();

	const pushNodeBtnClick$ = useRef<Subscription>();

	const popNodeBtn = useRef<HTMLButtonElement>();

	const popNodeBtnClick$ = useRef<Subscription>();

	const [barData, setBarData] = useState([]);

	const minHeapRef = useRef<MinHeap>();

	const initBarData = (count: number) => {
		const result = initNodeArr(count);
		setBarData([...result]);
	};

	const barOption = useMemo(() => {
		minHeapRef.current = new MinHeap(barData);
		if (barData.length) {
			const result = {
				xAxis: {
					type: 'category',
					data: barData.map((item) => item.name)
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: barData,
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							fontWeight: 'bold'
						}
					}
				],
				tooltip: {
					show: true,
					trigger: 'axis'
				}
			};
			return result;
		} else {
			return null;
		}
	}, [barData]);

	const [treeData, setTreeData] = useState([]);

	const treeOption = useMemo(() => {
		if (treeData.length) {
			const data = nodeArrToTree(treeData);
			const result = {
				tooltip: {
					trigger: 'item',
					triggerOn: 'mousemove'
				},
				series: [
					{
						type: 'tree',

						data: [data],

						left: '2%',
						right: '2%',
						top: '8%',
						bottom: '20%',

						symbol: 'roundRect',
						symbolSize: 30,

						orient: 'vertical',

						expandAndCollapse: false,

						label: {
							position: 'top',
							rotate: -90,
							verticalAlign: 'middle',
							align: 'right',
							fontSize: 9
						},

						leaves: {
							label: {
								position: 'bottom',
								rotate: -90,
								verticalAlign: 'middle',
								align: 'left'
							}
						},

						animationDurationUpdate: 750
					}
				]
			};
			return result;
		} else {
			return null;
		}
	}, [treeData]);

	useEffect(() => {
		const initBarBtnClickSource = fromEvent<MouseEvent>(
			initBarBtn.current,
			'click'
		);

		initBarBtnClick$.current = initBarBtnClickSource.subscribe(() => {
			initBarData(random(1, 20));
		});

		const initTreeBtnClickSource = fromEvent<MouseEvent>(
			initTreeBtn.current,
			'click'
		);

		initTreeBtnClick$.current = merge(
			initBarBtnClickSource,
			initTreeBtnClickSource
		)
			.pipe(
				switchMap(() => {
					return timer(0, 2000).pipe(
						take(minHeapRef.current.historyBufferLength),
						map((val) => minHeapRef.current.historyBuffer[val]),
						startWith([])
					);
				})
			)
			.subscribe((value) => {
				setTreeData([...value]);
			});

		const pushNodeBtnClickSource = fromEvent<MouseEvent>(
			pushNodeBtn.current,
			'click'
		);

		pushNodeBtnClick$.current = pushNodeBtnClickSource
			.pipe(
				concatMap(() => {
					const historyBufferLength = minHeapRef.current.historyBufferLength;
					const node = generateNode(random(1, 20));
					minHeapRef.current.pushWithHistory(node);
					return timer(0, 2000).pipe(
						take(minHeapRef.current.historyBufferLength - historyBufferLength),
						map(
							(val) =>
								minHeapRef.current.historyBuffer[historyBufferLength + val]
						)
					);
				})
			)
			.subscribe((value) => {
				setTreeData([...value]);
			});

		const popNodeBtnClickSource = fromEvent<MouseEvent>(
			popNodeBtn.current,
			'click'
		);

		popNodeBtnClick$.current = popNodeBtnClickSource
			.pipe(
				concatMap(() => {
					const historyBufferLength = minHeapRef.current.historyBufferLength;
					minHeapRef.current.popWithHistory();
					return timer(0, 2000).pipe(
						take(minHeapRef.current.historyBufferLength - historyBufferLength),
						map(
							(val) =>
								minHeapRef.current.historyBuffer[historyBufferLength + val]
						)
					);
				})
			)
			.subscribe((value) => {
				setTreeData([...value]);
			});

		return () => {
			initBarBtnClick$.current?.unsubscribe();
			initTreeBtnClick$.current?.unsubscribe();
			pushNodeBtnClick$.current?.unsubscribe();
			popNodeBtnClick$.current?.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={initBarBtn}>初始化</button>
			<button ref={initTreeBtn}>重放生成过程</button>
			<button ref={pushNodeBtn}>添加</button>
			<button ref={popNodeBtn}>移除</button>
			{barOption ? (
				<ReactECharts option={barOption} style={{ height: 300 }} />
			) : null}
			{treeOption ? (
				<ReactECharts
					option={treeOption}
					notMerge={true}
					lazyUpdate={true}
					style={{ height: 700 }}
					opts={{ renderer: 'svg' }}
				/>
			) : null}
		</div>
	);
}

export default App;
