var templateBase = {
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

var categories = {
	"Bloques y E/S": {
		"Entrada": {
			"type": "input",
			"data": {
				"variable": "variable"
			}
		},
		"Salida": {
			"type": "output",
			"data": {
				"message": "valor"
			}
		},
		"Bloque": {
			"type": "block",
			"data": {
				"content": "instrucción"
			}
		}
	},
	"Variables": {
		"Declarar variable": {
			"type": "tipo",
			"name": "nombre"
		},
		"Asignar variable": {
			"type": "assignment",
			"data": {
				"variable": "variable",
				"value": "valor"
			}
		}
	},
	"Selección": {
		"if": {
			"type": "if",
			"data": {
				"condition": "condicion",
				"then": [],
				"else": []
			}
		},
		"switch": {
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
					}
				]
			}
		}
	},
	"Repetición": {
		"while": {
			"type": "while",
			"data": {
				"condition": "condicion",
				"statements": []
			}
		},
		"do-while": {
			"type": "dowhile",
			"data": {
				"condition": "condicion",
				"statements": []
			}
		},
		"for": {
			"type": "for",
			"data": {
				"control": {
					"variable": "variable",
					"start": "inicio",
					"stop": "hasta",
					"step": "paso"
				},
				"statements": []
			}
		},
		"for-each": {
			"type": "foreach",
			"data": {
				"control": {
					"class": "tipo",
					"variable": "valor",
					"collection": "coleccion"
				},
				"statements": []
			}
		}
	},
	"Métodos": {
		"Nuevo parámetro": {
			"type": "tipo",
			"name": "nombre"
		},
		"Invocar método": {
			"type": "call",
			"data": {
				"statement": "objeto.metodo(params)"
			}
		},
		"Retornar": {
			"type": "return",
			"data": {
				"value": "valor"
			}
		}
	}
};