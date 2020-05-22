function DiagramsMenu() {
	this.container = document.getElementById("diagramsContainer");
	this.buttonOpenDiagrams = document.getElementById("buttonOpenDiagrams");
	this.buttonCloseDiagrams = document.getElementById("buttonCloseDiagrams");
	this.addDiagram = function (diagram) {
		this.container.appendChild(this.newDiagramItem(diagram));
	}
	this.updateDiagram = function (diagram) {
		var itemFound = this.getDiagramItemById("item-" + diagram.id);
		console.log("Se va a actualizar " + itemFound.diagram.name + " a " + diagram.name);
		if (itemFound) {
			this.setNameInItem(itemFound, diagram.theClass, diagram.name)
		}
	}
	this.newDiagramItem = function (diagram) {
		var btn = document.createElement("div");
		btn.setAttribute("type", "button");
		btn.classList.add("w3-button", "w3-padding-small", "w3-block", "w3-hover-indigo", "w3-rightbar", "w3-border-indigo", "w3-card-4", "w3-margin-top", "diagram-item");
		btn.id = "item-" + diagram.id;
		btn.diagram = diagram;
		this.setNameInItem(btn, diagram.theClass, diagram.name);
		setEvent(btn, "click", handleClickInDiagramItem);
		return btn;
	}
	this.getDiagramItemById = function (id) {
		var items = this.container.children;
		var diag = null;
		var i = 1; // 0 is close button
		while (i < items.length && items[i].id != id) {
			i++;
		}
		if (i < items.length) {
			diag = items[i];
		}
		return diag;
	}
	this.setNameInItem = function (item, theClass, name) {
		item.innerHTML = "<p>class " + theClass + ":</p><p>" + name + "()</p>";
	}
	this.openDiagramsContainer = function () {
		applyClassInNode(false, "invisible", diagramsContainer);
		applyClassInNode(true, "margin-left", document.getElementById("sectionDiagram"));
	}
	this.closeDiagramsContainer = function () {
		applyClassInNode(true, "invisible", diagramsContainer);
		applyClassInNode(false, "margin-left", document.getElementById("sectionDiagram"));
	}
	setEvent(this.buttonOpenDiagrams, "click", this.openDiagramsContainer);
	setEvent(this.buttonCloseDiagrams, "click", this.closeDiagramsContainer);
}