function NSPProject(data) {
	var _self = this;
	var _DEFAULT_NAME = "Proyecto sin título";
	var _DEFAULT_AUTHOR = "Sin autor";
	var _DEFAULT_GROUP = "Sin comisión";

	var _data = {
		"usr": _DEFAULT_AUTHOR,
		"com": _DEFAULT_GROUP,
		"uid": null,
		"mev": null,
		"tea": false,
		"ref": document.referrer,
		"url": document.location.href
	}

	var _name = _DEFAULT_NAME;
	var _dateStart = new Date();
	var _date =  new Date();
	var _minutes = 0;
	var _mevDate = null;

	var _diagrams = [];

	var _meta = null;
	var _log = null;

	function init() { setData(data); checkMEV() }
	function checkMEV() {
		if (_data["mev"]) {
			if (_data["mev"].charAt(_data["mev"].length-1) != "=") _data["mev"]+="=";
			_mevDate = DataConversor.toDate(_data["mev"]);
		}
	}
	function setData(obj) { for (x in _data) if (obj[x]) _data[x] = obj[x]; }
	function addDiagram(diagram) { _diagrams.push(diagram); }
	function moveDiagramUp(index) { swapInArray(_diagrams, index, index - 1); }
	function moveDiagramDown(index) { swapInArray(_diagrams, index, index + 1); }
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
	function updateTime() {
		_date = new Date();
		_minutes = calculateMinutes(_date);
	}
	function calculateMinutes(current) {
		var diff = current.getTime() - _dateStart.getTime();
		// ms --> minutes
		return Math.trunc(diff / (1000 * 60));
	}
	function getForExport(complete, callback) {
		_date = new Date();
		var obj = {
			...{ "name": _name, "diagrams": _diagrams },
			...((complete) ? { "autor": _data["usr"], "comission": _data["com"], "date": _date, "minutes": _minutes } : {}) };
		if (callback) callback();
		updateTime();
		var meta = new XNS_META(_meta);
		meta.add(getMetaInfo());
		obj.meta = meta.data;
		return obj;
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
			popup.innerHTML = "";
			if (_data["mev"]) {
				row = document.createElement("DIV");
				row.className = "evalrow";
				row.innerHTML = _data["com"] + " - Cierre: " + DataConversor.toDate(_data["mev"]).toLocaleString();
				popup.appendChild(row);
			}
			for (var i = 0; i < _log.length; i++) {
				row = document.createElement("DIV");
				row.className = "row";
				row.appendChild(newRow(_log[i].i.autor, "autor"));
				row.appendChild(newRow(new Date(_log[i].i.start).toLocaleString(), "date"));
				row.appendChild(newRow(new Date(_log[i].d).toLocaleString(), "date"));
				popup.appendChild(row);
			}
		}
	}
	function importFromJSON(obj) {
		_name = obj.name;
		setMeta(obj.meta);
		if (isEvalTime() && !(isTeacher() || isMyFile(obj.autor))) throw "Invalid";
		obj.diagrams.forEach(diagram => { addDiagram(new NSPDiagram(diagram.theClass, diagram.name, diagram.code)); });
	}
	function isMyFile(a) { return a == _data["usr"] }
	function setMeta(value) { _meta = value; _log = DataConversor.toJS(_meta) }
	function getMeta() { return _meta }
	function getDiagramLength() { return _diagrams.length }
	function hasDiagrams() { return getDiagramLength() > 0 }
	function getResolutionTime() { if (!_minutes) updateTime(); return _minutes }
	
	function getFirst() { return (hasDiagrams) ? _diagrams[0] : null }
	function getDiagram(idx) { return (_diagrams.length > idx) ? _diagrams[idx] : null }
	function publish(callback) { if (callback) _diagrams.forEach(d => { callback(d) }); }

	function getMetaInfo() {
		return { 'autor': _data["usr"], 'comission': _data["com"],
			'start': _dateStart.toISOString(), 'minutes': _minutes, 'mev': _data["mev"] };
	}
	function getLog() { return _log }
	function getInfo(key) { return _data[key] };
	function getDateStr() { return _date.toLocaleString() }
	function isEvalTime() { return _mevDate && _mevDate > new Date() }
	function isTeacher() { return _data["tea"] || (_data["usr"] && isNaN(_data["uid"])) }
	function getFullname() { return ((isEvalTime() && !isTeacher()) ? [_data["com"], _data["uid"], getName()] : [getName()]).join("_") }

	init();

	Object.defineProperty(_self, "meta", { "enumerable": true, "configurable": false, "get" : getMeta, "set": setMeta });
	Object.defineProperty(_self, "name", {  "enumerable": true, "configurable": false, "get" : getName, "set": setName });
	Object.defineProperty(_self, "hasDiagrams", {  "enumerable": true, "configurable": false, "get" : hasDiagrams });
	Object.defineProperty(_self, "resolutionTime", {  "enumerable": true, "configurable": false, "get" : getResolutionTime });
	Object.defineProperty(_self, "et", {  "enumerable": true, "configurable": false, "get" : isEvalTime });
	Object.defineProperty(_self, "fullname", {  "enumerable": true, "configurable": false, "get" : getFullname });
	
	Object.defineProperty(_self, "updateTime", { "enumerable": false, "writable": false, "configurable": false, "value": updateTime })
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
	Object.defineProperty(_self, "getLog", { "enumerable": false, "writable": false, "configurable": false, "value": getLog });
	Object.defineProperty(_self, "getInfo", { "enumerable": false, "writable": false, "configurable": false, "value": getInfo });
	Object.defineProperty(_self, "getDateStr", { "enumerable": false, "writable": false, "configurable": false, "value": getDateStr });
	Object.defineProperty(_self, "import", { "enumerable": false, "writable": false, "configurable": false, "value": importFromJSON });
	Object.defineProperty(_self, "set", { "enumerable": false, "writable": false, "configurable": false, "value": setData });

	return _self;
}