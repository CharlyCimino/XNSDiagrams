var exportDiagramProjectBtn = document.getElementById("exportDiagramProject");
var exportDiagramImageBtn = document.getElementById("exportDiagramImage");
setEvent(exportDiagramProjectBtn, "click", exportDiagramProject);
setEvent(exportDiagramImageBtn, "click", exportDiagramImage);

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
	console.log("Generando...");

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

function makeDiagramExportable() {
	var clon = diagramCont.cloneNode(true);
	var elements = Array.from(clon.children);
	var div = document.getElementById("diagramExportable")
	for (let e = 0; e < elements.length; e++) {
		const element = elements[e];
		div.appendChild(element);
	}
	return div;
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
	return fileName;
}

function generateCanvasIn(target, statement) {
	return html2canvas(statement, {
		allowTaint: false,
		foreignObjectRendering: true,
	}).then(canvas => {
		target.appendChild(canvas);
		downloadImg();
	});
}

function importDiagram(file) {
	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function (theFile) {
		return function (e) {
			diagramCont.innerHTML = e.target.result;
			reAssignDragEvents();
		};
	})(file);
	// Read in the image file as a data URL.
	reader.readAsText(file);
}

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
	alert('The File APIs are not fully supported in this browser.');
}