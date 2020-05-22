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

function exportSimple() {
	exportProject(project.getForExportSimple());
}

function exportProject(obj) {
	updateDiagram();
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj)));
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
	PDF.setProject(project);
	toggleClass(PDF.container, "invisible");
	printJS({
		printable: 'projectPrint',
		type: 'html',
		documentTitle: PDF.title,
		base64: true,
		css: ['css/w3.css',
			'css/NSPDiagram.css',
			'css/NSPEditor.css',
			'css/NSPPDF.css',
			'css/NSPColors.css']
	});

	// var doc = new jsPDF({
	// 	orientation: 'landscape',
	// 	unit: 'in',
	// 	format: 'a4'
	// })

	// doc.text('Hello world!', 1, 1)
	// doc.save('two-by-four.pdf')




	// var opt = {
	// 	margin: 0.2,
	// 	filename: project.name + '.pdf',
	// 	image: { type: 'jpg', quality: 1 },
	// 	jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
	// };
	// html2pdf().set(opt).from(PDF.container).save();
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