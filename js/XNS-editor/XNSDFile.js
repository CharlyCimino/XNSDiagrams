var exportButton = document.getElementById("exportDiagram");
setEvent(exportButton, "click", exportDiagram);

function exportDiagram() {

	var className = document.getElementById("xnsd-class-name-2").innerHTML;
	var methodName = document.getElementById("xnsd-method-name-6").innerHTML;

	var namefile = "Clase-" + className + "-Metodo-" + methodName;

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(diagramCont.innerHTML));
	element.setAttribute('download', namefile);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);


	/*var content = diagram.innerHTML;
	var filename = "Nombre de archivo";
	var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
	saveAs(blob, filename + ".txt");*/
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