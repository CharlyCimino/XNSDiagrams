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
			if (statement.getAttribute("type") == "switch") {
				makeButtonAddInSwitch(statement);
			}
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

function makeButtonAddInSwitch(switchBlock) {
	var cases = Array.from(switchBlock.lastChild.children);
	for (let c = 0; c < cases.length; c++) {
		appendButtonsInCase(cases[c]);
	}
}

function appendButtonsInCase(theCase) {
	// theCase.firstChild --> test-value
	theCase.firstChild.appendChild(newSwitchCaseButton("add"));
	theCase.firstChild.appendChild(newSwitchCaseButton("remove"));
}

function newSwitchCaseButton(type) {
	var btn = document.createElement("a");
	btn.setAttribute("type", "button");
	btn.classList.add("switch-button", "switch-" + type + "-button");
	if (type == "add") {
		btn.innerHTML = '<i class="fa fa-sm fa-plus"></i>';
		setEvent(btn, "click", handleAddCaseSwitch);
	} else {
		btn.innerHTML = '<i class="fa fa-sm fa-minus"></i>';
		setEvent(btn, "click", handleRemoveCaseSwitch);
	}
	return btn;
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
	container.classList.add("w3-card-4");
	container.json = json;
	return diagram;
}

function reAssignSwitchEvents() {
	var switchAddButtons = Array.from(document.querySelectorAll("#diagram .switch-add-button"));
	var switchRemoveButtons = Array.from(document.querySelectorAll("#diagram .switch-remove-button"));
	for (let a = 0; a < switchAddButtons.length; a++) {
		setEvent(switchAddButtons[a], "click", handleAddCaseSwitch);
	}
	for (let r = 0; r < switchRemoveButtons.length; r++) {
		setEvent(switchRemoveButtons[r], "click", handleRemoveCaseSwitch);
	}
}

function reAssignDragEvents() {
	var draggables = Array.from(document.querySelectorAll("#diagram [draggable=true]"));
	for (let d = 0; d < draggables.length; d++) {
		makeDraggable(draggables[d]);
	}
}

function bindVarsAndSignature() {
	localVars = document.getElementById("xnsd-local-variable-declaration-8");
	methodParameters = document.getElementById("xnsd-method-parameters-7");
}

function makeDraggable(obj) {
	obj.setAttribute("draggable", "true");
	setEvent(obj, "dragstart", drag);
	setEvent(obj, "dragend", handleHideTrash);
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

function setOtherEvents() {
	setEvent(checkColors, "click", handleCheckColors);
	setEvent(checkObjects, "click", handleCheckObjects);
}

function init() {
	setEvent(window, "load", handleOpen);
	setEvent(window, "resize", handleResize);
	setDiagramEvents();
	setTrashEvents();
	setButtonsEvents();
	setOtherEvents();
}

init();