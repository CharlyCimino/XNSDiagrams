var diagramCont = document.getElementById("diagram");
//var prueba = document.getElementById("prueba");
var trash = document.getElementById("trash");
var menuCont = document.getElementById("menuContainer");
var checkColors = document.getElementById("checkColors");
var localVars;
var methodParameters;
var xnsd = new XNSDiagram();

function drag(e) {
	if (this.id.includes("menu-item")) {
		e.dataTransfer.setData("mode", "copy");
	} else {
		e.dataTransfer.setData("mode", "move");
	}
	e.dataTransfer.setData("template-index", this.getAttribute("template-index"));
	e.dataTransfer.setData("id", e.target.id);
	viewTrash(true);
}

function drop(ev) {
	ev.preventDefault();
	var mode = ev.dataTransfer.getData("mode");
	var templateIndex = ev.dataTransfer.getData("template-index");
	var id = ev.dataTransfer.getData("id");
	var statement;
	var deleteEmpty = true;
	if (mode == "copy") {
		statement = renderStatement(templates[templateIndex]);
		empty = newEmptyBlock();
		deleteEmpty = false;
	} else {
		statement = document.getElementById(id);
		if (statement.className.includes("declaration")) {
			deleteEmpty = false;
			if (statement.className = "parameter-declaration" && !statement.innerHTML.includes(" , ") && methodParameters.children.length > 1) {
				methodParameters.children[1].innerHTML = methodParameters.children[1].innerHTML.substring(" , ".length);
			}
		}
		empty = statement.nextSibling;
	}
	if (ev.target == trash) {
		deleteStatement(statement, deleteEmpty);
		handleDragLeaveInTrash(ev);
	} else {
		insertStatementInTarget(ev.target, statement);
		handleDragLeaveInBlock(ev);
	}
}

function deleteStatement(statement, deleteEmpty) {
	if (deleteEmpty) {
		statement.nextSibling.remove();
	}
	statement.remove();
}

/*
function deleteStatementInJSON(container, index) {
	container.json.splice(index, 1);
}

function insertStatementInJSON(container, index, statement) {
	container.json.splice(index, 0, statement.json);
}

function reBuildJson() {
	diagramCont.json.declaration = diagramCont.firstChild.json;
	diagramCont.json.localVars = diagramCont.firstChild.nextSibling.json;
	diagramCont.json.statements = diagramCont.lastChild.json;
}

function indexOfStatement(statement) {
	var realIndex = indexOfChild(statement);
	return (realIndex - 1) / 2;
}

function generateJSONEachFieldOfBase() {
	diagramCont.firstChild.json = base["declaration"];
	diagramCont.firstChild.nextSibling.json = base["localVars"];
	diagramCont.lastChild.json = base["statements"];
}*/


function insertStatementInTarget(target, statement) {
	var parent = target.parentNode == diagramCont ? target : target.parentNode;
	if (parent.lastChild == target || target.parentNode == diagramCont) {
		parent.appendChild(statement);
		parent.appendChild(empty);
	} else {
		parent.insertBefore(statement, target);
		parent.insertBefore(empty, statement);
	}
}

function handleDragOverInBlock(ev) {
	if (ev.target.getAttribute("droppable") == "true") {
		if (ev.target.className == "empty") {
			ev.target.style.height = "20px";
		}
		ev.target.classList.add("over");
	}
}

function handleDragLeaveInBlock(ev) {
	if (ev.target.classList.contains("empty")) {
		ev.target.style.height = "1px";
	}
	ev.target.classList.remove("over");
}

function handleDragOverInTrash(ev) {
	ev.target.classList.add("trash-over");
}

function handleDragLeaveInTrash(ev) {
	ev.target.classList.remove("trash-over");
}

function viewTrash(flag) {
	if (flag) {
		trash.classList.remove("invisible");
	} else {
		trash.classList.add("invisible");
	}
}

function renderStatement(statement) {
	var obj = xnsd[statement.type](statement.data);
	obj.setAttribute("type", statement.type);
	makeDraggable(obj);
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
		obj.setAttribute("template-index", index);
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

function appendDiagram(container, json) {
	diagram = xnsd.render(
		container,
		json.statements ?
			json : {
				statements: [json]
			}
	);
	container.json = json;
	return diagram;
}

function handleOpen() {
	appendDiagram(diagramCont, base);
	diagramCont.lastChild.appendChild(newEmptyBlock());
	localVars = document.getElementById("xnsd-local-variable-declaration-8");
	methodParameters = document.getElementById("xnsd-method-parameters-7");
	//generateJSONEachFieldOfBase();
	generateMenuItems();
}

function handleCheckbox(e) {
	var link = document.getElementById("css/XNSColors.css");
	link.setAttribute("href", (e.target.checked ? link.id : ""));
}

function handleClickButtonDiagram(ev) {
	var id = ev.target.id;
	var idx = indexOfChild(ev.target);
	obj = xnsd[id](buttonsDiagramTemplates[idx]);
	switch (idx) {
		case 0:
			obj.innerHTML = (methodParameters.hasChildNodes() ? " , " : "") + obj.innerHTML;
			methodParameters.appendChild(obj);
			break;
		case 1:
		case 2:
			localVars.insertBefore(obj, localVars.firstChild);
			break;
		case 3:
		case 4:
			localVars.appendChild(obj);
			break;
	}
	makeDraggable(obj);
}

function handleHideTrash(e) {
	viewTrash(false);
}

function makeDraggable(obj) {
	obj.setAttribute("draggable", "true");
	setEvent(obj, "dragstart", drag);
	setEvent(obj, "dragend", handleHideTrash);
}

function generateCanvasIn(target, statement) {
	return html2canvas(statement).then(canvas => {
		target.appendChild(canvas);
	});
}

function indexOfChild(child) {
	return Array.from(child.parentNode.children).indexOf(child);
}

function setButtonsEvents() {
	var diagramButtons = Array.from(document.getElementById("diagram-buttons").children);
	for (let b = 0; b < diagramButtons.length; b++) {
		const button = diagramButtons[b];
		setEvent(button, "click", handleClickButtonDiagram);
	}
}

function setTrashEvents() {
	setEvent(trash, "dragenter", handleDragOverInTrash);
	setEvent(trash, "dragleave", handleDragLeaveInTrash);
	setEvent(trash, "drop", drop);
	setEvent(trash, "dragover", allowDrop);
}

function setDiagramEvents() {
	setEvent(diagramCont, "dragenter", handleDragOverInBlock);
	setEvent(diagramCont, "dragleave", handleDragLeaveInBlock);
	setEvent(diagramCont, "drop", drop);
	setEvent(diagramCont, "dragover", allowDrop);
}

function init() {
	setEvent(checkColors, "click", handleCheckbox);
	setEvent(window, "load", handleOpen);
	setDiagramEvents();
	setTrashEvents();
	setButtonsEvents();
}

init();