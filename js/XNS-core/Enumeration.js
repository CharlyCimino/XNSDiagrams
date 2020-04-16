// ----------------------
// Enumeration CLASS
// It creates enumeration by the keyname (from 0 to consecutive next values) or from a key with an associated value.
// If Object.freeze is available, and in order to avoid the enumeration's values modification, the created enumeration is freezed.
//
// Example:
// var myEnum = new Enumeration('A', 'B', 'C');
//      --> myEnum.A -> 0, myEnum.B -> 1, myEnum.C -> 2, myEnum.size -> 3
//
// var myEnum = new Enumeration({'A':1, 'B':2, 'C':4, 'D':8});
//      --> myEnum.A -> 1, myEnum.B -> 2, myEnum.C -> 4, myEnum.D -> 8
// ----------------------
function Enumeration() {
    var _self = this;
    var _keys = [];
    var _values = {};

    function initialize(values) {
        function add(items){
            for (var i=0; i < items.length; i++) {
                addEnumValue(items[i], i);
            }
        }
        if (typeof values[0] == 'string') {
            add(values);
        } else if (values[0] instanceof Array) {
            add(values[0]);
        } else {
            var jsonDef = values[0];
            for (var key in jsonDef) {
                addEnumValue(key, jsonDef[key]);
            }
            jsonDef = null;
        }
    }
    function addEnumValue(key, value) {
        // -- Prevent to override the value if the key already exists.
        _keys.push(key);
        if (_self[key] == undefined) {
            _values[key] = value;
            Object.defineProperty(_self, key, { 'enumerable': true, 'configurable': false, 'get': function () { return _values[key]; } });
        }
    }
    function hasValue(value) {
        return Object.values(_self).indexOf(value) != -1;
    }
    function getKey(value) {
        return _keys[value];
    }
    if (arguments && arguments.length > 0) initialize(arguments);
    else throw new Error('Cannot define new enum without arguments');

    Object.defineProperty(_self, 'hasValue', { 'enumerable': false, 'configurable': false, 'writable': false, 'value': hasValue });
    Object.defineProperty(_self, 'getKey', { 'enumerable': false, 'configurable': false, 'writable': false, 'value': getKey });
    Object.defineProperty(_self, 'getKey', { 'enumerable': false, 'configurable': false, 'writable': false, 'value': getKey });
    return (Object.freeze) ? Object.freeze(_self) : _self;
}
// ----------------------
// END ENUMERATION CLASS
// ----------------------
