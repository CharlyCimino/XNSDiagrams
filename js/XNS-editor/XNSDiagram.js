contIDs = 0;
function XNSDDiagram(theClass, name, code) {
	this.setData = function (theClass, name, code) {
		this.theClass = theClass;
		this.name = name;
		this.code = code;
	}
	contIDs++;
	this.id = "diagram-item-" + contIDs;
	this.setData(theClass, name, code);
}