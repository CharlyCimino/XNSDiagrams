function XNSDJavaOutput(params) {
    if (!params) { params =  {}; }
    var _self = Object.create(new XNSDStatement({
        "type": "output",
        "structure": { "message": {"editable": true, "example": "valor o expresión"} }
    }));
    return _self;
}