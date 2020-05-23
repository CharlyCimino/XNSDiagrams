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

function exportProjectForPupil() {
	exportProject(project.getForExport());
}

function exportProjectSimple() {
	exportProject(project.getForExportSimple());
}

function exportProject(obj) {
	updateDiagram();
	project.end();
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj)));
	element.setAttribute('download', project.name + ".nsplus");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function exportPDFForPupil() {
	exportPDF(false);
}

function exportPDFSimple() {
	exportPDF(true);
}

function makeCssArray() {
	var cssVector = ['css/w3.css',
		'css/NSPDiagram.css',
		'css/NSPEditor.css',
		'css/NSPPDF.css'];
	if (document.getElementById('checkColors').checked) {
		cssVector.push('css/NSPColors.css');
	}
	return cssVector;
}

function exportPDF(simpleFlag) {
	updateDiagram();
	project.end();
	PDF.setProject(project, simpleFlag);
	document.title = project.name;

	toggleClass(PDF.container, "invisible");
	printJS({
		printable: 'projectPrint',
		type: 'html',
		maxWidth: 750,
		css: makeCssArray()
	});
	// setTimeout(() => {
	// 	toggleClass(PDF.container, "invisible");
	// }, 1000);
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
	var newP = new NSPProject();
	newP.setData(projectJSON.name, projectJSON.autor, projectJSON.comission);
	projectJSON.diagrams.forEach(diagram => {
		newP.addDiagram(new NSPDiagram(diagram.theClass, diagram.name, diagram.code));
	});
	return newP;
}

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
	alert('The File APIs are not fully supported in this browser.');
}