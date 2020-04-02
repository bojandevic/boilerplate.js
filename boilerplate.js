window.emptyFn = function() {};

HTMLElement.prototype.up = function(selector) {
	let node = this;
	while (node && node != document.body && !node.matches(selector)) {
		node = node.parentElement;
	}

	if (node && node != document.body) {
		return node;
	}
};

HTMLElement.prototype.query = HTMLElement.prototype.querySelectorAll;
HTMLElement.prototype.down  = HTMLElement.prototype.querySelector;
HTMLElement.prototype.on    = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.un    = HTMLElement.prototype.removeEventListener;

window.query = function(selector) {
	return document.body.query(selector);
};

window.down = function(selector) {
	return document.body.down(selector);
};

NodeList.prototype.on = function(eventName, listener, options) {
	listener = listener || emptyFn;
	this.forEach(function(el) {
		el.on(eventName, listener, options);
	});
};

NodeList.prototype.un = function(eventName, listener, options) {
	listener = listener || emptyFn;
	this.forEach(function(el) {
		el.un(eventName, listener, options);
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
