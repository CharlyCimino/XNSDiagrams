var mainbox = document.getElementById("diagramContainer");
var xnsd = new XNSDiagram();
var target = document.getElementById("editor");
var alert = document.getElementById("alert");
var divRender;
var w;

function formatCode() {
	aceEditor.session.off("change", codeEdited);
	var cursor = aceEditor.getCursorPosition();
	var code = aceEditor.getValue();
	aceEditor.setValue(js_beautify(code));
	aceEditor.moveCursorToPosition(cursor);
	aceEditor.clearSelection();
	aceEditor.session.on("change", codeEdited);
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

function insertExample(obj, elDiv) {
	elDiv.innerHTML = "";
	//insertHeader(mainbox, title);
	/*var diabox = document.createElement("div");
	diabox.className = "diabox";
	mainbox.appendChild(diabox);*/
	var diagram = xnsd.render(
		elDiv,
		obj.statements ?
		obj : {
			statements: [obj]
		}
	);
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
		diagramStructure = JSON.parse(diagramStructure);
		alert.innerText = "\u2713 Sin errores";
		alert.classList.remove("alert-danger");
		alert.classList.add("alert-success");
	} catch (e) {
		alert.innerText = "\u2297 " + e;
		alert.classList.remove("alert-success");
		alert.classList.add("alert-danger");
	}
	insertExample(diagramStructure, mainbox);
	localStorage.diagramStructure = JSON.stringify(diagramStructure, null, 2);
}

function targetEmpty() {
	return aceEditor.getValue() == "";
}

function fillTemplates() {
	var navbar = document.getElementById("theNavBar");
	var buttonRenderNewWindow = document.createElement("button");
	buttonRenderNewWindow.classList.add("btn", "btn-danger");
	buttonRenderNewWindow.innerHTML = "Render en nueva ventana";
	buttonRenderNewWindow.id = "buttonRenderNewWindow";
	for (var cat in categories) {
		var liNavItem = document.createElement("li");
		var buttonDropDown = document.createElement("button");
		var divDropDownMenu = document.createElement("div");
		liNavItem.classList.add("nav-item", "dropdown");
		buttonDropDown.classList.add("btn", "btn-primary", "dropdown-toggle");
		divDropDownMenu.classList.add("dropdown-menu");
		buttonDropDown.innerHTML = cat;
		buttonDropDown.href = "#";
		buttonDropDown.setAttribute("data-toggle", "dropdown");
		liNavItem.appendChild(buttonDropDown);
		liNavItem.appendChild(divDropDownMenu);
		for (var t in categories[cat]) {
			var button = document.createElement("button");
			button.classList.add("dropdown-item");
			button.innerHTML = t;
			button.content = categories[cat][t];
			var handler = function (e) {
				var value = (e.target || e.srcElement).content;
				var name = (e.target || e.srcElement).innerHTML;
				value = JSON.stringify(value, null, 2);
				aceEditor.insert(value);
				//insertAtCursor(target, value);
				//checkAndCompile();
			};
			setEvent(button, "click", handler);
			divDropDownMenu.appendChild(button);
		}
		navbar.appendChild(liNavItem);
	}
	navbar.appendChild(buttonRenderNewWindow);
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

function codeEdited() {
	render();
	setTimeout(formatCode, 100);
}

function renderInNewWindow() {
	w = window.open("render.html");
	divRender = w.document.getElementById("divRender");
	document.getElementById("divRender").classList.add("invisible");
	document.getElementById("divEditor").classList.remove("col-xl-6", "col-lg-6", "col-md-6", "col-sm-6");
	document.getElementById("divEditor").classList.add("col-xl-12", "col-lg-12", "col-md-12", "col-sm-12");
	document.getElementById("main").classList.remove("container-fluid");
	document.getElementById("main").classList.add("container");
}

function setEvents() {
	aceEditor.session.onchange = codeEdited;
	document.getElementById("buttonRenderNewWindow").onclick = renderInNewWindow;
}

function init() {
	localStorage.clear();
	fillTemplates();
	aceEditor.insert(JSON.stringify(templateBase, null, 2));
	codeEdited();
	setEvents();
}

init();