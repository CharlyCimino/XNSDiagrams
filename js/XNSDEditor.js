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

	/* Tablero de generación de plantillas */
	var templates = {
		"base": "\"declaration\": {\"class\": \"[classname]\"," +
			"\"modifiers\": \"[public||private] [abstract] [static] [final]\"," +
			"\"type\": \"[void or type]\",\"name\": \"functionName\"}",
		"localConsts": "\"localConsts\": [" +
			"{ \"name\": \"[constant name]\", \"value\": \"[value]\" }," +
			"{ \"name\": \"[constant name]\", \"value\": \"[value]\" }" +
			"]",
		"localVars": "\"localVars\": [" +
			"{ \"type\": \"[datatype]\", \"name\": \"[variableName]\" }," +
			"{ \"type\": \"[datatype]\", \"name\": \"[variableName]\" }" +
			"]",
		"statements": "\"statements\": []",
		"assignment": "{\"type\": \"assignment\", \"data\": {\"variable\": \"[variableName]\",\"value\": \"[value, variable or expression]\" }}",
		"if": "{ \"type\": \"if\", \"data\": { \"condition\": \"[boolean expression]\",\"then\": [],\"else\": []}}"
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