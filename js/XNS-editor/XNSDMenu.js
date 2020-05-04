var menuContainer = document.getElementById("menuContainer");

function newAccordion(id) {
	var acc = document.createElement("div");
	acc.id = id;
	acc.classList.add("w3-bar-block", "w3-hide", "w3-white", "w3-card-4");
	return acc;
}

function newAccordionButton(inner) {
	var btn = document.createElement("button");
	btn.classList.add("w3-button", "w3-block", "w3-hover-indigo", "w3-leftbar", "w3-border", "w3-border-indigo", "w3-section", "w3-card-4");
	setEvent(btn, "click", toggleAccordion);
	btn.innerHTML = inner;
	return btn;
}

function toggleAccordion(e) {
	var acc = document.getElementById(e.target.innerHTML);
	toggleClass(acc, "w3-show");
}

function fillAccordion(accordion, items) {
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		var obj = renderStatement(item);
		obj.template = JSON.stringify(item);
		accordion.appendChild(newMenuItem(obj));
	}
}

function generateMenuItems() {
	for (let t = 0; t < templates.length; t++) {
		const template = templates[t];
		var btn = newAccordionButton(template.category);
		var acc = newAccordion(template.category);
		fillAccordion(acc, template.items);
		menuContainer.appendChild(btn);
		menuContainer.appendChild(acc);
	}
}

function newMenuItem(obj) {
	var btn = document.createElement("div");
	btn.setAttribute("type", "button");
	btn.classList.add("w3-bar-item", "w3-button", "w3-hover-light-gray");
	btn.appendChild(obj);
	return btn;
}