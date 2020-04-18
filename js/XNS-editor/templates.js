var base = {
	"declaration": {
		"class": "Clase",
		"modifiers": "public",
		"type": "void",
		"name": "método",
		"arguments": []
	},
	"localVars": [],
	"statements": []
};

var buttonsDiagramTemplates = [{
	"type": "tipo",
	"name": "nombre"
}, {
	"type": "final tipo",
	"name": "NOMBRE"
}, {
	"type": "final tipo",
	"name": "NOMBRE",
	"value": "expresión"
}, {
	"type": "tipo",
	"name": "nombre"
}, {
	"type": "tipo",
	"name": "nombre",
	"value": "expresión"
}];

var newDeclaration = {
	"type": "tipo",
	"name": "nombre"
};

var templates = [
	{
		"type": "block",
		"data": {
			"content": "instrucción"
		}
	},
	{
		"type": "assignment",
		"data": {
			"variable": "variable",
			"value": "expresión"
		}
	},
	{
		"type": "output",
		"data": {
			"message": "expresión"
		}
	},
	{
		"type": "input",
		"data": {
			"variable": "variable"
		}
	},
	{
		"type": "if",
		"data": {
			"condition": "condicion",
			"then": [],
			"else": []
		}
	},
	{
		"type": "switch",
		"data": {
			"expression": "variable",
			"options": [{
				"case": "1",
				"statements": []
			},
			{
				"case": "2",
				"statements": []
			},
			{
				"case": "default",
				"statements": []
			}]
		}
	},
	{
		"type": "while",
		"data": {
			"condition": "condicion",
			"statements": []
		}
	},
	{
		"type": "dowhile",
		"data": {
			"condition": "condicion",
			"statements": []
		}
	},
	{
		"type": "for",
		"data": {
			"control": {
				"variable": "var",
				"start": "inicio",
				"stop": "fin",
				"step": "paso"
			},
			"statements": []
		}
	},
	{
		"type": "foreach",
		"data": {
			"control": {
				"class": "Tipo",
				"variable": "variable",
				"collection": "colección"
			},
			"statements": []
		}
	},
	{
		"type": "call",
		"data": {
			"statement": "objeto.metodo(params)"
		}
	},
	{
		"type": "return",
		"data": {
			"value": "expresión"
		}
	},
	{
		"type": "break",
		"data": ""
	}
];