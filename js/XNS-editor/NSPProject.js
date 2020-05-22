function NSPProject(autor, comission) {
	this.DEFAULT_NAME = "Proyecto sin título";
	this.nameContainer = document.getElementById("inputProjectName");
	this.name = this.DEFAULT_NAME;
	this.autor = autor;
	this.comission = comission;
	this.dateStart = new Date();
	this.date;
	this.minutes;
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
	this.getName = function () {
		return this.name;
	}
	this.setName = function (name) {
		this.name = name;
		this.nameContainer.value = name;
	}
	this.setData = function (name, autor, comission) {
		this.setName(name);
		this.autor = autor;
		this.comission = comission;
	}
	this.end = function () {
		this.date = new Date();
		this.minutes = this.calculateMinutes(this.date);
	}
	this.calculateMinutes = function (actual) {
		var diff = actual.getTime() - this.dateStart.getTime();
		// ms --> minutes
		return Math.trunc(diff / (1000 * 60));
	}
	this.getForExport = function () {
		this.date = new Date();
		return {
			"name": this.name,
			"autor": this.autor,
			"comission": this.comission,
			"diagrams": this.diagrams,
			"date": this.date,
			"minutes": this.minutes
		}
	}
	this.getForExportSimple = function () {
		return {
			"name": this.name,
			"diagrams": this.diagrams,
		}
	}
	setEvent(this.nameContainer, "change", () => { this.name = (this.nameContainer.value != "" ? this.nameContainer.value : this.DEFAULT_NAME); });
}