var templates = [
	/*{
		"type": "base",
		"data": {
			"declaration": {
				"class": "Clase",
				"modifiers": "public",
				"type": "void",
				"name": "método",
				"arguments": []
			},
			"localVars": [],
			"statements": []
		}
	},*/
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
				"variable": "variable",
				"start": "desde",
				"stop": "hasta",
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
	}
	/*,{
		"name": "Nuevo parámetro",
		"data": {
			"type": "tipo",
			"name": "nombre"
		}
	},
	{
		"type": "break",
		"data": ""
	}*/
];