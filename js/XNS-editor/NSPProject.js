function NSPProject(data) {
	var _self = this;
	var _DEFAULT_NAME = "Proyecto sin título";
	var _DEFAULT_AUTHOR = "Sin autor";
	var _DEFAULT_GROUP = "Sin comisión";

	var _name = _DEFAULT_NAME;
	var _autor = _DEFAULT_AUTHOR;
	var _comission = _DEFAULT_GROUP;
	var _dateStart = new Date();
	var _date;
	var _minutes = 0;

	var _diagrams = [];

	var _meta = null;

	function init() {
		_autor = data["usr"];
		_comission = data["com"];
	}

	function addDiagram(diagram) {
		_diagrams.push(diagram);
	}
	function moveDiagramUp(index) {
		swapInArray(_diagrams, index, index - 1);
	}
	function moveDiagramDown(index) {
		swapInArray(_diagrams, index, index + 1);
	}
	function cloneDiagram(index) {
		var d = _diagrams[index];
		var theClone = new NSPDiagram(d.theClass, d.name, d.code);
		_diagrams.splice(index + 1, 0, theClone);
		return theClone;
	}
	function deleteDiagram(id) {
		var index = -1;
		var diagramFound = getDiagramById(id);
		if (diagramFound) {
			index = _diagrams.indexOf(diagramFound);
			if (index > -1) {
				_diagrams.splice(index, 1);
			}
		}
		return index;
	}
	function getDiagramById(id) {
		var diag = null, i = 0;
		while (i < _diagrams.length && _diagrams[i].id != id) { i++ }
		if (i < _diagrams.length) { diag = _diagrams[i]; }
		return diag;
	}
	function getName() { return _name; }
	function setName(value) { _name = value || _DEFAULT_NAME; }
	function setData (name, autor, comission) {
		_setName(name);
		_autor = autor;
		_comission = comission;
	}
	function fillInfo() {
		_date = new Date();
		_minutes = calculateMinutes(_date);
	}
	function calculateMinutes(current) {
		var diff = current.getTime() - _dateStart.getTime();
		// ms --> minutes
		return Math.trunc(diff / (1000 * 60));
	}
	function check(value) { return (value); }
	function getForExport(complete) {
		_date = new Date();
		return { ...{ "name": _name, "diagrams": _diagrams },
				 ...((complete) ? { "autor": _autor, "comission": _comission, "date": _date, "minutes": _minutes } : {}) };
	}
	function fillHistorial(popup) {
		if (!popup) return;
		function newRow(content, classStyle) {
			var item = document.createElement("span");
			item.className = classStyle;
			item.innerHTML = content;
			return item;
		}
		var row;
		if (_meta) {
			var data = DataConversor.toJS(_meta);
			popup.innerHTML = "";
			for (var i = 0; i < data.length; i++) {
				row = document.createElement("DIV");
				row.className = "row";
				row.appendChild(newRow(data[i].i.autor, "autor"));
				row.appendChild(newRow(new Date(data[i].i.start).toLocaleString(), "date"));
				row.appendChild(newRow(new Date(data[i].d).toLocaleString(), "date"));
				popup.appendChild(row);
			}
		}
	}
	function importFromJSON(jObject) {
		_name = jObject.name;
		_autor = jObject.autor;
		_comission = jObject.comission;
		_meta = jObject.meta;
		jObject.diagrams.forEach(diagram => { addDiagram(new NSPDiagram(diagram.theClass, diagram.name, diagram.code)); });
	}
	function setMeta(value) { _meta = value }
	function getMeta() { return _meta }
	function getDiagramLength() { return _diagrams.length }
	function hasDiagrams() { return getDiagramLength() > 0 }
	function getResolutionTime() { return _minutes }
	
	function getFirst() { return (hasDiagrams) ? _diagrams[0] : null }
	function getDiagram(idx) { return (_diagrams.length > idx) ? _diagrams[idx] : null }
	function publish(callback) { if (callback) _diagrams.forEach(d => { callback(d) }); }

	function getMetaInfo() { return { 'autor': _autor, 'comission': _comission, 'start': _dateStart.toISOString(), 'minutes': _minutes, 'mev': data["mev"] }; }
	function getInfo(key) { return data["key"] };
	function getDateStr() { return _date.toLocaleString() }

	init();

	Object.defineProperty(_self, "meta", { "enumerable": true, "configurable": false, "get" : getMeta, "set": setMeta });
	Object.defineProperty(_self, "name", {  "enumerable": true, "configurable": false, "get" : getName, "set": setName });
	Object.defineProperty(_self, "hasDiagrams", {  "enumerable": true, "configurable": false, "get" : hasDiagrams });
	Object.defineProperty(_self, "resolutionTime", {  "enumerable": true, "configurable": false, "get" : getResolutionTime });
	
	Object.defineProperty(_self, "fillInfo", { "enumerable": false, "writable": false, "configurable": false, "value": fillInfo })
	Object.defineProperty(_self, "moveDiagramUp", { "enumerable": false, "writable": false, "configurable": false, "value": moveDiagramUp })
	Object.defineProperty(_self, "moveDiagramDown", { "enumerable": false, "writable": false, "configurable": false, "value": moveDiagramDown })
	Object.defineProperty(_self, "diagramsCount", { "enumerable": false, "writable": false, "configurable": false, "value": getDiagramLength })
	Object.defineProperty(_self, "publishTo", { "enumerable": false, "writable": false, "configurable": false, "value": publish })
	Object.defineProperty(_self, "getFirst", {  "enumerable": false, "writable": false, "configurable": false, "value" : getFirst });
	Object.defineProperty(_self, "addDiagram", {  "enumerable": false, "writable": false, "configurable": false, "value" : addDiagram });
	Object.defineProperty(_self, "deleteDiagram", {  "enumerable": false, "writable": false, "configurable": false, "value" : deleteDiagram });
	Object.defineProperty(_self, "getDiagram", {  "enumerable": false, "writable": false, "configurable": false, "value" : getDiagram });
	Object.defineProperty(_self, "cloneDiagram", { "enumerable": false, "writable": false, "configurable": false, "value": cloneDiagram });
	Object.defineProperty(_self, "fillHistorial", { "enumerable": false, "writable": false, "configurable": false, "value": fillHistorial });
	Object.defineProperty(_self, "getForExport", { "enumerable": false, "writable": false, "configurable": false, "value": getForExport });
	Object.defineProperty(_self, "getMetaInfo", { "enumerable": false, "writable": false, "configurable": false, "value": getMetaInfo });
	Object.defineProperty(_self, "getInfo", { "enumerable": false, "writable": false, "configurable": false, "value": getInfo });
	Object.defineProperty(_self, "getDateStr", { "enumerable": false, "writable": false, "configurable": false, "value": getDateStr });
	Object.defineProperty(_self, "import", { "enumerable": false, "writable": false, "configurable": false, "value": importFromJSON });

	return _self;
}