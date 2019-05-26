window.onload = function () {

	var renderbox = document.getElementById("diagramContainer");
	var xnsd = new XNSDiagram();
	var declaration;
	var target = document.getElementById("dstructure");
	
	function insertAtCursor(elem, value, position) {
		if (position) {
			elem.value = elem.value.substring(0, position)
				+ value + elem.value.substring(position, elem.value.length);
		} else if (document.selection) {
			elem.focus();
			sel = document.selection.createRange();
			sel.text = value;
		} else if (elem.selectionStart || elem.selectionStart == '0') {
			elem.value = elem.value.substring(0, elem.selectionStart)
				+ value + elem.value.substring(elem.selectionEnd, elem.value.length);
		} else {
			elem.value += value;
		}
	}
	
	function removeCharAtCursor(elem, position) {
		elem.value = elem.value.substring(0, position-1) + elem.value.substring(position, elem.value.length);
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

	function insertExample(obj) {
		var diagram = xnsd.generate("diabox", obj);
		if (diagram instanceof Array) {
			for (var d=0; d < diagram.length; d++) {
				window.setTimeout(function(dObj) {
					renderbox.innerHTML += dObj.toHTML();
					/*
					dObj.createImage(function(img) {
						img.className = "output";
						renderBox.appendChild(img);
					});
					*/
				}, d*1000, diagram[d]);
			}
		} else {
			renderbox.innerHTML = diagram.toHTML();
			diagram.createImage(function(img) {
				img.className = "output";
				renderBox.appendChild(img);
			});
		}
	}
	
	function setEvent(domElement, eventName, handler) {
		if (document.body.addEventListener) {
			domElement.addEventListener(eventName, handler);
		} else {
			domElement.attachEvent("on" + eventName, handler);
		}
	}
	
	function render() {
		var diagramStructure = target.value;
		try {
			var diagramStructure = JSON.parse(diagramStructure);
		} catch(e) {
			alert(e);
		}
		insertExample(diagramStructure);
	}

	setEvent(document.getElementById("genButton"), "click", render);
	
	/* Tablero de generación de plantillas */
	var templates = {
		"base": "\t\"declaration\": {\n\t\t\"class\": \"[classname]\",\n" +
				"\t\t\"modifiers\": \"[public||private] [abstract] [static] [final]\",\n" +
				"\t\t\"type\": \"[void or type]\",\n\t\t\"name\": \"functionName\"\n\t}\n",
		"localConsts": "\t\"localConsts\": [\n" +
				"\t\t{ \"name\": \"[constant name]\", \"value\": \"[value]\" },\n" +
				"\t\t{ \"name\": \"[constant name]\", \"value\": \"[value]\" }\n" +
				"\t]\n",
		"localVars": "\t\"localVars\": [\n" +
				"\t\t{ \"type\": \"[datatype]\", \"name\": \"[variableName]\" },\n" +
				"\t\t{ \"type\": \"[datatype]\", \"name\": \"[variableName]\" }\n" +
				"\t]\n",
		"statements": "\"statements\": [\n]",
		"assignment": "{\"type\": \"assignment\", \"data\": {\"variable\": \"[variableName]\",\"value\": \"[value, variable or expression]\" }}",
		"if": "{ \"type\": \"if\", \"data\": { \"condition\": \"[boolean expression]\",\n\"then\": [],\n\"else\": []\n}}" 
	};
	
	function targetEmpty() {
		return target.value == "";
	}
	
	function fillTemplates() {
		var buttons = document.getElementById("buttons");
		for (var t in templates) {
			var button = document.createElement("button");
			button.innerHTML = t;
			button.content = templates[t];
			var handler = function(e) {
				var value = (e.target || e.srcElement).content;
				if (targetEmpty()) {
					value = "{\n" + value + "}"
				};
				insertAtCursor(target, value);
				checkAndCompile();
			};
			setEvent(button, "click", handler);
			buttons.appendChild(button);
		}
	}
	
	
	target.onblur = checkAndCompile();
	//var compileRule = /Unexpected (token ([{,:])|string) in JSON at position ([0-9]+)/g
	
	function checkAndCompile() {
		var diagramStructure = target.value;
		try {
			target.className = "";
			var diagramStructure = JSON.parse(diagramStructure);
		} catch(e) {
			var r =  (/Unexpected (token ([{,:])|string) in JSON at position ([0-9]+)/g).exec(e.message);
			if (r) {
				switch (r[1]) {
					case "{":
					case "string":
						insertAtCursor(target, ",", parseInt(r[2]||r[3]));
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
			reparse();
		}
	}
	
	function reparse() {
		var text = target.value;
		if (text) {
			var obj = JSON.parse(text);
			target.value = JSON.stringify(obj, null, "\t");
			render();
		}
	}
	
	fillTemplates();
}