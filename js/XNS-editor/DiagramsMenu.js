function DiagramsMenu() {
	var _thisDiagramMenu = this;
	this.container = document.getElementById("diagramsContainer");
	this.itemsContainer = document.getElementById("diagramsItemsContainer");
	this.buttonOpenDiagrams = document.getElementById("buttonOpenDiagrams");
	this.buttonCloseDiagrams = document.getElementById("buttonCloseDiagrams");
	this.addDiagram = function (diagram) {
		this.itemsContainer.appendChild(this.newDiagramItem(diagram));
	}
	this.clear = function () {
		clearAllChilds(this.itemsContainer);
	}
	this.updateDiagram = function (diagram) {
		var itemFound = this.getDiagramItemById("item-" + diagram.id);
		if (itemFound) {
			this.setNameInItem(itemFound, diagram.theClass, diagram.name)
		}
	}
	this.newDiagramItem = function (diagram) {
		var btn = newElement("div", "w3-button w3-padding-small w3-block w3-hover-indigo w3-margin-top w3-border-bottom diagram-item");
		btn.setAttribute("type", "button");
		btn.id = "item-" + diagram.id;
		btn.diagram = diagram;
		this.setNameInItem(btn, diagram.theClass, diagram.name);
		setEvent(btn, "click", handleClickInDiagramItem);
		var cont = this.newDiagramItemContainer();
		cont.appendChild(btn);
		cont.appendChild(this.newButtonsBar());
		return cont;
	}
	this.newDiagramItemContainer = function () {
		var cont = newElement("div", "w3-card-4 w3-border-indigo w3-rightbar");
		cont.setAttribute("type", "button");
		return cont;
	}
	this.newButtonsBar = function () {
		var center = newElement("div", "w3-center");
		var bar = newElement("div", "w3-bar");
		center.appendChild(bar);
		this.appendButtons(bar);
		return center;
	}
	this.appendButtons = function (bar) {
		bar.appendChild(this.newControlButton("indigo", "arrow-down", this.downDiagramHandler));
		bar.appendChild(this.newControlButton("indigo", "arrow-up", this.upDiagramHandler));
		bar.appendChild(this.newControlButton("teal", "clone", this.cloneDiagramHandler));
		bar.appendChild(this.newControlButton("red", "trash", this.deleteDiagramHandler));
	}
	this.newControlButton = function (color, iconType, handler) {
		var textColorClass = "w3-text-" + color;
		var hoverColorClass = "w3-hover-" + color;
		var btn = newElement("div", "w3-bar-item w3-button w3-white w3-padding-small " + textColorClass + " " + hoverColorClass);
		btn.setAttribute("type", "button");
		btn.appendChild(newElement("i", "fa fa-" + iconType));
		setEvent(btn, "click", handler);
		return btn;
	}
	this.getDiagramItemById = function (id) {
		var items = this.itemsContainer.children;
		var diag = null;
		var i = 0;
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
	this.downDiagramHandler = function (e) {
		console.log(_thisDiagramMenu.getIDFromControlButton(this));
		alert("Falta implementar");
	}
	this.upDiagramHandler = function (e) {
		console.log(_thisDiagramMenu.getIDFromControlButton(this));
		alert("Falta implementar");
	}
	this.cloneDiagramHandler = function (e) {
		console.log(_thisDiagramMenu.getIDFromControlButton(this));
		alert("Falta implementar");
	}
	this.deleteDiagramHandler = function (e) {
		console.log(_thisDiagramMenu.getIDFromControlButton(this));
		alert("Falta implementar");
	}
	this.getIDFromControlButton = function (btn) {
		return btn.parentNode.parentNode.parentNode.firstChild;
	}
	setEvent(this.buttonOpenDiagrams, "click", this.openDiagramsContainer);
	setEvent(this.buttonCloseDiagrams, "click", this.closeDiagramsContainer);
}