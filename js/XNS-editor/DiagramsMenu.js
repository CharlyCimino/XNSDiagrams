function DiagramsMenu() {
	this.activeItem;
	this.container = document.getElementById("diagramsContainer");
	this.itemsContainer = document.getElementById("diagramsItemsContainer");
	this.buttonOpenDiagrams = document.getElementById("buttonOpenDiagrams");
	this.buttonCloseDiagrams = document.getElementById("buttonCloseDiagrams");
	this.addDiagram = function (diagram) {
		var item = this.newDiagramItem(diagram);
		this.itemsContainer.appendChild(item);
		this.setActiveDiagram(diagram);
	}
	this.addDiagramAt = function (idx, diagram) {
		var item = this.newDiagramItem(diagram);
		var node = this.itemsContainer.children[idx];
		insertAfter(item, node);
		this.setActiveDiagram(diagram);
	}
	this.clear = function () {
		clearAllChilds(this.itemsContainer);
	}
	this.updateDiagram = function (diagram) {
		if (diagram) {
			var itemFound = this.getDiagramItemById("item-" + diagram.id);
			if (itemFound) {
				this.setNameInItem(itemFound, diagram.theClass, diagram.name);
			}
		}
	}
	this.setActiveDiagram = function (diagram) {
		if (diagram) {
			var itemFound = this.getDiagramItemById("item-" + diagram.id);
			if (itemFound) {
				if (this.activeItem) {
					applyClassInNode(false, "w3-indigo", this.activeItem);
				}
				this.activeItem = itemFound;
				applyClassInNode(true, "w3-indigo", this.activeItem);
			}
		}
	}
	this.deleteDiagram = function (diagramItemContainer) {
		diagramItemContainer.parentNode.removeChild(diagramItemContainer);
	}
	this.upDiagram = function (index) {
		swapInNode(this.itemsContainer, index, index - 1);
	}
	this.downDiagram = function (index) {
		swapInNode(this.itemsContainer, index + 1, index);
	}
	this.newDiagramItem = function (diagram) {
		var btn = newElement("div", "w3-button w3-padding-small w3-block w3-hover-indigo w3-margin-top w3-border-bottom w3-indigo diagram-item");
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
		bar.appendChild(this.newControlButton("indigo", "arrow-down", downDiagramHandler));
		bar.appendChild(this.newControlButton("indigo", "arrow-up", upDiagramHandler));
		bar.appendChild(this.newControlButton("teal", "clone", cloneDiagramHandler));
		bar.appendChild(this.newControlButton("red", "trash", deleteDiagramHandler));
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
		while (i < items.length && items[i].firstChild.id != id) {
			i++;
		}
		if (i < items.length) {
			diag = items[i].firstChild;
		}
		return diag;
	}
	this.setNameInItem = function (item, theClass, name) {
		item.innerHTML = "<p>class " + theClass + ":</p><p>" + name + "()</p>";
	}
	this.openDiagramsContainer = function () {
		applyClassInNode(false, "invisible", diagramsContainer);
		toggleClass(document.getElementById("sectionDiagram"), "initial-margin-left");
		applyClassInNode(true, "margin-left", document.getElementById("sectionDiagram"));
	}
	this.closeDiagramsContainer = function () {
		applyClassInNode(true, "invisible", diagramsContainer);
		toggleClass(document.getElementById("sectionDiagram"), "initial-margin-left");
		applyClassInNode(false, "margin-left", document.getElementById("sectionDiagram"));
	}
	this.getContainerFromControlButton = function (btn) {
		return btn.parentNode.parentNode.parentNode;
	}
	setEvent(this.buttonOpenDiagrams, "click", this.openDiagramsContainer);
	setEvent(this.buttonCloseDiagrams, "click", this.closeDiagramsContainer);
}