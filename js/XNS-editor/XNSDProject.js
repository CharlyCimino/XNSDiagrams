function XNSDProject(name, diagrams) {
	this.name = name;
	this.diagrams = diagrams;
	this.addDiagram = function (diagram) {
		this.diagrams.push(diagram);
		appendDiagramInContainer(diagram);
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
}