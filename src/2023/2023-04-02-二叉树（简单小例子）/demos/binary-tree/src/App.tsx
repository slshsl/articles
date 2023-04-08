import { useMemo, useState, useEffect, useRef } from 'react';
import { random, initNodeArr, nodeArrToTree } from './util/index';
import ReactECharts from 'echarts-for-react';
import { fromEvent, Subscription, timer, merge } from 'rxjs';
import { map, scan, startWith, switchMap, take, tap } from 'rxjs/operators';

function App() {
	const initBarBtn = useRef<HTMLButtonElement>();

	const initBarBtnClick$ = useRef<Subscription>();

	const initTreeBtn = useRef<HTMLButtonElement>();

	const initTreeBtnClick$ = useRef<Subscription>();

	const [barData, setBarData] = useState([]);

	const barDataRef = useRef<Array<any>>(barData);

	const initBarData = (count: number) => {
		const result = initNodeArr(count);
		setBarData([...result]);
	};

	const barOption = useMemo(() => {
		barDataRef.current = barData;
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
				switchMap(() =>
					timer(0, 2000).pipe(
						take(barDataRef.current.length),
						map((val) => barDataRef.current[val]),
						startWith([])
					)
				),
				scan((acc, cur) => {
					if (Array.isArray(cur)) {
						return [];
					} else {
						acc.push(cur);
						return acc;
					}
				}, [])
			)
			.subscribe((value) => {
				setTreeData([...value]);
			});

		return () => {
			initBarBtnClick$.current?.unsubscribe();
			initTreeBtnClick$.current?.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={initBarBtn}>初始化</button>
			<button ref={initTreeBtn}>重放生成过程</button>
			{barOption ? (
				<ReactECharts option={barOption} style={{ height: 300 }} />
			) : null}
			{treeOption ? (
				<ReactECharts option={treeOption} style={{ height: 700 }} />
			) : null}
		</div>
	);
}

export default App;
