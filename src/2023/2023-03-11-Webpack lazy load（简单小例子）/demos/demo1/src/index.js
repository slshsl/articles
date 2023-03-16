const oBtn = document.querySelector('button');
oBtn.onclick = async function () {
	const { message } = await import('./lazy.js');
	oBtn.textContent = message;
};
