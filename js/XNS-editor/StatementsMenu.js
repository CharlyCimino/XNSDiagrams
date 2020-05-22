function StatementsMenu() {
	this.container = document.getElementById("menuContainer");
	this.newAccordion = function (id) {
		var acc = document.createElement("div");
		acc.id = id;
		acc.classList.add("w3-bar-block", "w3-hide", "w3-white", "w3-card-4");
		return acc;
	}
	this.newAccordionButton = function (inner) {
		var btn = document.createElement("button");
		btn.classList.add("w3-button", "w3-block", "w3-hover-indigo", "w3-leftbar", "w3-border-indigo", "w3-section", "w3-card-4");
		setEvent(btn, "click", this.toggleAccordion);
		btn.innerHTML = inner;
		return btn;
	}
	this.toggleAccordion = function (e) {
		var acc = document.getElementById(e.target.innerHTML);
		toggleClass(acc, "w3-show");
	}
	this.fillAccordion = function (accordion, items) {
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			var obj = renderStatement(item);
			obj.template = JSON.stringify(item);
			accordion.appendChild(this.newMenuItem(obj));
		}
	}
	this.generateMenuItems = function () {
		for (let t = 0; t < templates.length; t++) {
			const template = templates[t];
			var btn = this.newAccordionButton(template.category);
			var acc = this.newAccordion(template.category);
			this.fillAccordion(acc, template.items);
			this.container.appendChild(btn);
			this.container.appendChild(acc);
		}
	}
	this.newMenuItem = function (obj) {
		var btn = document.createElement("div");
		btn.setAttribute("type", "button");
		btn.classList.add("w3-bar-item", "w3-button", "w3-hover-light-gray");
		btn.appendChild(obj);
		return btn;
	}
	this.generateMenuItems();
}


