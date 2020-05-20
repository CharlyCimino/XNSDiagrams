function appendDiagramInContainer(diagram) {
	diagramsContainer.appendChild(newDiagramItem(diagram.theClass, diagram.name));
}

function newDiagramItem(theClass, name) {
	var btn = document.createElement("div");
	btn.setAttribute("type", "button");
	btn.classList.add("w3-bar-item", "w3-button", "w3-hover-light-gray", "diagram-item");
	btn.innerHTML = "<p>" + theClass + "</p><p>" + name + "()</p>";
	return btn;
}

function w3_open() {
	document.getElementById("diagramsContainer").style.display = "block";
}

function w3_close() {
	document.getElementById("diagramsContainer").style.display = "none";
}