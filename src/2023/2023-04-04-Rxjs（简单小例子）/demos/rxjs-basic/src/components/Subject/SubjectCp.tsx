import { useEffect, useRef } from 'react';
import { Subject, fromEvent, take, withLatestFrom } from 'rxjs';

function SubjectCp() {
	const btnRef = useRef<HTMLButtonElement>(null);
	const spanBtnRef = useRef<HTMLSpanElement>(null);
	const loginBtnRef = useRef<HTMLButtonElement>(null);
	const logoutBtnRef = useRef<HTMLButtonElement>(null);
	const printBtnRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		const fromEventSubscription = fromEvent(btnRef.current!, 'click')
			.pipe(take(1))
			.subscribe(() => {
				/**测试学习代码*/

				const isLoggedIn$ = new Subject<boolean>();

				fromEvent(loginBtnRef.current!, 'click').subscribe(() =>
					isLoggedIn$.next(true)
				);
				fromEvent(logoutBtnRef.current!, 'click').subscribe(() =>
					isLoggedIn$.next(false)
				);

				isLoggedIn$.subscribe(
					(isLoggedIn) =>
						(spanBtnRef.current!.innerText = isLoggedIn.toString())
				);

				isLoggedIn$.subscribe((isLoggedIn) => {
					logoutBtnRef.current!.style.display = isLoggedIn ? 'block' : 'none';
					loginBtnRef.current!.style.display = !isLoggedIn ? 'block' : 'none';
				});

				// 获取Subject最新的值
				fromEvent(printBtnRef.current!, 'click')
					.pipe(withLatestFrom(isLoggedIn$))
					.subscribe(([event, isLoggedIn]) => console.log(isLoggedIn));
			});
		return () => {
			fromEventSubscription.unsubscribe();
		};
	}, []);

	return (
		<div>
			<button ref={btnRef}>Subject</button>
			<div>
				Logged in:<span ref={spanBtnRef}></span>
				<div>
					<button ref={loginBtnRef}>Login</button>
					<button ref={logoutBtnRef}>Logout</button>
				</div>
				<button ref={printBtnRef}>Print</button>
			</div>
		</div>
	);
}

export default SubjectCp;
