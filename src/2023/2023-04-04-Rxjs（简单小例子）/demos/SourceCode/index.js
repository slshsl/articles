import { Observable } from './Observable.js';
import { take } from './internal/operators/take.js';

const source = new Observable((subscriber) => {
	let count = 0;
	const id = setInterval(() => {
		subscriber.next(count++);
	}, 1000);

	return () => {
		console.log('取消');
		clearInterval(id);
	};
});
const observer = {
	next: (val) => console.log(val),
	complete: (val) => console.log('完成')
};
const sub = source.pipe(take(2)).subscribe(observer);
