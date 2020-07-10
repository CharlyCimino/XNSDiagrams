var diagramMaker = new XNSDiagramMaker();
var project;
var diagramContainer;
var diagramsMenu;
var statementsMenu;
var PDF;
var urlParams;
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
		drawCorners();
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
	updateDiagram();
}

function collapseEmptys() {
	var emptys = document.querySelectorAll("#actualDiagram .empty");
	for (let e = 0; e < emptys.length; e++) {
		applyClassInNode(false, "expand-empty", emptys[e]);
		applyClassInNode(false, "empty-hover", emptys[e]);
	}
}

function expandEmptys(flag) {
	var emptys = document.querySelectorAll("#actualDiagram .empty");
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
	document.title = project.name;
	project.autor = urlParams.get('usuario') || "Anonimo";
	project.comission = urlParams.get('curso') || "Sin Curso";
	diagramsMenu.clear();
	if (project.diagrams.length != 0) {
		project.diagrams.forEach(diagram => {
			diagramsMenu.addDiagram(diagram);
		});
		diagramContainer.setDiagram(project.diagrams[0]);
		diagramsMenu.setActiveDiagram(project.diagrams[0]);
	}
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
	diagramsMenu.container.style.height = newSectionDiagramHeight;
	var paddingTopSection = parseFloat(window.getComputedStyle(sectionDiagram).paddingTop);
	var paddingBottomSection = parseFloat(window.getComputedStyle(sectionDiagram).paddingBottom);
	this.diagramContainer.container.style.height = newSectionDiagramHeight - paddingTopSection - paddingBottomSection;
}

function addDiagram(diagram) {
	diagramsMenu.addDiagram(diagram);
	project.addDiagram(diagram);
}

function deleteDiagram(diagramItemContainer) {
	diagramsMenu.deleteDiagram(diagramItemContainer);
	var id = diagramItemContainer.firstChild.id;
	var indexOfRemovedDiagram = project.deleteDiagram(id.substring(id.indexOf("NSP")));
	if ("item-" + diagramContainer.actualDiagram.id == id) {
		var idx = (indexOfRemovedDiagram == project.diagrams.length ? indexOfRemovedDiagram - 1 : indexOfRemovedDiagram);
		diagramContainer.setDiagram(project.diagrams[idx]);
		diagramsMenu.setActiveDiagram(project.diagrams[idx]);
	}
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
	setEvent(inputObj, "change", handleChangeInput);
}

function resizeInput(inputObj) {
	var adjust = 0.5;
	inputObj.style.width = (inputObj.value.length + adjust) + "ch";
}

function handleKeyDown(e) {
	resizeInput(this);
}

function handleChangeInput(e) {
	this.setAttribute("value", this.value);
}

function handleChangeDiagramName(e) {
	updateDiagram();
}

function drawCorners() {
	var corners = document.querySelectorAll(".corner")
	for (let index = 0; index < corners.length; index++) {
		const corner = corners[index];
		var ctx = corner.getContext("2d");
		ctx.beginPath();
		if (corner.className.includes("true")) {
			ctx.moveTo(-1, -1);
			ctx.lineTo(corner.width + 1, corner.height + 1);
		} else {
			ctx.moveTo(corner.width + 1, -1);
			ctx.lineTo(-1, corner.height + 1);
		}
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
}

function setHPopup() {
	new PopupHandler({
		"popup": histPopup,
		"button": historialBtn,
		"open": function (elems) { project.fillHistorial(elems.popup) },
		"close": function (elems) { if (elems.popup) elems.popup.innerHTML = "" },
		"visible": false
	})
}

function check() {
	urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('f') != new Date().getDay()) {
		checkOrigin(urlParams);
	}
}

function checkOrigin(urlParams) {
	if (!urlParams.get('usuario') || !urlParams.get('curso') || document.referrer.indexOf("aulavirtual.instituto.ort.edu.ar") < 0) {
		throw "Este editor es solo accesible desde el Aula Virtual del Instituto ORT";
	}
}

function init() {
	try {
		check();
		setEvent(window, "load", reSize);
		setEvent(window, "resize", reSize);
		setEvent(window, "beforeunload", handleClose);
		setTrashEvents();
		project = new NSPProject(urlParams.get('usuario'), urlParams.get('curso'));
		diagramContainer = new DiagramContainer();
		diagramsMenu = new DiagramsMenu();
		statementsMenu = new StatementsMenu();
		PDF = new NSPPDF();
		addDiagram(diagramContainer.actualDiagram);
		resizeInputs();
		handleInputs();
		drawCorners();
		setHPopup();
	} catch (e) {
		clearAllChilds(document.body);
		alert(e);
	}
}

init();