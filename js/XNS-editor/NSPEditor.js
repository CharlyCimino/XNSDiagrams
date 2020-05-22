var diagramMaker = new XNSDiagramMaker();
var project;
var diagramContainer;
var diagramsMenu;
var statementsMenu;
var trash = document.getElementById("trash");

function drag(e) {
	if (this.template) {
		e.dataTransfer.setData("mode", "copy");
	} else {
		e.dataTransfer.setData("mode", "move");
	}
	e.dataTransfer.setData("template", this.template);
	e.dataTransfer.setData("id", e.target.id);
	setTimeout(() => {
		applyClassInNode(false, "invisible", trash);
		expandEmptys(true);
	}, 100);
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
				diagramContainer.makeButtonAddInSwitch(statement);
			}
		} else {
			statement = document.getElementById(id);
			if (statement.className.includes("declaration")) {
				deleteEmpty = false;
				if (statement.className == "parameter-declaration" && !statement.innerHTML.includes(" , ") && diagramContainer.methodParameters.children.length > 1) {
					diagramContainer.methodParameters.children[1].innerHTML = diagramContainer.methodParameters.children[1].innerHTML.substring(" , ".length);
				}
			}
			empty = statement.nextSibling;
		}
		if (ev.target == trash) {
			deleteStatement(statement, deleteEmpty);
			handleDragLeaveInTrash(ev);
		} else {
			if (!statement.className.includes("declaration")) {
				diagramContainer.insertStatementInTarget(ev.target, statement);
				handleDragLeaveInBlock(ev);
			} else {
				collapseEmptys();
			}
		}
		resizeInputs();
		handleInputs();
	}
}

function handleDragOverInBlock(ev) {
	if (ev.target.classList.contains("empty")) {
		toggleClass(ev.target, "empty-hover");
	}
}

function handleDragLeaveInBlock(ev) {
	if (ev.target.classList.contains("empty")) {
		toggleClass(ev.target, "empty-hover");
	}
}

function handleDragEnd(e) {
	applyClassInNode(true, "invisible", trash);
	expandEmptys(false);
}

function collapseEmptys() {
	var emptys = document.querySelectorAll("#diagram .empty");
	for (let e = 0; e < emptys.length; e++) {
		applyClassInNode(false, "expand-empty", emptys[e]);
		applyClassInNode(false, "empty-hover", emptys[e]);
	}
}

function expandEmptys(flag) {
	var emptys = document.querySelectorAll("#diagram .empty");
	for (let e = 0; e < emptys.length; e++) {
		applyClassInNode(flag, "expand-empty", emptys[e]);
	}
}

function deleteStatement(statement, deleteEmpty) {
	if (deleteEmpty) {
		statement.nextSibling.remove();
	}
	statement.remove();
}

function renderStatement(statement) {
	var obj = diagramMaker[statement.type](statement.data);
	obj.setAttribute("type", statement.type);
	makeDraggable(obj);
	return obj;
}

function newEmptyBlock() {
	return diagramMaker.newBlock("empty", undefined, "true");
}

function appendDiagram(container, json) {
	diagram = diagramMaker.render(
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

function makeDraggable(obj) {
	obj.setAttribute("draggable", "true");
	setEvent(obj, "dragstart", drag);
	setEvent(obj, "dragend", handleDragEnd);
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

function setTrashEvents() {
	setEvent(trash, "dragenter", handleDragOverInTrash);
	setEvent(trash, "dragleave", handleDragLeaveInTrash);
	setEvent(trash, "drop", drop);
	setEvent(trash, "dragover", allowDrop);
}

function updateBeforeOpenProject() {
	clearAllChilds(diagramsContainer);
	actualDiagram = project.diagrams[0];
	setActualDiagram();
	project.diagrams.forEach(diagram => {
		appendDiagramInContainer(diagram);
	});
	console.log(project);
}

function reSize() {
	var headerHeight = parseFloat(window.getComputedStyle(document.getElementById("header")).height);
	var footerHeight = parseFloat(window.getComputedStyle(document.getElementById("footer")).height);
	var sectionDiagram = document.getElementById("sectionDiagram");
	var menuContainer = document.getElementById("menuContainer");
	document.body.style.paddingTop = headerHeight;
	document.body.style.paddingBottom = footerHeight;
	var bodyHeight = parseFloat(window.getComputedStyle(document.body).height);
	var newSectionDiagramHeight = bodyHeight - headerHeight - footerHeight - 16;
	sectionDiagram.style.height = newSectionDiagramHeight;
	menuContainer.style.height = newSectionDiagramHeight;
	var paddingTopSection = parseFloat(window.getComputedStyle(sectionDiagram).paddingTop);
	var paddingBottomSection = parseFloat(window.getComputedStyle(sectionDiagram).paddingBottom);
	this.diagramContainer.container.style.height = newSectionDiagramHeight - paddingTopSection - paddingBottomSection;
}

function addDiagram(diagram) {
	diagramsMenu.addDiagram(diagram);
	project.addDiagram(diagram);
}

function updateDiagram() {
	diagramContainer.refresh();
	diagramsMenu.updateDiagram(diagramContainer.actualDiagram);
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
	setEvent(inputObj, "input", handleKeyDown);
}

function resizeInput(inputObj) {
	var adjust = 0.5;
	inputObj.style.width = (inputObj.value.length + adjust) + "ch";
}

function handleKeyDown(e) {
	resizeInput(this);
}

function init() {
	setEvent(window, "load", reSize);
	setEvent(window, "resize", reSize);
	setTrashEvents();
	project = new NSPProject("Proyecto sin título", []);
	diagramContainer = new DiagramContainer();
	diagramsMenu = new DiagramsMenu();
	statementsMenu = new StatementsMenu()
	addDiagram(diagramContainer.actualDiagram);
	resizeInputs();
	handleInputs();
}

init();