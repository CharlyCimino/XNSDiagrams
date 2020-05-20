contIDs = 0;
function XNSDDiagram(theClass, name, code) {
	contIDs++;
	this.id = "diagram-item-" + contIDs;
	this.theClass = theClass;
	this.name = name;
	this.code = code;
}