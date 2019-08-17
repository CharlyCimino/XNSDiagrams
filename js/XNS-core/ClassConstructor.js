// -----------------------
// CLASS_CONSTRUCTOR CLASS
// -----------------------
function ClassConstructor() {
    /* --- private properties and methods --- */

    var _self = this;
    var _properties = {};
    var _enums = {}
    var _methods = {};
    var _observers = [];
    
    var _visibility = new Enumeration("PRIVATE", "PUBLIC");
    
    var _defaultAttributes = {
        "configurable": false,
        "writable": true,
        "enumerable": true,
        "to_clone": false,
        "get": null
    };

    /* --- published properties and methods --- */

    function _addProperty(propertyName, value, modAttrs) {        
        if (!_self.hasOwnProperty(propertyName)) {
            var attributes = JSON.parse(JSON.stringify(_defaultAttributes));
            if (modAttrs) {
                for (var a in attributes) {
                    if (typeof modAttrs[a] != "undefined") {
                        attributes[a] = modAttrs[a];
                    }
                }
            }
            if (!attributes["writable"]) {
                propertyName = propertyName.toUpperCase();
            }
            _properties[propertyName] = value;
            if (attributes["writable"]) {
                attributes["set"] = function (newValue) { _properties[propertyName] = newValue; };
            } else if (!attributes["writable"] && attributes["to_clone"] && _properties[propertyName] instanceof Array) {
                if (Object.freeze) {
                    Object.freeze( _properties[propertyName]);
                }
            }
            delete attributes["writable"];
            if (attributes["get"] == null) {
                attributes["get"] = function () {
                    return _properties[propertyName];
                };                
            }
            Object.defineProperty(_self, propertyName, attributes);
        }
    }

    function _addEnumProperty(enumName, values) {
        enumName = enumName.toUpperCase();
        if (!_self.hasOwnProperty(enumName)) {
            _enums[enumName] = new Enumeration(values);
            Object.defineProperty(_self, enumName, {
                "configurable": false, "enumerable": true,
                "get": function () { return _enums[enumName]; }
            });
        }
    }

    function _addMethod(methodName, value, visibility) {
        if (!_self.hasOwnProperty(methodName)) {
            var enumerable = (visibility != _visibility["PRIVATE"]);
            _methods[methodName] = value;
            Object.defineProperty(_self, methodName, {
                "configurable": false, "enumerable": enumerable, "writable": false, "value": _methods[methodName]
            });
        }
    }
    
    function _publish(targetObject) {
        for (var property in _self) {
            Object.defineProperty(targetObject, property, { "enumerable": true, "writable": true, "configurable": false, "value": _self[property] });
        }        
    }
    
    function _getVisibility() {
        return _visibility; 
    }
    
    function _getValue(value, defaultValue) {
        return (typeof value != "undefined") ? value: defaultValue;
    }
    
    function _addObserver(observer) {
        _observers.push(observer);
    }

    function _removeObserver(observer) {
        var pos = _observers.indexOf(observer);
        if (pos != -1) {
            _observers.splice(pos, 1);
        }
    }
        
    function _notify(message) {
        for (var i=0; i<_observers.length; i++) {
            _observers[i].update();
        }
    }

    Object.defineProperty(_self, "addProperty", { "configurable": false, "writable": false, "enumerable": false, "value": _addProperty });
    Object.defineProperty(_self, "addEnumProperty", { "configurable": false, "writable": false, "enumerable": false, "value": _addEnumProperty });
    Object.defineProperty(_self, "addMethod", { "configurable": false, "writable": false, "enumerable": false, "value": _addMethod });
    Object.defineProperty(_self, "publish", { "configurable": false, "writable": false, "enumerable": false, "value": _publish });
    Object.defineProperty(_self, "getValue", { "configurable": false, "writable": false, "enumerable": false, "value": _getValue });
    Object.defineProperty(_self, "addObserver", { "configurable": false, "writable": false, "enumerable": false, "value": _addObserver });
    Object.defineProperty(_self, "removeObserver", { "configurable": false, "writable": false, "enumerable": false, "value": _removeObserver });
    Object.defineProperty(_self, "notify", { "configurable": false, "writable": false, "enumerable": false, "value": _notify });
    Object.defineProperty(_self, "MEMBER_VISIBILITY", { "configurable": false, "enumerable" : "true", "get": _getVisibility } );
    return _self;
}
// ---------------------------
// END CLASS_CONSTRUCTOR CLASS
// ---------------------------