// -----------------------
// BASE DIAGRAM BASE CLASS
// -----------------------
function BaseDiagram(params) {

	if (!params) {
		params = {};
	}
	var _self = Object.create(new ClassConstructor());
	var _graphicType = "base-diagram";
	var _prefix = "ns";
	var _internalID = 0;

	/* --- private properties and methods --- */
	function nextInternalId() {
		return _internalID++;
	}

	function addLanguages() {
		// languages dictionaries
		_self.addEnumProperty("LANGUAGES", ["EN", "ES"]);
		_self.addProperty("SYMBOLS", [{
			"INPUT": "I",
			"OUTPUT": "O",
			"TRUE": "T",
			"FALSE": "F",
			"ANONYMOUS_METHOD": "UNNAMED METHOD"
		},
		{
			"INPUT": "E",
			"OUTPUT": "S",
			"TRUE": "V",
			"FALSE": "F",
			"ANONYMOUS_METHOD": "METODO ANONIMO"
		}
		], {
			"writable": false,
			"configurable": false,
			"enumerable": true,
			"to_clone": true
		});
		_self.addProperty("DEFAULT_LANGUAGE", _self["LANGUAGES"]["ES"], {
			"writable": false
		});
	}

	/* --- published properties and methods --- */
	function _register(name, method) {
		_self.addMethod(name, method);
		Object.defineProperty(_self, name, {
			"configurable": false,
			"writable": false,
			"enumerable": false,
			"value": method
		});
	}

	function _htmlString(value) {
		return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function _newBlock(classname, content, droppable) {
		var elem = document.createElement("div");
		elem.id = _self.prefix + "-" + classname + "-" + nextInternalId();
		if (!droppable) {
			droppable = "false";
		}
		elem.setAttribute("droppable", droppable);
		elem.className = classname;
		if (typeof content != "undefined") {
			if (content instanceof HTMLElement) {
				elem.appendChild(content);
			} else {
				elem.innerHTML = content;
			}
		}
		return elem;
	}

	function _process(container, fieldType, field) {
		if (_self[fieldType]) {
			container.appendChild(_self[fieldType](field));
		}
	}

	function _render(container, definition) {
		container.className = _self.graphicType;
		for (var field in definition) {
			_process(container, field, definition[field]);
		}
		return new DiagramObject({
			"json": definition,
			"html": container,
			"onrender": _self.onrender
		});
	}

	/* --- object construction --- */
	function init() {
		addLanguages();
		_self.addProperty("graphicType", params["graphicType"] || _graphicType);
		_self.addProperty("prefix", params["prefix"] || _prefix);
		_self.addProperty("onrender", params["onrender"]);
		_self.addMethod("register", _register);
		_self.addMethod("htmlString", _htmlString);
		_self.addMethod("newBlock", _newBlock);
		_self.addMethod("process", _process);
		_self.addMethod("render", _render);
		_self.publish(_self);
	}
	init();
	return _self;
}
// ---------------------------
// END BASE DIAGRAM CLASS
// ---------------------------