function NSPPDF() {
	this.container = document.getElementById("projectPrint");
	this.title = document.getElementById("PDFTitle");
	this.autor = document.getElementById("PDFAutor");
	this.comission = document.getElementById("PDFComission");
	this.date = document.getElementById("PDFDate");
	this.minutes = document.getElementById("PDFMinutes");
	this.printDiagrams = document.getElementById("projectPrintDiagrams");
	this.setProject = function (project) {
		this.printDiagrams.innerHTML = "";
		this.title.innerHTML = project.name;
		this.autor.innerHTML = project.autor;
		this.comission.innerHTML = project.comission;
		this.date.innerHTML = project.date;
		this.minutes.innerHTML = project.minutes;
		var wmString = this.watermarkStr();
		project.diagrams.forEach(diagram => {
			var divNS = document.createElement("div");
			divNS.appendChild(this.newWaterMark(wmString));
			divNS.innerHTML += diagram.code;
			divNS.classList.add("Nassi-Shneiderman");
			this.printDiagrams.appendChild(divNS);
		});
	}
	this.newWaterMark = function (contain) {
		var p = document.createElement("p");
		p.innerHTML = contain;
		p.classList.add("watermark", "w3-large", "w3-center");
		return p;
	}
	this.watermarkStr = function () {
		return this.autor.innerHTML + "<br/>" + this.comission.innerHTML + "<br/>" + this.date.innerHTML;
	}
}