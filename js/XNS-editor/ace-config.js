var aceEditor = ace.edit("editor");
aceEditor.setOptions({
	theme: "ace/theme/monokai",
	autoScrollEditorIntoView: false,
	minLines: 15,
	maxLines: 23
});
aceEditor.session.setMode("ace/mode/json");
aceEditor.session.setTabSize(2);
aceEditor.session.setUseWrapMode(true);
aceEditor.session.mergeUndoDeltas = true;
aceEditor.setFontSize(14);
aceEditor.setShowPrintMargin(false);