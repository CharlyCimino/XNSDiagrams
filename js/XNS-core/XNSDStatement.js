// ------------------
// STATEMENT CLASS
// ------------------
function XNSDStatement(params) {
    if (!params) { params =  {}; }
    var _self = Object.create(new ClassConstructor());
    var _renderer = params["renderer"];
    var _json = {};
    var _elements = null;
    
    /* --- private properties and methods --- */

    /* --- published properties and methods --- */
    function _createInstance(){
        _json = { "type" : _self.type };
        var data = {};
        for (var field in _self.structure) {
            if (_self.structure[field].editable) {
                data[field] = prompt(field, _self.structure[field].example);
            }
        }
        _json.data = data;
        _self.json = _json;
        return _json;
    }
    
    function _render() {
        _elements = null;
        if (_renderer && _json) {
            _elements = _renderer(_json);
        }
        return _elements;
    }
    
    /* --- object construction --- */
    function init() {
        _self.addProperty("type", params["type"]);
        _self.addProperty("structure", params["structure"]);
        _self.addProperty("json", _json);
        _self.addMethod("render", _render);
        _self.addMethod("edit", _createInstance);
        _self.publish(_self);
    }
    init();
    return _self;
}
// ----------------------
// END STATEMENT CLASS
// ----------------------