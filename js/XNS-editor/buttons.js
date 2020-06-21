var importProjectBtn = document.getElementById("importProjectBtn");

var exportProjectBtn = document.getElementById("exportProjectBtn");
var exportPDFBtn = document.getElementById("exportPDFBtn");

var newDiagramBtn = document.getElementById("newDiagram");
var viewAllDiagramsBtn = document.getElementById("viewAllDiagrams");

var checkColors = document.getElementById("checkColors");
// var checkObjects = document.getElementById("checkObjects");

var historialBtn = document.getElementById("historialBtn");

var histPopup = document.getElementById("hist-popup");

buttonOpenBlocks = document.getElementById("buttonOpenBlocks");
buttonCloseBlocks = document.getElementById("buttonCloseBlocks");

setEvent(importProjectBtn, "click", importProject);

setEvent(exportProjectBtn, "click", exportProjectForPupil);
setEvent(exportPDFBtn, "click", exportPDFForPupil);

setInsertButtonsEvents();

setEvent(newDiagramBtn, "click", handleNewDiagram);
setEvent(viewAllDiagramsBtn, "click", handleAllViewDiagrams);

setEvent(checkColors, "click", handleCheckColors);
// setEvent(checkObjects, "click", handleCheckObjects);

setEvent(buttonOpenBlocks, "click", openBlocksContainerHandler);
setEvent(buttonCloseBlocks, "click", closeBlocksContainerHandler);

function setInsertButtonsEvents() {
	var diagramButtons = document.getElementById("diagramButtons").children;
	for (let b = 0; b < diagramButtons.length; b++) {
		const button = diagramButtons[b];
		setEvent(button, "click", handleClickButtonDiagram);
	}
}