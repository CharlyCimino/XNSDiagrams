var newDiagramBtn = document.getElementById("newDiagram");
var viewAllDiagramsBtn = document.getElementById("viewAllDiagrams");
setEvent(newDiagramBtn, "click", createNewDiagram);
setEvent(viewAllDiagramsBtn, "click", null);

function createNewDiagram() {
	if (actualDiagram) {
		saveActualDiagram();
	}
	diagramCont.innerHTML = "";
	appendDiagram(diagramCont, base);
	diagramCont.lastChild.appendChild(newEmptyBlock());
	localVars = document.querySelector("#diagram .local-variable-declaration");
	methodParameters = document.querySelector("#diagram .method-parameters");
	actualDiagram = new XNSDDiagram(classOfActualDiagram(), nameOfActualDiagram(), diagramCont.innerHTML);
	project.addDiagram(actualDiagram);
}

function appendDiagramInContainer(diagram) {
	diagramsContainer.appendChild(newDiagramItem(diagram.id, diagram.theClass, diagram.name));
}

function newDiagramItem(id, theClass, name) {
	var btn = document.createElement("div");
	btn.setAttribute("type", "button");
	btn.classList.add("w3-bar-item", "w3-button", "w3-hover-light-gray", "diagram-item");
	btn.id = id;
	setNameInItem(btn, theClass, name);
	setEvent(btn, "click", handleClickInDiagramItem);
	return btn;
}

function setNameInItem(item, theClass, name) {
	item.innerHTML = "<p>" + theClass + "</p><p>" + name + "()</p>";
}

function handleClickInDiagramItem(e) {
	var objDiagram = project.getDiagramById(this.id);
	if (objDiagram) {
		saveActualDiagram();
		actualDiagram = objDiagram;
		diagramCont.innerHTML = objDiagram.code;
	}
}

function saveActualDiagram() {
	console.log("El actual es " + actualDiagram.name);

	actualDiagram.setData(classOfActualDiagram(), nameOfActualDiagram(), diagramCont.innerHTML);
	var item = document.getElementById(actualDiagram.id);
	console.log(item);
	if (item) {
		setNameInItem(item, actualDiagram.theClass, actualDiagram.name);
	}
}

function w3_open() {
	document.getElementById("diagramsContainer").style.display = "block";
}

function w3_close() {
	document.getElementById("diagramsContainer").style.display = "none";
}