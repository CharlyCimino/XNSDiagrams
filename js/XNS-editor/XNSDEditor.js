var mainbox = document.getElementById("diagramContainer");
var xnsd = new XNSDiagram();
var target = document.getElementById("editor");
var alert = document.getElementById("alert");
var theJson = templates.base;

function formatCode() {
	aceEditor.session.off('change', nuevoCambio);
	var cursor = aceEditor.getCursorPosition();
	var code = aceEditor.getValue();
	aceEditor.setValue(js_beautify(code));
	aceEditor.moveCursorToPosition(cursor);
	aceEditor.clearSelection();
	aceEditor.session.on('change', nuevoCambio);
}

function insertAtCursor(name, value) {
	//var pos = JSON.parse(aceEditor.getValue());
	//console.log(value);
	/*if () {
		elem.value = elem.value.substring(0, position) +
			value + elem.value.substring(position, elem.value.length);
	} else if (document.selection) {
		elem.focus();
		sel = document.selection.createRange();
		sel.text = value;
	} else if (elem.selectionStart || elem.selectionStart == '0') {
		elem.value = elem.value.substring(0, elem.selectionStart) +
			value + elem.value.substring(elem.selectionEnd, elem.value.length);
	} else {
		elem.value += value;
	}*/
	//aceEditor.insert(value);
}

function toJSON(codeStr) {
	var codeJson = {};
	try {
		codeJson = JSON.parse(codeStr);
	} catch (e) {
		console.log(e);
	}
	return codeJson;
}


function insertHeader(elem, description) {
	var title = document.createElement("h2");
	title.className = "external";
	title.innerHTML = description + "<br/>&nbsp";
	elem.appendChild(title);
}

function insertExample(obj) {
	mainbox.innerHTML = "";
	//insertHeader(mainbox, title);
	var diabox = document.createElement("div");
	diabox.className = "diabox";
	mainbox.appendChild(diabox);
	var diagram = xnsd.render(diabox, (obj.statements) ? obj : {
		"statements": [obj]
	});
	/*diagram.createImage(function (img) {
		img.className = "output";
		mainbox.appendChild(img);
	});*/
}

function setEvent(domElement, eventName, handler) {
	if (document.body.addEventListener) {
		domElement.addEventListener(eventName, handler);
	} else {
		domElement.attachEvent("on" + eventName, handler);
	}
}

function render() {
	//var diagramTitle = document.getElementById("dtitle").value;
	var diagramStructure = aceEditor.getValue();
	try {
		var diagramStructure = JSON.parse(diagramStructure);
		alert.classList.add("invisible");
	} catch (e) {
		alert.innerText = e;
		alert.classList.remove("invisible");
	}
	insertExample(diagramStructure);
}

function targetEmpty() {
	return aceEditor.getValue() == "";
}

function fillTemplates() {
	var buttons = document.getElementById("buttons");
	for (var t in templates) {
		var button = document.createElement("button");
		button.innerHTML = t;
		button.content = templates[t];
		button.classList.add("btn");
		button.classList.add("btn-primary");
		var handler = function (e) {
			var value = (e.target || e.srcElement).content;
			var name = (e.target || e.srcElement).innerHTML;
			value = JSON.stringify(value, null, 2);
			aceEditor.insert(value);
			//insertAtCursor(target, value);
			//checkAndCompile();
		};
		setEvent(button, "click", handler);
		buttons.appendChild(button);
	}
}


//target.onblur = checkAndCompile();
//var compileRule = /Unexpected (token ([{,:])|string) in JSON at position ([0-9]+)/g



function reparse() {
	var text = target.value;
	if (text) {
		var obj = JSON.parse(text);
		target.value = JSON.stringify(obj, null, 2);
		render();
	}
}

function nuevoCambio() {
	render();
	setTimeout(formatCode, 100);
}

//setEvent(document.getElementById("genButton"), "click", formatCode);
//setEvent(target, "change", nuevoCambio);

fillTemplates();
aceEditor.insert(JSON.stringify(templates.base, null, 2));
nuevoCambio();
aceEditor.session.on('change', nuevoCambio);