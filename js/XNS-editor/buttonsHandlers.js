function handleClickButtonDiagram(ev) {
	var id = ev.target.id;
	var idx = indexOfChild(ev.target);

	obj = diagramMaker[id](buttonsDiagramTemplates[idx]);
	makeDraggable(obj);
	switch (idx) {
		case 0:
			obj.innerHTML = (diagramContainer.methodParameters.hasChildNodes() ? " , " : "") + obj.innerHTML;
			diagramContainer.methodParameters.appendChild(obj);
			break;
		case 1:
			diagramContainer.localVars.insertBefore(obj, diagramContainer.localVars.firstChild);
			break;
		default:
			diagramContainer.localVars.appendChild(obj);
			break;
	}
	handleInputs()
	resizeInputs();
}

function handleCheckColors(e) {
	var link = document.getElementById("css/NSPColors.css");
	link.setAttribute("href", (e.target.checked ? link.id : ""));
}

function handleCheckObjects(e) {
	classDec = document.getElementById("xnsd-class-declaration-1");
	modifiers = document.getElementById("xnsd-method-modifiers-4");
	methodName = document.getElementById("xnsd-method-name-6");
	toggleClass(classDec, "invisible");
	toggleClass(modifiers, "invisible");
	if (e.target.checked) {
		methodName.innerHTML = "método";
	} else {
		methodName.innerHTML = "función";
	}
}

function handleAllViewDiagrams(e) {
	alert("Falta implementar ver todos los diagramas");
}

function handleClickInDiagramItem(e) {
	updateDiagram();
	diagramContainer.setDiagram(this.diagram);
	diagramsMenu.setActiveDiagram(this.diagram);
	handleInputs()
	resizeInputs();
	drawCorners();
}

function handleAddCaseSwitch(e) {
	var targetCase = e.target.parentNode.parentNode.parentNode;
	var newCase = diagramMaker["switch-case"](switchCaseTemplate);
	diagramContainer.appendButtonsInCase(newCase);
	targetCase.parentNode.insertBefore(newCase, targetCase);
	resizeInputs();
}

function handleRemoveCaseSwitch(e) {
	var targetCase = e.target.parentNode.parentNode.parentNode;
	targetCase.remove();
}

function handleDragOverInTrash(ev) {
	ev.target.classList.add("trash-over");
}

function handleDragLeaveInTrash(ev) {
	ev.target.classList.remove("trash-over");
}

function handleNewDiagram(e) {
	updateDiagram();
	diagramContainer.setInitialDiagram();
	addDiagram(diagramContainer.actualDiagram);
	handleInputs()
	resizeInputs();
	drawCorners();
}
function downDiagramHandler(e) {
	var idx = indexOfChild(diagramsMenu.getContainerFromControlButton(this));
	project.moveDiagramDown(idx);
	diagramsMenu.downDiagram(idx);
}
function upDiagramHandler(e) {
	var idx = indexOfChild(diagramsMenu.getContainerFromControlButton(this));
	project.moveDiagramUp(idx);
	diagramsMenu.upDiagram(idx);
}
function cloneDiagramHandler(e) {
	var idx = indexOfChild(diagramsMenu.getContainerFromControlButton(this));
	var clon = project.cloneDiagram(idx);
	diagramContainer.setDiagram(clon);
	diagramsMenu.addDiagramAt(idx, clon);
}

function deleteDiagramHandler(e) {
	if (confirm('¿Borrar diagrama?')) {
		deleteDiagram(diagramsMenu.getContainerFromControlButton(this));
	};
}

function openBlocksContainerHandler(e) {
	applyClassInNode(false, "invisible", document.getElementById("menuContainer"));
	toggleClass(document.getElementById("sectionDiagram"), "initial-margin-right");
	applyClassInNode(true, "margin-right", document.getElementById("sectionDiagram"));
}
function closeBlocksContainerHandler(e) {
	applyClassInNode(true, "invisible", document.getElementById("menuContainer"));
	toggleClass(document.getElementById("sectionDiagram"), "initial-margin-right");
	applyClassInNode(false, "margin-right", document.getElementById("sectionDiagram"));
}
function swapHistorial() {
	project[(histPopup.visible) ? "hideHistorial" : "showHistorial"](histPopup);
}
function closeWindowHandler() {
	window.close();
}
function handleClose(e) {
	e.preventDefault();
	e.returnValue = '';
	return '';
}
