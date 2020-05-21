var importProjectBtn = document.getElementById("importProjectBtn");
var exportProjectBtn = document.getElementById("exportProjectBtn");
var exportPDFBtn = document.getElementById("exportPDFBtn");
setEvent(importProjectBtn, "click", importProject);
setEvent(exportProjectBtn, "click", exportProject);
setEvent(exportPDFBtn, "click", exportPDF);

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

function filename() {
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

function exportProject() {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(diagramCont.innerHTML));
	element.setAttribute('download', filename() + ".xnsd");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function hideArrows(flag) {
	var arrows = document.querySelectorAll(".fa-arrows");
	for (let a = 0; a < arrows.length; a++) {
		applyClassInNode(flag, "invisible", arrows[a].parentNode);
	}
}

function exportPDF() {
	saveActualDiagram();
	project.appendInProjectPrint();
	var toPrint = document.getElementById("projectPrint");
	var opt = {
		margin: 0.2,
		filename: 'myfile.pdf',
		image: { type: 'jpeg', quality: 1 },
		jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
	};

	html2pdf().set(opt).from(toPrint).save();
}

function importProject(file) {
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