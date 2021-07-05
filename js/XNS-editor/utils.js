function setEvent(domElement, eventName, handler) {
	if (document.body.addEventListener) {
		domElement.addEventListener(eventName, handler);
	} else {
		domElement.attachEvent("on" + eventName, handler);
	}
}

function removeEvent(domElement, eventName, handler) {
	if (document.body.removeEventListener) {
		domElement.removeEventListener(eventName, handler);
	} else {
		domElement.detachEvent("on" + eventName, handler);
	}
}

function applyClassInNode(flag, className, node) {
	if (flag) {
		node.classList.add(className);
	} else {
		node.classList.remove(className);
	}
}

function toggleClass(element, theClass) {
	if (element.className.indexOf(theClass) == -1) {
		element.className += " " + theClass;
	} else {
		element.className = element.className.replace(" " + theClass, "");
	}
}

function toJSON(codeStr) {
	var codeJson = {};
	try {
		codeJson = JSON.parse(codeStr);
	} catch (e) {
		console.log(e);
	}
	return codeJson;
}

function clearAllChilds(node) {
	while (node.firstChild) {
		node.removeChild(node.lastChild);
	}
}

function indexOfChild(child) {
	return Array.from(child.parentNode.children).indexOf(child);
}

function newElement(type, classList) {
	var element = document.createElement(type);
	element.className = classList;
	return element;
}

function swapInArray(array, idx1, idx2) {
	if (idx2 >= 0 && idx2 < array.length) {
		var aux = array[idx1];
		array[idx1] = array[idx2];
		array[idx2] = aux;
	}
}

function swapInNode(node, idx1, idx2) {
	if (idx1 >= 0 && idx1 < node.children.length && idx2 >= 0 && idx2 < node.children.length) {
		node.insertBefore(node.children[idx1], node.children[idx2]);
	}
}

function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}