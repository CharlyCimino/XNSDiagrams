var templates = {
	"base": {
		"declaration": {
			"modifiers": "[visibilidad] [static]",
			"type": "tipoDeDato / void",
			"class": "Class",
			"name": "nombreMetodo",
			"arguments": []
		},
		"localVars": [],
		"statements": [{
			"type": "block",
			"data": {
				"content": "[instruccion]"
			}
		}]
	},
	"parametro": {
		"type": "[tipo]",
		"name": "[nombre]"
	},
	"variable": {
		"type": "[tipo]",
		"name": "[nombre]"
	},
	"asignacion": {
		"type": "assignment",
		"data": {
			"variable": "[variable]",
			"value": "[valor]"
		}
	},
	"salida": {
		"type": "output",
		"data": {
			"message": "[valor]"
		}
	},
	"entrada": {
		"type": "input",
		"data": {
			"variable": "[variable]"
		}
	},
	"invocacion": {
		"type": "call",
		"data": {
			"statement": "[objeto.]metodo([argumentos...])"
		}
	},
	"return": {
		"type": "return",
		"data": {
			"value": "[valor]"
		}
	},
	"if": {
		"type": "if",
		"data": {
			"condition": "variable o expresión lógica",
			"then": [{
				"type": "block",
				"data": {
					"content": "[caso_verdadero]"
				}
			}],
			"else": [{
				"type": "block",
				"data": {
					"content": "[caso_falso]"
				}
			}]
		}
	},
	"switch": {
		"type": "switch",
		"data": {
			"expression": "variable o expresión enumerable",
			"options": [{
					"case": "A",
					"statements": [{
							"type": "output",
							"data": {
								"message": "\"lo que hago si vale A\""
							}
						},
						{
							"type": "break"
						}
					]
				},
				{
					"case": "B",
					"statements": [{
							"type": "output",
							"data": {
								"message": "\"lo que hago si vale B\""
							}
						},
						{
							"type": "break"
						}
					]
				},
				{
					"case": "default",
					"statements": [{
						"type": "output",
						"data": {
							"message": "\"lo que hago si vale por default\""
						}
					}]
				}
			]
		}
	},
	"while": {
		"statements": [{
			"type": "while",
			"data": {
				"condition": "[condicion]",
				"statements": [{
					"type": "block",
					"data": {
						"content": "[instruccion]"
					}
				}]
			}
		}]
	},
	"do-while": {
		"statements": [{
			"type": "do-while",
			"data": {
				"condition": "[condicion]",
				"statements": [{
					"type": "block",
					"data": {
						"content": "[instruccion]"
					}
				}]
			}
		}]
	},
	"for": {
		"type": "for",
		"data": {
			"control": {
				"variable": "variable",
				"start": "valorInicio",
				"stop": "valorFinal",
				"step": "paso"
			},
			"statements": [{
				"type": "output",
				"data": {
					"message": "\"variable vale \" + variable"
				}
			}]
		}
	},
	"for-each": {
		"type": "foreach",
		"data": {
			"control": {
				"class": "Clase",
				"variable": "objeto",
				"collection": "coleccion"
			},
			"statements": [{
				"type": "output",
				"data": {
					"message": "objeto"
				}
			}]
		}
	},
	"try-catch-finally": {
		"statements": [{
				"type": "try",
				"data": {
					"statements": [{
						"type": "input",
						"data": {
							"variable": "numero"
						}
					}]
				}
			},
			{
				"type": "catch",
				"data": {
					"exception": "SomeException",
					"variable": "se",
					"statements": [{
							"type": "output",
							"data": {
								"message": "'Hubo una excepcion: ' + se.getMessage()"
							}
						},
						{
							"type": "throw",
							"data": {
								"value": "new RuntimeException(se.getMessage())"
							}
						}
					]
				}
			},
			{
				"type": "catch",
				"data": {
					"exception": "SomeOtherException",
					"variable": "soe",
					"statements": [{
							"type": "output",
							"data": {
								"message": "'Hubo otra excepcion: ' + soe.getMessage()"
							}
						},
						{
							"type": "throw",
							"data": {
								"value": "new RuntimeException(soe.getMessage())"
							}
						}
					]
				}
			},
			{
				"type": "finally",
				"data": {
					"statements": [{
						"type": "block",
						"data": {
							"content": "bloque de instrucciones, solo si es necesario"
						}
					}]
				}
			}
		]
	}
}