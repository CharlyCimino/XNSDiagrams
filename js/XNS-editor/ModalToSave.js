function ModalToSave() {
	this.nameProject;
	this.container = document.getElementById("modalToSave");
	this.modalCloseSpan = document.getElementById("modalCloseSpan");
	this.modalCloseBtn = document.getElementById("modalCloseBtn");
	this.modalSaveBtn = document.getElementById("modalSaveBtn");
	this.open = function () {
		applyClassInNode(false, "invisible", this.container);
	}
	this.close = function () {
		applyClassInNode(true, "invisible", this.container);
	}
	setEvent(this.modalCloseSpan, "click", () => { this.close() });
	setEvent(this.modalCloseBtn, "click", () => { this.close() });
	setEvent(this.modalSaveBtn, "click", () => { alert("pendiente") });
}