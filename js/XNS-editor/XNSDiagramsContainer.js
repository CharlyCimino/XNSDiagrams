var newDiagramBtn = document.getElementById("newDiagram");
var viewAllDiagramsBtn = document.getElementById("viewAllDiagrams");
var buttonOpenDiagrams = document.getElementById("buttonOpenDiagrams");
var buttonCloseDiagrams = document.getElementById("buttonCloseDiagrams");
setEvent(newDiagramBtn, "click", function () { createNewDiagram(false) });
setEvent(buttonOpenDiagrams, "click", openDiagramsContainer);
setEvent(buttonCloseDiagrams, "click", closeDiagramsContainer);
setEvent(viewAllDiagramsBtn, "click", null);

function createNewDiagram(openFlag) {
	if (actualDiagram && !openFlag) {
		saveActualDiagram();
	}
	diagramCont.innerHTML = "";
	appendDiagram(diagramCont, base);
	diagramCont.lastChild.appendChild(newEmptyBlock());
	setActualDiagram();
	project.addDiagram(actualDiagram);
	appendDiagramInContainer(actualDiagram);
}

function setActualDiagram() {
	localVars = document.querySelector("#diagram .local-variable-declaration");
	methodParameters = document.querySelector("#diagram .method-parameters");
	actualDiagram = new XNSDDiagram(classOfActualDiagram(), nameOfActualDiagram(), diagramCont.innerHTML);
}

function appendDiagramInContainer(diagram) {
	diagramsContainer.appendChild(newDiagramItem(diagram.id, diagram.theClass, diagram.name));
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

function newDiagramItem(id, theClass, name) {
	var btn = document.createElement("div");
	btn.setAttribute("type", "button");
	btn.classList.add("w3-button", "w3-padding-small", "w3-block", "w3-hover-indigo", "w3-rightbar", "w3-border-indigo", "w3-card-4", "w3-margin-top", "diagram-item");
	btn.id = id;
	setNameInItem(btn, theClass, name);
	setEvent(btn, "click", handleClickInDiagramItem);
	return btn;
}

function setNameInItem(item, theClass, name) {
	item.innerHTML = "<p>class " + theClass + ":</p><p>" + name + "()</p>";
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
	actualDiagram.setData(classOfActualDiagram(), nameOfActualDiagram(), diagramCont.innerHTML);
	var item = document.getElementById(actualDiagram.id);
	if (item) {
		setNameInItem(item, actualDiagram.theClass, actualDiagram.name);
	}
}

function openDiagramsContainer() {
	applyClassInNode(false, "invisible", diagramsContainer);
	applyClassInNode(true, "margin-left", document.getElementById("sectionDiagram"));
}

function closeDiagramsContainer() {
	applyClassInNode(true, "invisible", diagramsContainer);
	applyClassInNode(false, "margin-left", document.getElementById("sectionDiagram"));
}