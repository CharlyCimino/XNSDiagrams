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
	var obj = project.getForExport(true, updateDiagram);
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj)));
	element.setAttribute('download', project.fullname + ".nsplus");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function exportPDFForStudent() {
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
	project.updateTime();
	PDF.setProject(project, simpleFlag);
	var printWindow = window.open();
	printWindow.document.write(toWrite());
}

function toWrite() {
	return '<html>' + headWithStyles() + '<body><div id="projectPrint">'
		+ PDF.container.innerHTML + '</div></body><script>' + drawCorners
		+ 'window.onafterprint = function(){window.close();};drawCorners();setTimeout(() => {window.print();}, 200);</script></html>';
}

function headWithStyles() {
	var head = '<head><title>' + project.name + '-NS+</title>';
	var styles = window.document.styleSheets;
	for (let index = 0; index < styles.length; index++) {
		head += '<link rel="stylesheet" type="text/css" href="' + styles[index].href + '" />'
	}
	return head + "</head>";
}

function openFile(file) {
	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function (theFile) {
		return function (e) {
			try {
				project = jsonToProject(toJSON(e.target.result));
			} catch(e) {
				alert(e);
			}
			updateBeforeOpenProject();
		};
	})(file);
	// Read in the image file as a data URL.
	reader.readAsText(file);
}

function jsonToProject(projectJSON) {
	var newP = new NSPProject(ver());
	newP.import(projectJSON);
	return newP;
}

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
	alert('The File APIs are not fully supported in this browser.');
}