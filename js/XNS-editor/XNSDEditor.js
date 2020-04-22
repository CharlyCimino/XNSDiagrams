var diagramCont = document.getElementById("diagram");
var trash = document.getElementById("trash");
var checkColors = document.getElementById("checkColors");
var localVars;
var methodParameters;
var xnsd = new XNSDiagram();

function drag(e) {
	if (this.template) {
		e.dataTransfer.setData("mode", "copy");
	} else {
		e.dataTransfer.setData("mode", "move");
	}
	e.dataTransfer.setData("template", this.template);
	e.dataTransfer.setData("id", e.target.id);
	viewTrash(true);
}

function drop(ev) {
	ev.preventDefault();
	if (ev.dataTransfer.files.length > 0) {
		importDiagram(ev.dataTransfer.files[0]);
	} else {
		var mode = ev.dataTransfer.getData("mode");
		var template = ev.dataTransfer.getData("template");
		var id = ev.dataTransfer.getData("id");
		var statement;
		var deleteEmpty = true;
		if (mode == "copy") {
			statement = renderStatement(JSON.parse(template));
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
}

function deleteStatement(statement, deleteEmpty) {
	if (deleteEmpty) {
		statement.nextSibling.remove();
	}
	statement.remove();
}

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
	if (ev.target.classList.contains("empty")) {
		toggleClass(ev.target, "empty-hover w3-card-4");
	}
}

function handleDragLeaveInBlock(ev) {
	if (ev.target.classList.contains("empty")) {
		toggleClass(ev.target, "empty-hover w3-card-4");
	}
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

function toggleClass(element, theClass) {
	if (element.className.indexOf(theClass) == -1) {
		element.className += " " + theClass;
	} else {
		element.className = element.className.replace(" " + theClass, "");
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

function clearAllChilds(node) {
	while (node.firstChild) {
		node.removeChild(node.lastChild);
	}
}

function appendDiagram(container, json) {
	diagram = xnsd.render(
		container,
		json.statements ?
			json : {
				statements: [json]
			}
	);
	container.classList.add("w3-panel", "w3-card-4");
	container.json = json;
	return diagram;
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

function reAssignDragEvents() {
	var draggables = Array.from(document.querySelectorAll("#diagram [draggable=true]"));
	for (let d = 0; d < draggables.length; d++) {
		makeDraggable(draggables[d]);
	}
	localVars = document.getElementById("xnsd-local-variable-declaration-8");
	methodParameters = document.getElementById("xnsd-method-parameters-7");
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
	var diagramButtons = Array.from(document.getElementById("diagramButtons").children);
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

function handleOpen(e) {
	appendDiagram(diagramCont, base);
	diagramCont.lastChild.appendChild(newEmptyBlock());
	localVars = document.getElementById("xnsd-local-variable-declaration-8");
	methodParameters = document.getElementById("xnsd-method-parameters-7");
	generateMenuItems();
	handleResize();
}

function reSize() {
	var bodyHeight = parseInt(window.getComputedStyle(document.body).height);
	var headerHeight = parseInt(window.getComputedStyle(document.getElementById("header")).height);
	var footerHeight = parseInt(window.getComputedStyle(document.getElementById("footer")).height);
	var diagramContMargin = parseInt(window.getComputedStyle(diagramCont).marginTop);
	document.body.style.paddingTop = headerHeight;
	document.body.style.paddingBottom = footerHeight;
	var newSectionDiagramHeight = bodyHeight - headerHeight - footerHeight;
	document.getElementById("sectionDiagram").style.height = newSectionDiagramHeight;
	diagramCont.style.height = newSectionDiagramHeight - (diagramContMargin * 2);
}

function handleResize(e) {
	reSize();
}

function init() {
	setEvent(checkColors, "click", handleCheckbox);
	setEvent(window, "load", handleOpen);
	setEvent(window, "resize", handleResize);
	setDiagramEvents();
	setTrashEvents();
	setButtonsEvents();
}

init();