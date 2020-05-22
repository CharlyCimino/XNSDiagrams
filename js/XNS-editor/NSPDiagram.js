contIDs = 0;
function NSPDiagram(theClass, name, code) {
	this.setData = function (theClass, name, code) {
		this.theClass = theClass;
		this.name = name;
		this.code = code;
	}
	contIDs++;
	this.id = "NSPDiagram-" + contIDs;
	this.setData(theClass, name, code);
}