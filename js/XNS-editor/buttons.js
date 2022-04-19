
var importProjectBtn = document.getElementById("importProjectBtn");

var exportProjectBtn = document.getElementById("exportProjectBtn");
var exportPDFBtn = document.getElementById("exportPDFBtn");
var exitBtn = document.getElementById("exitBtn");

var newDiagramBtn = document.getElementById("newDiagram");
var viewAllDiagramsBtn = document.getElementById("viewAllDiagrams");

var checkColors = document.getElementById("checkColors");
// var checkObjects = document.getElementById("checkObjects");

var historialBtn = document.getElementById("historialBtn");

var histPopup = document.getElementById("hist-popup");

var buttonOpenBlocks = document.getElementById("buttonOpenBlocks");
var buttonCloseBlocks = document.getElementById("buttonCloseBlocks");

function initButtons(prj) {
	if (!prj) return;

	setEvent(exportProjectBtn, "click", exportProject);

	setEvent(importProjectBtn, "click", importProject);
	(!prj.et) ? setEvent(exportPDFBtn, "click", exportPDFForStudent) : exportPDFBtn.className += " disabled";
	setInsertButtonsEvents();

	setEvent(newDiagramBtn, "click", handleNewDiagram);
	setEvent(viewAllDiagramsBtn, "click", handleAllViewDiagrams);

	setEvent(checkColors, "click", handleCheckColors);
	// setEvent(checkObjects, "click", handleCheckObjects);

	setEvent(buttonOpenBlocks, "click", openBlocksContainerHandler);
	setEvent(buttonCloseBlocks, "click", closeBlocksContainerHandler);

	setEvent(exitBtn, "click", closeWindowHandler);
	
	function setInsertButtonsEvents() {
		var diagramButtons = document.getElementById("diagramButtons").children;
		for (let b = 0; b < diagramButtons.length; b++) {
			const button = diagramButtons[b];
			setEvent(button, "click", handleClickButtonDiagram);
		}
	}
}

function updateButtons(prj) {
	if (!prj) return;
	if (prj.et) {
		removeEvent(exportPDFBtn, "click", exportPDFForStudent); exportPDFBtn.className += " disabled";
	} else {
		setEvent(exportPDFBtn, "click", exportPDFForStudent);  exportPDFBtn.className = exportPDFBtn.className.replace(" disabled", "");
	}
}
