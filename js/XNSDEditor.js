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

	function removeCharAtCursor(elem, position) {
		elem.value = elem.value.substring(0, position - 1) + elem.value.substring(position, elem.value.length);
	}


	function insertHeader(elem, description) {
		var title = document.createElement("h2");
		title.className = "external";
		title.innerHTML = description + "<br/>&nbsp";
		elem.appendChild(title);
	}

	function insertStructureExample(elem, declaration) {
		var title = document.createElement("h3");
		title.className = "external";
		title.innerHTML = "Estructura de definición (JSON)";
		elem.appendChild(title);
		var block = document.createElement("pre");
		block.className = "external";
		block.innerHTML = JSON.stringify(declaration, null, 4);
		elem.appendChild(block);
		var hr = document.createElement("hr");
		hr.className = "external";
		elem.appendChild(hr);
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

	/* Tablero de generación de plantillas */
	var templates = {
		"base": "\"declaration\": {\n\"class\": \"[classname]\",\n" +
			"\"modifiers\": \"[public||private] [abstract] [static] [final]\",\n" +
			"\"type\": \"[void or type]\",\n\"name\": \"functionName\"\n}\n",
		"localConsts": "\"localConsts\": [\n" +
			"{ \"name\": \"[constant name]\", \"value\": \"[value]\" },\n" +
			"{ \"name\": \"[constant name]\", \"value\": \"[value]\" }\n" +
			"]\n",
		"localVars": "\"localVars\": [\n" +
			"{ \"type\": \"[datatype]\", \"name\": \"[variableName]\" },\n" +
			"{ \"type\": \"[datatype]\", \"name\": \"[variableName]\" }\n" +
			"]\n",
		"statements": "\"statements\": [\n]",
		"assignment": "{\"type\": \"assignment\", \"data\": {\"variable\": \"[variableName]\",\"value\": \"[value, variable or expression]\" }}",
		"if": "{ \"type\": \"if\", \"data\": { \"condition\": \"[boolean expression]\",\n\"then\": [],\n\"else\": []\n}}"
	};

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
				editor.insert(value);
				insertAtCursor(target, value);
				//checkAndCompile();
			};
			setEvent(button, "click", handler);
			buttons.appendChild(button);
		}
	}


	//target.onblur = checkAndCompile();
	//var compileRule = /Unexpected (token ([{,:])|string) in JSON at position ([0-9]+)/g

	function checkAndCompile() {
		var diagramStructure = editor.getValue();
		try {
			target.className = "";
			var diagramStructure = JSON.parse(diagramStructure);
		} catch (e) {
			var r = (/Unexpected (token ([{,:])|string) in JSON at position ([0-9]+)/g).exec(e.message);
			if (r) {
				switch (r[1]) {
					case "{":
					case "string":
						insertAtCursor(target, ",", parseInt(r[2] || r[3]));
						break;
					case ",":
						removeCharAtCursor(target, parseInt(r[2]));
						break;
					default:
						target.className = "error"
						break;
				}
			}
		} finally {
			//reparse();
		}
	}

	function reparse() {
		var text = target.value;
		if (text) {
			var obj = JSON.parse(text);
			target.value = JSON.stringify(obj, null, "");
			render();
		}
	}

	setEvent(document.getElementById("genButton"), "click", render);

	fillTemplates();
	editor.insert(JSON.stringify(JSONPrueba, null, 4));
}