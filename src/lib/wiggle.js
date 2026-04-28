// wiggle.js
function dampedWave(t, X, amplitude, wiggles) {
	const decay = wiggles / 5;
	const frequency = wiggles * Math.PI;
	return X * Math.exp(-decay * t) * Math.sin(frequency * t) * amplitude;
}

export function createWiggle({ peak = 5, amplitude = 1, wiggles = 4, duration = 1000 } = {}) {
	return function play(onValue) {
		const start = performance.now();

		function frame(now) {
			const t = (now - start) / duration;
			if (t >= 1) {
				onValue(0);
				return;
			}
			onValue(dampedWave(t, peak, amplitude, wiggles));
			requestAnimationFrame(frame);
		}

		requestAnimationFrame(frame);
	};
}
