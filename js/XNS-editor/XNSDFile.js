var importDiagramProjectBtn = document.getElementById("importDiagramProject");
var exportDiagramProjectBtn = document.getElementById("exportDiagramProject");
var exportDiagramImageBtn = document.getElementById("exportDiagramImage");
setEvent(importDiagramProjectBtn, "click", importDiagramProject);
setEvent(exportDiagramProjectBtn, "click", exportDiagramProject);
setEvent(exportDiagramImageBtn, "click", exportDiagramImage);

function importDiagramProject() {
	var input = document.getElementById('fileInput');
	input.onchange = e => {
		var file = e.target.files[0];
		if (file) {
			importDiagram(file);
		}
	}
	input.click();
}

function exportDiagramProject() {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(diagramCont.innerHTML));
	element.setAttribute('download', generateNameFile());
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function exportDiagramImage() {
	diagramCont.lastChild.style.height = "auto";
	diagramCont.style.height = "auto";
	var options = {
		quality: 0.95,
		bgcolor: "white",
		width: diagramCont.scrollWidth,
		height: diagramCont.scrollHeight,
		style: {
			overflow: "visible"
		}
	};
	domtoimage.toJpeg(diagramCont, options)
		.then(function (dataUrl) {
			var link = document.createElement('a');
			link.download = generateNameFile() + '.jpeg';
			link.href = dataUrl;
			link.click();
		});
}

function generateNameFile() {
	var className = document.getElementById("xnsd-class-name-2").innerHTML;
	var methodName = document.getElementById("xnsd-method-name-6").innerHTML;
	var fileName;
	if (document.getElementById("checkObjects").checked) {
		fileName = "Clase-" + className + "-Método-" + methodName;
	} else {
		fileName = "Función-" + methodName;
	}
	return fileName + ".xnsd";
}

function importDiagram(file) {
	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function (theFile) {
		return function (e) {
			diagramCont.innerHTML = e.target.result;
			bindVarsAndSignature();
			reAssignDragEvents();
			reAssignSwitchEvents();
		};
	})(file);
	// Read in the image file as a data URL.
	reader.readAsText(file);
}

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
	alert('The File APIs are not fully supported in this browser.');
}