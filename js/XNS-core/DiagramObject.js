// -----------------------
// BASE DIAGRAM Object CLASS
// -----------------------
function DiagramObject(params) {

    var _self = Object.create(new ClassConstructor());

    /* --- private methods --- */
    
    /* --- published properties and methods --- */
    
    function _toHTML() {
        return _self.HTML.innerHTML;
    }

    function _toJSON() {
        return _self.DEFINITION;
    }

    function _createImage(onrender) {
        if (typeof onrender != "undefined") {
            html2canvas(_self.HTML).then(
                function(canvas) {
                    _self.canvas = canvas;
                    if (onrender) {
                        onrender(_toImage());
                    }
            });
        }
    }

    function _toImage() {
        _self.image = null;
        if (_self.canvas) {
            _self.image = new Image();
            _self.image.src = _self.canvas.toDataURL("image/png");
        }
        return _self.image;
    }

    /* --- object construction --- */
    function init() {
        _self.addProperty("DEFINITION", params["json"] || null, {"writable": false});
        _self.addProperty("HTML", params["html"] || null, {"writable": false});
        _self.addProperty("image", null);
        _self.addProperty("canvas", null);
        _self.addMethod("toHTML", _toHTML);
        _self.addMethod("toJSON", _toJSON);
        _self.addMethod("createImage", _createImage);
        _self.publish(_self);
    }
    init();
    return _self;
}
// ---------------------------
// END BASE DIAGRAM CLASS
// ---------------------------