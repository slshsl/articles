function Greeter(target: Function): void {
	console.log(target.toString());
	target.prototype.greet = function (): void {
		console.log('Hello Semlinker!');
	};
}

@Greeter
class Greeting {
	constructor() {
		// 内部实现
	}
}

console.log(123);
