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