window.onload = function () {
	var JSONPrueba = {
		"declaration": {
			"class": "Club",
			"modifiers": "public",
			"type": "void",
			"name": "mostrarListaPos",
			"arguments": [{
				"type": "Posicion",
				"name": "posicion"
			}]
		},
		"statements": [{
			"type": "foreach",
			"data": {
				"control": {
					"class": "Jugador",
					"variable": "jugador",
					"collection": "this.jugadores"
				},
				"statements": [{
					"type": "if",
					"data": {
						"condition": "jugador != null",
						"then": [{
							"type": "if",
							"data": {
								"condition": "jugador.getPosicion() == posicion",
								"then": [{
									"type": "output",
									"data": {
										"message": "jugador"
									}
								}]
							}
						}]
					}
				}]
			}
		}]
	};
	var mainbox = document.getElementById("diagramContainer");
	var xnsd = new XNSDiagram();
	var declaration;
	var target = document.getElementById("editor");

	var editor = ace.edit("editor");
	editor.setOptions({
		theme: "ace/theme/monokai",
		autoScrollEditorIntoView: false,
		maxLines: 100,
		setShowPrintMargin: false
	});
	//editor.renderer.setScrollMargin(10, 10, 10, 10);
	editor.session.setMode("ace/mode/json");
	editor.session.on('change', function (delta) {
		// delta.start, delta.end, delta.lines, delta.action
	});

	function insertAtCursor(elem, value, position) {
		if (position) {
			elem.value = elem.value.substring(0, position) +
				value + elem.value.substring(position, elem.value.length);
		} else if (document.selection) {
			elem.focus();
			sel = document.selection.createRange();
			sel.text = value;
		} else if (elem.selectionStart || elem.selectionStart == '0') {
			elem.value = elem.value.substring(0, elem.selectionStart) +
				value + elem.value.substring(elem.selectionEnd, elem.value.length);
		} else {
			elem.value += value;
		}
	}


	function insertHeader(elem, description) {
		var title = document.createElement("h2");
		title.className = "external";
		title.innerHTML = description + "<br/>&nbsp";
		elem.appendChild(title);
	}

	function insertExample(title, obj) {
		mainbox.innerHTML = "";
		insertHeader(mainbox, title);
		var diabox = document.createElement("div");
		diabox.className = "diabox";
		mainbox.appendChild(diabox);
		var diagram = xnsd.render(diabox, (obj.statements) ? obj : {
			"statements": [obj]
		});
		/*diagram.createImage(function (img) {
			img.className = "output";
			mainbox.appendChild(img);
		});*/
	}

	function setEvent(domElement, eventName, handler) {
		if (document.body.addEventListener) {
			domElement.addEventListener(eventName, handler);
		} else {
			domElement.attachEvent("on" + eventName, handler);
		}
	}

	function render() {
		var diagramTitle = document.getElementById("dtitle").value;
		var diagramStructure = editor.getValue();
		try {
			var diagramStructure = JSON.parse(diagramStructure);
		} catch (e) {
			alert(e);
		}
		insertExample(diagramTitle, diagramStructure);
	}


	// get JSON
	function getJson() {
		try {
			return JSON.parse($('#json-display').val());
		} catch (ex) {
			alert('Wrong JSON Format: ' + ex);
		}
	}
	// initialize



	function targetEmpty() {
		return editor.getValue() == "";
	}

	function fillTemplates() {
		var buttons = document.getElementById("buttons");
		for (var t in templates) {
			var button = document.createElement("button");
			button.innerHTML = t;
			button.content = templates[t];
			var handler = function (e) {
				var value = (e.target || e.srcElement).content;
				if (targetEmpty()) {
					value = "{\n" + value + "}"
				};
				value = JSON.stringify(value, null, 4);
				editor.insert(value);
				//insertAtCursor(target, value);
				//checkAndCompile();
			};
			setEvent(button, "click", handler);
			buttons.appendChild(button);
		}
	}


	//target.onblur = checkAndCompile();
	//var compileRule = /Unexpected (token ([{,:])|string) in JSON at position ([0-9]+)/g



	function reparse() {
		var text = target.value;
		if (text) {
			var obj = JSON.parse(text);
			target.value = JSON.stringify(obj, null, 4);
			render();
		}
	}

	setEvent(document.getElementById("genButton"), "click", render);
	setEvent(target, "change", render);

	fillTemplates();
	editor.insert(JSON.stringify(templates.base, null, 4));
}