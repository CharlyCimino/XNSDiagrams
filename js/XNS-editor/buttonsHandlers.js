function handleNewDiagram(e) {
	updateDiagram();
	diagramContainer.setInitialDiagram();
	addDiagram(diagramContainer.actualDiagram);
}

function handleAllViewDiagrams(e) {
	alert("PENDIENTE");
}

function handleAddCaseSwitch(e) {
	var targetCase = e.target.parentNode.parentNode.parentNode;
	var newCase = diagramMaker["switch-case"](switchCaseTemplate);
	diagramContainer.appendButtonsInCase(newCase);
	targetCase.parentNode.insertBefore(newCase, targetCase);
}

function handleRemoveCaseSwitch(e) {
	var targetCase = e.target.parentNode.parentNode.parentNode;
	targetCase.remove();
}

function handleCheckColors(e) {
	var link = document.getElementById("css/XNSColors.css");
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
}

function handleDragOverInTrash(ev) {
	ev.target.classList.add("trash-over");
}

function handleDragLeaveInTrash(ev) {
	ev.target.classList.remove("trash-over");
}



function handleClickInDiagramItem(e) {
	updateDiagram();
	console.log("El nuevo es " + this.diagram.name);
	diagramContainer.setDiagram(this.diagram);
}


