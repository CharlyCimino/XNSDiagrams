var aceEditor = ace.edit("editor");
aceEditor.setOptions({
	theme: "ace/theme/monokai",
	autoScrollEditorIntoView: false,
	maxLines: 100,
	setShowPrintMargin: false
});
aceEditor.session.setMode("ace/mode/json");

aceEditor.insert(JSON.stringify(templates.base, null, 4));