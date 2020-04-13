var diagramCont = document.getElementById("diagramContainer");
var menuCont = document.getElementById("menuContainer");
var checkColors = document.getElementById("checkColors");
var xnsd = new XNSDiagram();

function drag(e) {
	//e.dataTransfer.effectAllowed = "copy";
	e.dataTransfer.setData("data", this.getAttribute("type"));
}

function drop(ev) {
	ev.preventDefault();

	var type = ev.dataTransfer.getData("data");
	var obj = renderStatement(searchTemplate(type));
	var target = ev.target;
	var empty = newEmptyBlock();
	if (target == diagramCont) {
		target.appendChild(obj);
		target.appendChild(empty);
	} else {
		var parent = target.parentNode;
		parent.insertBefore(obj, target);
		parent.insertBefore(empty, obj);
	}
	resizeInputs();
	handleInputs();
	handleDragLeave(ev);
}

function handleDragOver(ev) {
	if (ev.target.getAttribute("droppable") == "true") {
		if (ev.target.className == "empty") {
			ev.target.style.height = "20px";
		}
		ev.target.classList.add("over");
	}
}

function handleDragLeave(ev) {
	console.log(ev.target.className);
	if (ev.target.classList.contains("empty")) {
		ev.target.style.height = "1px";
	}
	ev.target.classList.remove("over");
}

function searchTemplate(type) {
	// templates in 'templates.js'
	return templates.find(function (element) {
		return element.type == type;
	});
}

function renderStatement(statement) {
	var obj = xnsd[statement.type](statement.data);
	obj.classList.add("Nassi-Shneiderman");
	return obj;
}

function newEmptyBlock() {
	return xnsd.newBlock("empty", undefined, "true");
}

function allowDrop(ev) {
	ev.preventDefault();
	if (ev.target.getAttribute("droppable") == "true") {
		ev.dataTransfer.dropEffect = "copy"; // drop it like it's hot
	}
	else {
		ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
	}
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

function setEvent(domElement, eventName, handler) {
	if (document.body.addEventListener) {
		domElement.addEventListener(eventName, handler);
	} else {
		domElement.attachEvent("on" + eventName, handler);
	}
}

function generateMenuItems() {
	for (let index = 0; index < templates.length; index++) {
		const template = templates[index];
		var obj = renderStatement(template);
		obj.id = "menu-item-" + template.type;
		obj.setAttribute("type", template.type);
		obj.setAttribute("draggable", "true");
		setEvent(obj, "dragstart", drag);
		menuCont.appendChild(newMenuItem(obj));
	}
}

function clearAllChilds(node) {
	while (node.firstChild) {
		node.removeChild(node.lastChild);
	}
}

function newMenuItem(obj) {
	var div = document.createElement("div");
	div.classList.add("menuItem");
	div.appendChild(obj);
	return div;
}

function handleOpen() {
	generateMenuItems();
	resizeInputs();
	handleInputs();
}

function handleInputs() {
	var inputs = document.getElementsByClassName("input-for-statement");
	for (let i = 0; i < inputs.length; i++) {
		handleInput(inputs[i]);
	}
}

function resizeInputs() {
	var inputs = document.getElementsByClassName("input-for-statement");
	for (let i = 0; i < inputs.length; i++) {
		resizeInput(inputs[i]);
	}
}

function handleInput(inputObj) {
	setEvent(inputObj, "keyup", handleKeyDown);
}

function resizeInput(inputObj) {
	var adjust = 0.5;
	inputObj.style.width = (inputObj.value.length + adjust) + "ch";
}

function handleKeyDown(e) {
	resizeInput(this);
}

function handleCheckbox(e) {
	var link = document.getElementById("css/XNSColors.css");
	link.setAttribute("href", (e.target.checked ? link.id : ""));
}

function generateCanvasIn(target, statement) {
	return html2canvas(statement).then(canvas => {
		target.appendChild(canvas);
	});
}

function init() {
	setEvent(diagramCont, "dragenter", handleDragOver);
	setEvent(diagramCont, "dragleave", handleDragLeave);
	setEvent(diagramCont, "drop", drop);
	setEvent(diagramCont, "dragover", allowDrop);
	setEvent(checkColors, "click", handleCheckbox);
	setEvent(window, "load", handleOpen);

}


init();