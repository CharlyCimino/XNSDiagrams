var importProjectBtn = document.getElementById("importProjectBtn");

var exportProjectBtn = document.getElementById("exportProjectBtn");
var exportPDFBtn = document.getElementById("exportPDFBtn");

var newDiagramBtn = document.getElementById("newDiagram");
var viewAllDiagramsBtn = document.getElementById("viewAllDiagrams");

var checkColors = document.getElementById("checkColors");
var checkObjects = document.getElementById("checkObjects");

setEvent(importProjectBtn, "click", importProject);

setEvent(exportProjectBtn, "click", exportProject);
setEvent(exportPDFBtn, "click", exportPDF);

setInsertButtonsEvents();

setEvent(newDiagramBtn, "click", handleNewDiagram);
setEvent(viewAllDiagramsBtn, "click", handleAllViewDiagrams);

setEvent(checkColors, "click", handleCheckColors);
setEvent(checkObjects, "click", handleCheckObjects);

function setInsertButtonsEvents() {
	var diagramButtons = document.getElementById("diagramButtons").children;
	for (let b = 0; b < diagramButtons.length; b++) {
		const button = diagramButtons[b];
		setEvent(button, "click", handleClickButtonDiagram);
	}
}