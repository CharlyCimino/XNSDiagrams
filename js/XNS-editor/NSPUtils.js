var DataConversor = new function () {
	var _ref = this;

	function fromJS(data) {
		return utf8_to_b64(JSON.stringify(data || {}));
	}
	function toJS(str) {
		var output = null;
		try {
			output = JSON.parse(b64_to_utf8(str));
		} catch (e) {
			console.log(e.message);
		}
		return output;
	}
	function utf8_to_b64(str) {
		return btoa(unescape(encodeURIComponent(str)));
	}
	function b64_to_utf8(str) {
		return decodeURIComponent(escape(atob(str)));
	}
	Object.defineProperty(_ref, 'fromJS', { "configurable": false, "writable": false, "value": fromJS });
	Object.defineProperty(_ref, 'toJS', { "configurable": false, "writable": false, "value": toJS });
	return _ref;
}
var XNS_META = function () {
	var _ref = this;
	var _obj = [];
	function add(info) {
		_obj.push({ 'd': new Date().toISOString(), 'i': info });
	}
	function setData(data) {
		if (data instanceof Array) {
			_obj = data;
		} else if (!!data) {
			_obj = DataConversor.toJS(data);
		}
	}
	function getData() {
		return DataConversor.fromJS(_obj);
	}
	function getObject() {
		return _obj;
	}
	Object.defineProperty(_ref, 'add', { "configurable": false, "writable": false, "value": add });
	Object.defineProperty(_ref, 'data', { "enumerable": true, "configurable": false, "get": function () { return getData() }, "set": function (x) { setData(x) } });
	Object.defineProperty(_ref, 'object', { "enumerable": true, "configurable": false, "get": function () { return getObject() } });
	if (arguments.length == 1) {
		setData(arguments[0]);
	}
	return _ref;
}
var PopupHandler = function () {
	var _ref = this;
	var _elems = {
		"button": null,
		"popup": null
	}
	var _events = {
		"open": null,
		"close": null
	}
	var _timer = null;
	var _visible = false;
	function init(params) {
		assignValues(params, _elems);
		assignValues(params, _events);
		if (params.visible != undefined) _visible = params.visible;
		if (_elems.button && _elems.popup) {
			setEvent(_elems.button, "click", processClick);
			setEvent(_elems.popup, "mouseenter", overPopup);
			setEvent(_elems.popup, "mouseleave", leavePopup);
		}
	}
	function assignValues(source, target) {
		for (x in target) { if (source[x]) target[x] = source[x]; }
	}
	function processClick() {
		_visible = !_visible;
		var action = _events[(_visible) ? "open" : "close"];
		if (action) action(_elems);
		toggleClass(_elems.popup, "hidden");
		((_visible) ? startTimer : stopTimer)();
	}
	function closePopup() {
		if (_visible) processClick();
	}
	function overPopup() {
		event.stopPropagation();
		if (_timer) stopTimer();
	}

	function leavePopup() {
		event.stopPropagation();
		if (!_timer) startTimer();
	}
	function startTimer() {
		_timer = window.setTimeout(closePopup, 2000);
	}
	function stopTimer() {
		window.clearTimeout(_timer);
		_timer = null;
	}
	init(arguments[0]);
	return _ref;
}