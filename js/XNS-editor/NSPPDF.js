function NSPPDF() {
	this.container = document.getElementById("projectPrint");
	this.title = document.getElementById("PDFTitle");
	this.subTitle = document.getElementById("PDFSubTitle");
	this.autor = document.getElementById("PDFAutor");
	this.comission = document.getElementById("PDFComission");
	this.date = document.getElementById("PDFDate");
	this.minutes = document.getElementById("PDFMinutes");
	this.printDiagrams = document.getElementById("projectPrintDiagrams");
	this.setProject = function (project, simpleFlag) {
		applyClassInNode(simpleFlag, "invisible", this.subTitle);
		this.printDiagrams.innerHTML = "";
		this.title.innerHTML = project.name;
		this.autor.innerHTML = '<a class="metaAutor" href=file:///' + this.generateReducedMeta() + ' target="_blank">' + project.autor + '</a>';
		this.comission.innerHTML = project.comission;
		this.date.innerHTML = project.date.toLocaleString();
		this.minutes.innerHTML = project.minutes + " minutos";
		var wmString = this.watermarkStr();
		project.diagrams.forEach(diagram => {
			var divNS = document.createElement("div");
			if (!simpleFlag) {
				divNS.appendChild(this.newWaterMark(wmString));
			}
			divNS.innerHTML += diagram.code;
			divNS.classList.add("Nassi-Shneiderman");
			this.printDiagrams.appendChild(divNS);
		});
		this.hideIcons();
	}
	this.generateReducedMeta = function () {
		var metaInLine = "ÚNICO_AUTOR";
		if (project.meta) {
			var metaInLine = "";
			var data = DataConversor.toJS(project.meta);
			for (var i = 0; i < data.length; i++) {
				metaInLine += data[i]["i"].autor + "/"
			}
		}
		return metaInLine.split(" ").join("_");
	}
	this.hideIcons = function () {
		var arrows = document.querySelectorAll("#projectPrint .fa-arrows");
		for (let a = 0; a < arrows.length; a++) {
			applyClassInNode(true, "invisible", arrows[a].parentNode);
		}
		var switchBtns = document.querySelectorAll("#projectPrint .switch-button");
		for (let a = 0; a < switchBtns.length; a++) {
			applyClassInNode(true, "invisible", switchBtns[a]);
		}
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