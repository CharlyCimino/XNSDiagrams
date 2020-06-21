function NSPProject(autor, comission) {
	this.DEFAULT_NAME = "Proyecto sin título";
	this.nameContainer = document.getElementById("inputProjectName");
	this.name = this.DEFAULT_NAME;
	this.autor = autor ? autor : "Sin autor";
	this.comission = comission ? comission : "Sin comisión";
	this.dateStart = new Date();
	this.date;
	this.minutes;
	this.diagrams = [];
	this.addDiagram = function (diagram) {
		this.diagrams.push(diagram);
	}
	this.upDiagram = function (index) {
		swapInArray(this.diagrams, index, index - 1);
	}
	this.downDiagram = function (index) {
		swapInArray(this.diagrams, index, index + 1);
	}
	this.cloneDiagram = function (index) {
		var d = this.diagrams[index];
		var clon = new NSPDiagram(d.theClass, d.name, d.code);
		this.diagrams.splice(index + 1, 0, clon);
		return clon;
	}
	this.deleteDiagram = function (id) {
		var index = -1;
		var diagramFound = this.getDiagramById(id);
		if (diagramFound) {
			index = this.diagrams.indexOf(diagramFound);
			if (index > -1) {
				this.diagrams.splice(index, 1);
			}
		}
		return index;
	}
	this.getDiagramById = function (id) {
		var diag = null;
		var i = 0;
		while (i < this.diagrams.length && this.diagrams[i].id != id) {
			i++
		}
		if (i < this.diagrams.length) {
			diag = this.diagrams[i];
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
	this.check = function (value) {
		return (value);
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
	this.fillHistorial = function (popup) {
		if (!popup) return;
		function newRow(content, classStyle) {
			var item = document.createElement("span");
			item.className = classStyle;
			item.innerHTML = content;
			return item;
		}
		var row;
		if (this.meta) {
			var data = DataConversor.toJS(this.meta);
			popup.innerHTML = "";
			for (var i = 0; i < data.length; i++) {
				row = document.createElement("DIV");
				row.className = "row";
				row.appendChild(newRow(data[i].i.autor, "autor"));
				row.appendChild(newRow(new Date(data[i].i.start).toLocaleString(), "date"));
				row.appendChild(newRow(new Date(data[i].d).toLocaleString(), "date"));
				popup.appendChild(row);
			}
		}
	}
	setEvent(this.nameContainer, "change", () => {
		this.name = (this.nameContainer.value != "" ? this.nameContainer.value : this.DEFAULT_NAME);
		document.title = this.name;
	});
}