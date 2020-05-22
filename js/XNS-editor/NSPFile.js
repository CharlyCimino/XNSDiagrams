function importProject() {
	var input = document.getElementById('fileInput');
	input.onchange = e => {
		var file = e.target.files[0];
		if (file) {
			openFile(file);
		}
	}
	input.click();
}

function exportProject() {
	updateDiagram();
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(project.getForExport())));
	element.setAttribute('download', project.name + ".nsplus");
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
	updateDiagram();
	project.appendInProjectPrint();
	var toPrint = document.getElementById("projectPrint");
	var opt = {
		margin: 0.2,
		filename: project.name + '.pdf',
		image: { type: 'jpeg', quality: 1 },
		jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
	};

	html2pdf().set(opt).from(toPrint).save();
}

function openFile(file) {
	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function (theFile) {
		return function (e) {
			project = jsonToProject(toJSON(e.target.result));
			updateBeforeOpenProject();
		};
	})(file);
	// Read in the image file as a data URL.
	reader.readAsText(file);
}

function jsonToProject(projectJSON) {
	var newD = new NSPProject();
	newD.setName(projectJSON.name);
	projectJSON.diagrams.forEach(diagram => {
		newD.addDiagram(new NSPDiagram(diagram.theClass, diagram.name, diagram.code));
	});
	return newD;
}

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
	alert('The File APIs are not fully supported in this browser.');
}