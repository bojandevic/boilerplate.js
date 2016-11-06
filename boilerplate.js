window.emptyFn = function() {};

HTMLElement.prototype.up = function(selector) {
	var node = this;
	while(node && node != document.body && !node.matches(selector))
		node = node.parentElement;

	if (node && node != document.body)
		return node;
};

HTMLElement.prototype.query = function(selector) {
	return this.querySelectorAll(selector);
};

HTMLElement.prototype.down = function(selector) {
	return this.querySelector(selector);
};

HTMLElement.prototype.on = HTMLElement.prototype.addEventListener;

window.query = function(selector) {
	return document.body.query(selector);
};

window.down = function(selector) {
	return document.body.down(selector);
};

NodeList.prototype.on = function(eventName, listener) {
	listener = listener || emptyFn;
	this.forEach(function(el) {
		el.on(eventName, listener);
	});
};

HTMLFormElement.prototype.getValues = function() {
	return new FormData(this);
};

function ready(callback) {
	callback = callback || emptyFn;
	if (document.readyState === 'complete') {
		callback();
		return;
	}

	document.addEventListener('DOMContentLoaded', callback);
}
