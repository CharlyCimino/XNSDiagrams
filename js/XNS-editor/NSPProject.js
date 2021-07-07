function NSPProject(data) {
	var _self = this;
	var _DEFAULT_NAME = "Proyecto sin título";
	var _DEFAULT_AUTHOR = "Sin autor";
	var _DEFAULT_GROUP = "Sin comisión";

	var _VERSION_NUMBER = 0.5;

	var _version = 0;

	var _env = {
		"tea": false,
		"uid": null,
		"evs": null,
		"eve": null,
		"usr": _DEFAULT_AUTHOR,
		"com": _DEFAULT_GROUP,
		"notify": null
	}
	var _defaults = {
		"usr": _DEFAULT_AUTHOR,
		"uid": null,
		"com": _DEFAULT_GROUP,
		"sem": null,
		"ref": document.referrer,
		"url": document.location.href,
		"notify": null
	}

	var _data = null;

	var _name = _DEFAULT_NAME;
	var _dateStart = new Date();
	var _date =  new Date();
	var _minutes = 0;
	var _evStart = null;
	var _evEnd = null;

	var _iem = false;

	var _diagrams = [];

	var _meta = null;
	var _log = null;

	function init() { resetData(); setData(data); setEnv(data); checkMEV(); starCheckTimer() }
	function checkMEV() {
		if (_env["evs"]) {
			if (_env["evs"].charAt(_env["evs"].length-1) != "=") _env["evs"]+="=";
			_evStart = DataConversor.toDate(_env["evs"]);
		}
		if (_env["eve"]) {
			if (_env["eve"].charAt(_env["eve"].length-1) != "=") _env["eve"]+="=";
			_evEnd = DataConversor.toDate(_env["eve"]);
		}
	}
	function starCheckTimer() {
		if (_evStart) {
			var now = new Date();
			var status = _evStart.valueOf() <= now.valueOf() && now.valueOf() <= _evEnd;
			if (status != _iem) {
				_iem = status;
				if (_env.notify) {
					_env.notify({ 'action': (_iem) ? 'refresh': 'emchange' });
				}
			}
			window.setTimeout(starCheckTimer, 1000);
		}
	}
	function resetData() { _data = JSON.parse(JSON.stringify(_defaults)); }
	function setData(obj) { for (x in _data) if (obj[x]) _data[x] = obj[x]; }
	function setEnv(obj) { for (x in _env) if (obj[x]) _env[x] = obj[x]; }
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
		if (callback) callback();
		updateTime();
		var obj = {
			...{ "name": _name, "diagrams": _diagrams },
			...((complete) ? { "usr": _env["usr"], "uid": _env["uid"], "com": _env["com"], "date": _date, "minutes": _minutes, "sem": (isEvalTime()) ? _env["evs"] : undefined } : {}) };
		var meta = new XNS_META(_meta);
		meta.add(getMetaInfo());
		obj.meta = meta.data;
		return { "ver": _VERSION_NUMBER, "data" : DataConversor.fromJS(obj, true) };
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
			if (_data && _data["sem"]) {
				row = document.createElement("DIV");
				row.className = "evalrow";
				row.innerHTML = _data["com"] + " - Cierre: " + DataConversor.toDate(_data["sem"]).toLocaleString();
				popup.appendChild(row);
			}
			for (var i = 0; i < _log.length; i++) {
				row = document.createElement("DIV");
				row.className = "row";
				row.appendChild(newRow(_log[i].i.autor || _log[i].i.usr, "autor"));
				row.appendChild(newRow(new Date(_log[i].i.start).toLocaleString(), "date"));
				row.appendChild(newRow(new Date(_log[i].d).toLocaleString(), "date"));
				popup.appendChild(row);
			}
		}
	}
	function importFromJSON(obj) {
		resetData();
		_version = obj["ver"] || 0.1;
		if (_version > 0.1) {
			obj = DataConversor.toJS(obj["data"], true);
		}
		_name = obj.name;
		setData(obj);
		setMeta(obj.meta);
		if (isEvalTime() && !(isTeacher() || isMyFile(obj["autor"] || obj["usr"]))) throw "Invalid";
		obj.diagrams.forEach(diagram => { addDiagram(new NSPDiagram(diagram.theClass, diagram.name, diagram.code)); });
	}
	function isMyFile(a) { return a == _env["usr"] }
	function setMeta(value) { _meta = value; _log = DataConversor.toJS(_meta) }
	function getMeta() { return _meta }
	function getDiagramLength() { return _diagrams.length }
	function hasDiagrams() { return getDiagramLength() > 0 }
	function getResolutionTime() { if (!_minutes) updateTime(); return _minutes }
	
	function getFirst() { return (hasDiagrams) ? _diagrams[0] : null }
	function getDiagram(idx) { return (_diagrams.length > idx) ? _diagrams[idx] : null }
	function publish(callback) { if (callback) _diagrams.forEach(d => { callback(d) }); }

	function getMetaInfo() {
		var mi = { "usr": _env["usr"], "com": _env["com"], "start": _dateStart.toISOString(), "minutes": _minutes };
		if (isEvalTime()) mi["sem"] = _env["evs"];
		return mi;
	}
	function getLog() { return _log }
	function getInfo(key) { return _env[key] }
	function getDateStr() { return _date.toLocaleString() }
	function isEvalTime() { return _iem }
	function isTeacher() { return _env["tea"] || (_env["uid"] && isNaN(_env["uid"])) }
	function getFullname() { return ((isEvalTime() && !isTeacher()) ? [_env["com"], _env["uid"], getName()] : [getName()]).join("_") }

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