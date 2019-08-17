var editor = ace.edit("editor");
editor.setOptions({
	theme: "ace/theme/monokai",
	autoScrollEditorIntoView: false,
	maxLines: 100,
	setShowPrintMargin: false
});
//editor.renderer.setScrollMargin(10, 10, 10, 10);
editor.session.setMode("ace/mode/json");