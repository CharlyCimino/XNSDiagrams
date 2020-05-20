function XNSDProject(name, diagrams) {
	this.name = name;
	this.diagrams = diagrams;
	this.addDiagram = function (diagram) {
		this.diagrams.push(diagram);
		appendDiagramInContainer(diagram);
	}
}