var aceEditor = ace.edit("editor");
aceEditor.setOptions({
	theme: "ace/theme/monokai",
	autoScrollEditorIntoView: false,
	minLines: 30,
	maxLines: 100
});
aceEditor.session.setMode("ace/mode/json");
aceEditor.session.setTabSize(2);
aceEditor.session.setUseWrapMode(true);
aceEditor.setFontSize(14);
aceEditor.setShowPrintMargin(false);