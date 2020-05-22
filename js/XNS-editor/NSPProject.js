function NSPProject() {
	this.DEFAULT_NAME = "Proyecto sin título";
	this.nameContainer = document.getElementById("inputProjectName");
	this.name = this.DEFAULT_NAME;
	this.diagrams = [];
	this.addDiagram = function (diagram) {
		this.diagrams.push(diagram);
	}
	this.getDiagramById = function (id) {
		var diag = null;
		var i = 0;
		while (i < diagrams.length && diagrams[i].id != id) {
			i++
		}
		if (i < diagrams.length) {
			diag = diagrams[i];
		}
		return diag;
	}
	this.appendInProjectPrint = function () {
		var target = document.getElementById("projectPrintDiagrams");
		this.diagrams.forEach(diagram => {
			var divNS = document.createElement("div");
			divNS.innerHTML = diagram.code;
			divNS.classList.add("Nassi-Shneiderman");
			target.appendChild(divNS);
		});
	}
	this.getName = function () {
		return this.name;
	}
	this.setName = function (name) {
		this.name = name;
		this.nameContainer.value = name;
	}
	setEvent(this.nameContainer, "change", () => { this.name = (this.nameContainer.value != "" ? this.nameContainer.value : this.DEFAULT_NAME); });
}