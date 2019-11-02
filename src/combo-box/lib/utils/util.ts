if (typeof Element !== 'undefined' && !Element.prototype.closest) {
	// Polyfill for ie10+

	if (!Element.prototype.matches) {
		// IE uses the non-standard name: msMatchesSelector
		Element.prototype.matches = (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	Element.prototype.closest = function (s: string) {
		let el = this;
		if (!document.documentElement.contains(el)) {
			return null;
		}
		do {
			if (el.matches(s)) {
				return el;
			}
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

export function closest(element: HTMLElement, selector): HTMLElement {
	if (!selector) {
		return null;
	}

	return element.closest(selector);
}
