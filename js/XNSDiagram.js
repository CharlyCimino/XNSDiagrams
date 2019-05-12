// -----------------------------------
// EXTENDED NASSI SCHNEIDERMAN DIAGRAM
// -----------------------------------
function eXtendendNassiShneiderman(params) {

    if (!params) { params =  {}; }
    var _self = Object.create(new BaseDiagram({ "graphicType": "Nassi-Shneiderman", "prefix": "xnsd", "onrender": params["onrender"] }));
    
    /* --- private properties and methods --- */

    function makeCorner(side, caption) {
        var canvas = document.createElement("canvas");
        canvas.className = "corner";
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        if (side == "true") {
            ctx.moveTo(-1, -1);
            ctx.lineTo(canvas.width+1, canvas.height+1);
        } else {
            ctx.moveTo(canvas.width+1, -1);
            ctx.lineTo(-1, canvas.height+1);
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        //var optblock = _self.newBlock("option-block", _self.newBlock("option-background"));
        var optblock = _self.newBlock("option-block", canvas);
        optblock.appendChild(_self.newBlock("caption", caption));
        return _self.newBlock("option " + side, optblock);
    }

    function appendBlockOrEmpty(container, blockClass, obj) {
        var block = _self.newBlock(blockClass);
        var i;
        if (obj && obj.length > 0) {
            for (i = 0; i < obj.length; i++) {
                _self.process(block, obj[i]["type"], obj[i]["data"]);
            }
        } else {
            block.appendChild(_self.newBlock("empty"));
        }
        container.appendChild(block);
        return container;
    }

    function fixedLoopBuilder(obj, controllerBlockBuilder) {
        var loopController = _self.newBlock("controller");
        loopController.appendChild(_self.newBlock("top", "&nbsp;"));
        loopController.appendChild(controllerBlockBuilder(_self.newBlock("content-block"), obj["control"]));
        loopController.appendChild(_self.newBlock("bottom", "&nbsp;"));
        var container = _self.newBlock("container", loopController);
        appendBlockOrEmpty(container, "statements-block", obj["statements"]);
        return _self.newBlock("for-statement", container);
    }

    /* --- diagram blocks implementation --- */
    
    function _declarationBuilder(methodDec) {
		function ifHas(value, handler, defaultValue) {
			return (typeof value != "undefined") ?
				handler(value) :
				defaultValue;
		}
        function stringValue(field, defaultValue,) {
            if (!defaultValue) { defaultValue = ""; }
            return (!field) ? defaultValue : field + " ";
        }
        function argumentsToString(args) {
            var a;
            var output = "";
            if (args) {
                for (a in args) {
                    if (output) { output += ", "; }
                    output += _self.htmlString(args[a]["type"]) + " " + args[a]["name"];
                }
            }
            return output;
        }
        function exceptionsToString(exceptionList) {
            return (!exceptionList) ? "" : " throws " + exceptionList.join(", ");
        }
		return _self.newBlock("method-declaration",
                ifHas(methodDec["class"], function(val) { return "<p>class " + val + ":</p>" }, "") +
                stringValue(methodDec["modifiers"]) +
                _self.htmlString(stringValue(methodDec["type"])) +
                stringValue(methodDec["name"], "[" + _self.SYMBOLS[_self.currentLanguage].ANONYMOUS_METHOD + "]").trim() +
                "(" + argumentsToString(methodDec["arguments"]) + ")" +
                exceptionsToString(methodDec["throws"]) + ";");
    }

    function _localVarsBuilder(localVars) {
        var box = _self.newBlock("local-variable-declaration");
        for (var v in localVars) {
            box.appendChild(_self.newBlock("", _self.htmlString(localVars[v]["type"]) + " " + localVars[v]["name"] + ";"));
        }
        return box;
    }

    function _statementsBuilder(theStatements) {
        var box = _self.newBlock("statements");
        for (var s = 0; s < theStatements.length; s++) {
            _self.process(box, theStatements[s]["type"], theStatements[s]["data"]);
        }
        return box;
    }

    function _blockBuilder(obj) {
        return _self.newBlock("block-statement", obj["content"]);
    }

    function _assignmentBuilder(obj) {
        var content = obj.variable + " &larr; ";
        if (obj.isString) { content += "\"" }
        content += _self.htmlString(obj.value);
        if (obj.isString) { content += "\"" }
        return _self.newBlock("block-statement", content);
    }

    function _conditionalBuilder(obj) {
        var header = _self.newBlock("header")
        header.appendChild(makeCorner("true", _self.SYMBOLS[_self.currentLanguage].TRUE));
        header.appendChild(_self.newBlock("condition", _self.htmlString(obj["condition"])));
        header.appendChild(makeCorner("false",  _self.SYMBOLS[_self.currentLanguage].FALSE));
        var body = _self.newBlock("body");
        appendBlockOrEmpty(body, "then side", obj["then"]);
        appendBlockOrEmpty(body, "else side", obj["else"]);
        var box = _self.newBlock("conditional-statement conditional");
        box.appendChild(header);
        box.appendChild(body);
        return box;
    }
    
    function _switchBuilder(obj) {
        function makeCaseOption(obj) {
            var column = _self.newBlock("case", _self.newBlock("test-value", (obj["value"] || obj["case"])));
            appendBlockOrEmpty(column, "statements-block", obj["statements"]);
            return column;
        }
        var header = _self.newBlock("header");
        header.appendChild(makeCorner("true", "&nbsp;"));
        header.appendChild(_self.newBlock("condition", _self.htmlString(obj["expression"])));
        header.appendChild(makeCorner("false", "&nbsp;"));
        var body = _self.newBlock("body");
        for (var c = 0; c < obj["options"].length; c++) {
            body.appendChild(makeCaseOption(obj["options"][c]));
        }
        var box = _self.newBlock("conditional-statement switch");
        box.appendChild(header);
        box.appendChild(body);
        return box;
    }

    function _breakBuilder() {
        return _self.newBlock("break-statement", "break");
    }

    function _inputBuilder(obj) {
        var box = _self.newBlock("input-statement");
        box.appendChild(_self.newBlock("symbol", _self.SYMBOLS[_self.currentLanguage].INPUT));
        box.appendChild(_self.newBlock("body", _self.htmlString(obj["variable"])));
        return box;
    }

    function _outputBuilder(obj) {
        var box = _self.newBlock("output-statement");
        box.appendChild(_self.newBlock("symbol", _self.SYMBOLS[_self.currentLanguage].OUTPUT));
        box.appendChild(_self.newBlock("body", _self.htmlString(obj["message"])));
        return box;
    }

    function _whileBuilder(obj) {
        var box = _self.newBlock("while-statement", _self.newBlock("condition", obj["condition"]));
        box.appendChild(appendBlockOrEmpty(_self.newBlock("container"), "statements-block", obj["statements"]));
        return box;
    }

    function _doWhileBuilder(obj) {
        var box = _self.newBlock("dowhile-statement", appendBlockOrEmpty(_self.newBlock("container"), "statements-block", obj["statements"]));
        box.appendChild(_self.newBlock("condition", obj["condition"]));
        return box;
    }

    function _forBuilder(obj) {
        return fixedLoopBuilder(obj, function (container, obj) {
            container.appendChild(_self.newBlock("content", obj["variable"] + " = " + obj["start"] + ", " + obj["stop"] + ", " + obj["step"]));
            return container;
        });
    }

    function _foreachBuilder(obj) {
        return fixedLoopBuilder(obj, function (container, obj) {
            container.appendChild(_self.newBlock("content", obj["class"] + " " + obj["variable"] + " : " + obj["collection"]));
            return container;
        });
    }

    function _callBuilder(obj) {
        var box = _self.newBlock("call-statement", _self.newBlock("margin left", "&nbsp;"));
        box.appendChild(_self.newBlock("call", obj["statement"]));
        box.appendChild(_self.newBlock("margin right", "&nbsp;"));
        return box;
    }
    
    function _returnBuilder(obj) {
        return _self.newBlock("block-statement", ((_self.explicitReturn) ? "<i>return</i> " : " &larr; ") + _self.htmlString(obj["value"]));
    }
    
    /* --- Nassi Shneiderman Extension: Exception blocks implementation --- */

    function _throwBuilder(obj) {
        return _self.newBlock("throw-statement", "<i>throw</i> " + _self.htmlString(obj["value"]));
    }

    function _tryBuilder(obj) {
        var box = _self.newBlock("try-statement", _self.newBlock("margin left", "try"));
        box.appendChild(appendBlockOrEmpty(_self.newBlock("container"), "statements-block", obj["statements"]));
        return box;
    }

    function _catchBuilder(obj) {
        var exception = _self.newBlock("exception");
        exception.appendChild(_self.newBlock("identifier", obj["exception"]));
        exception.appendChild(_self.newBlock("variable", obj["variable"]));
        var box = _self.newBlock("catch-statement", _self.newBlock("margin left", "catch"));
        box.appendChild(appendBlockOrEmpty(_self.newBlock("container", exception), "statements-block", obj["statements"]));
        return box;
    }

    function _finallyBuilder(obj) {
        var box = _self.newBlock("finally-statement", _self.newBlock("margin left", "finally"))
        box.appendChild(appendBlockOrEmpty(_self.newBlock("container"), "statements-block", obj["statements"]));
        return box;
    }

    /* --- object construction --- */
    function init() {
        _self.addProperty("currentLanguage", _self.getValue(params["language"], _self["DEFAULT_LANGUAGE"]));
        _self.addProperty("explicitReturn", _self.getValue(params["explicitReturn"], true));
        _self.addProperty("includeExceptions", _self.getValue(params["includeExceptions"], true));
        var _builders = {
            "declaration": _declarationBuilder,
            "localVars": _localVarsBuilder,
            "statements": _statementsBuilder,
            "block": _blockBuilder,
            "assignment": _assignmentBuilder,
            "if": _conditionalBuilder,
            "conditional": _conditionalBuilder,
            "switch": _switchBuilder,
            "break": _breakBuilder,
            "input": _inputBuilder,
            "output": _outputBuilder,
            "while": _whileBuilder,
            "dowhile": _doWhileBuilder,
            "for": _forBuilder,
            "foreach": _foreachBuilder,
            "call": _callBuilder,
            "return": _returnBuilder
        }
        if (_self["includeExceptions"]) {
            _builders["throw"] = _throwBuilder;
            _builders["try"] = _tryBuilder;
            _builders["catch"] = _catchBuilder;
            _builders["finally"] = _finallyBuilder;
        }
        for (var builder in _builders) {
            _self.register(builder, _builders[builder]);
        }
    }
    
    /* -- instance construction -- */
    init();
    return _self;
}
// -----------------------------------
// EXTENDED NASSI SCHNEIDERMAN DIAGRAM
// -----------------------------------
// Class Synonym
var XNSDiagram = eXtendendNassiShneiderman;