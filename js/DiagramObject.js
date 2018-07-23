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

    function _createCanvas() {
        html2canvas(_self.HTML).then(
            function(canvas) {
                _self.canvas = canvas;
                if (_self.onrender) {
                    _self.onrender(_toImage());
                }
        });
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
        _self.addProperty("onrender", params["onrender"] || null);
        _self.addMethod("toHTML", _toHTML);
        _self.addMethod("toJSON", _toJSON);
        _self.addMethod("toImage", _toImage);
        _self.addMethod("refresh", _createCanvas);
        _self.publish(_self);
        _createCanvas();
    }
    init();
    return _self;
}
// ---------------------------
// END BASE DIAGRAM CLASS
// ---------------------------