function appendDiagramInContainer(diagram) {
	diagramsContainer.appendChild(newDiagramItem(diagram.id, diagram.theClass, diagram.name));
}

function newDiagramItem(id, theClass, name) {
	var btn = document.createElement("div");
	btn.setAttribute("type", "button");
	btn.classList.add("w3-bar-item", "w3-button", "w3-hover-light-gray", "diagram-item");
	btn.id = id;
	btn.innerHTML = "<p>" + theClass + "</p><p>" + name + "()</p>";
	setEvent(btn, "click", handleClickInDiagramItem);
	return btn;
}

function handleClickInDiagramItem(e) {
	var objDiagram = project.getDiagramById(this.id);
	console.log(objDiagram);


}

function w3_open() {
	document.getElementById("diagramsContainer").style.display = "block";
}

function w3_close() {
	document.getElementById("diagramsContainer").style.display = "none";
}