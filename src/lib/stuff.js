
function thefunc (x = 0.1715, y = 0.2134) {
	return -1 * (delta / 2) * (Math.cos(Math.PI * ()) -1)
}

function easeInOutQuint(x) {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function easeInOutCubic(x) {
	return x < 0.5 ? 4  * x * x * x : 1 - Math.pow( -2 * x + 2, 3) / 2;
}

// t: current time, b: begInnIng value, c: change In value, d: duration
easeInOutExpo: function (t = currentstep, b = baseC, c = maxC, d = steps) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},

	
export var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 
			? Math.pow(t, e) : 2 - Math.pow(2 - t, e)
		) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);

//////////////////////////////////

function polyStep(start, end, currentStep, exponent) {
  const totalPoints = 6;
  const change = end - start;

  // Normalize step position (0 → 1)
  const t = currentStep / (totalPoints - 1);

  // Polynomial ease-in-out
  const eased =
    ((t * 2 <= 1
      ? Math.pow(t * 2, exponent)
      : 2 - Math.pow(2 - t * 2, exponent)) / 2);

  return start + change * eased;
}