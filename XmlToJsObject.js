/*!
---
name: XmlToJsObject
description: Smart XML-Document to Javascript-Object converter

license: MIT-style X11 License
version: 1.0

authors:
  - Andi Dittrich
  
download: https://github.com/AndiDittrich/Javascript.XmlToJsObject
website: http://www.a3non.org/go/XmlToJsObject
demo: http://static.andidittrich.de/XmlToJsObject/Example.MooTools.html
demo2: http://static.andidittrich.de/XmlToJsObject/Example.html
demo3: http://static.andidittrich.de/XmlToJsObject/Example.Minimal.html

provides:
	- XmlToJsObject
	- Object.fromXML (MooTools)
...
 */
/**
 * Converts a XML-String/XMLDocument/XMLNode into a Javascript-Object
 */
var XmlToJsObject = (function(inputData, smartMode){
	// Smart-ModeFLag set ? set default value
	if (typeof(smartMode) == "undefined"){
		smartMode = true;
	}

	// private parser function
	var _convertNode = (function(xmlNode){
		
		// return object buffer
		var objData = {};
			
		// no element node ?
		if (xmlNode.nodeType != 1){
			return null;
		}
	
		// process attributes
		if (xmlNode.attributes.length > 0){
			// create attribute storage object
			if (!smartMode){
				objData['_attributes'] = {};
			}
			for (var i=0; i<xmlNode.attributes.length; i++){
				// get attribute
				var attribute = xmlNode.attributes.item(i);
				
				// assign attribute
				if (!smartMode){
					// store key => value pair into seperate @attribute storage
					objData['_attributes'][attribute.nodeName] = attribute.nodeValue;
				}else{
					// direct key => value assignment within same object
					objData[attribute.nodeName] = attribute.nodeValue;				
				}
			}
		}
		
		// process child nodes
		if (xmlNode.hasChildNodes()){
			
			// get first child node
			var childNode = xmlNode.firstChild;
	
			// iterate over all direct child nodes; call XmlToJsObject recursively on Element-Nodes
			do{
				// text node ?
				if (childNode.nodeType == 3){
					// just whitespace ? skip processing!
					if (childNode.nodeValue.replace(/\s*/, '').length == 0){
						continue;
					}
					
					// key already assigned ?
					if (typeof(objData['_value']) == "undefined"){
						// directly assign child node
						objData['_value'] = childNode.nodeValue;
					}else{
						// array storage available ?
						if (typeof(objData['_value'].push) == "undefined") {
							objData['_value'] = [objData['_value']];
						}
						
						// push new node to array
						objData['_value'].push(childNode.nodeValue);
					}
				}
				
				// process element nodes
				if (childNode.nodeType == 1){
					// key already assigned ?
					if (typeof(objData[childNode.nodeName]) == "undefined" || objData[childNode.nodeName] == null){
						// directly assign child node
						objData[childNode.nodeName] = _convertNode(childNode);
					}else{
						// array storage available ?
						if (typeof(objData[childNode.nodeName].push) == "undefined") {
							objData[childNode.nodeName] = [objData[childNode.nodeName]];
						}
						
						// push new node to array
						objData[childNode.nodeName].push(_convertNode(childNode));
					}
				}
				
			// next child node	
			}while ((childNode=childNode.nextSibling) != null)
		}
		return objData;
	});
	
	// xml string input ? parse xml => DocumentNode
	if (typeof(inputData)=='string'){
		// create new parser and extract first child
		var parser = new DOMParser();
		inputData = parser.parseFromString(inputData, 'text/xml');
	}
		
	// xml node input ?	
	if (inputData instanceof Node){
		// store root node
		var rootNode = inputData;
		
		// document node ?
		if (rootNode.nodeType == 9){
			// get root node (first element node)
			rootNode = rootNode.firstChild;
			while (rootNode.nodeType != 1 && rootNode.nodeType != null){
				rootNode = rootNode.nextSibling;
			}
		}		
		
		// convert xml node tree
		return _convertNode(rootNode);
		
	// unsupported input-type!	
	}else{
		return null;
	}
});
/**
 * MooTools native Object.fromXML extension/wrapper
 */
if (typeof(MooTools) == 'object'){
	Object.extend('fromXML', XmlToJsObject);
}