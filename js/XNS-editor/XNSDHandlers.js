function handleHideTrash(e) {
	viewTrash(false);
}

function reSize() {
	var headerHeight = parseFloat(window.getComputedStyle(document.getElementById("header")).height);
	var footerHeight = parseFloat(window.getComputedStyle(document.getElementById("footer")).height);
	var sectionDiagram = document.getElementById("sectionDiagram");
	document.body.style.paddingTop = headerHeight;
	document.body.style.paddingBottom = footerHeight;
	var bodyHeight = parseFloat(window.getComputedStyle(document.body).height);
	var newSectionDiagramHeight = bodyHeight - headerHeight - footerHeight - 16;
	sectionDiagram.style.height = newSectionDiagramHeight;
	var paddingTopSection = parseFloat(window.getComputedStyle(sectionDiagram).paddingTop);
	var paddingBottomSection = parseFloat(window.getComputedStyle(sectionDiagram).paddingBottom);
	diagramCont.style.height = newSectionDiagramHeight - paddingTopSection - paddingBottomSection;
}

function handleResize(e) {
	reSize();
}

function handleOpen(e) {
	appendDiagram(diagramCont, base);
	diagramCont.lastChild.appendChild(newEmptyBlock());
	localVars = document.getElementById("xnsd-local-variable-declaration-8");
	methodParameters = document.getElementById("xnsd-method-parameters-7");
	generateMenuItems();
	handleResize();
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

function handleDragOverInTrash(ev) {
	ev.target.classList.add("trash-over");
}

function handleDragLeaveInTrash(ev) {
	ev.target.classList.remove("trash-over");
}