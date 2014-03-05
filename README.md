XmlToJsObject
===========

XmlToJsObject is a free, easy-to-use utility to convert XML-Documents/XML-Strings to Javacript-Objects

![Screenshot](http://static.andidittrich.de/XmlToJsObject/screenshot.jpg)

Features
--------

* Easy XML to JS-Object conversion like JSON to JS-Object
* Written in Pure-Javascipt (standalone - no framework like jQuery or MooTools required!)
* Supports XML-Documents (from AJAX/XHR Requests) as well as XML-Strings
* Smart-Mode automatically merges nodes+attributes for a much easier handling of config files
* Ultra lightweight: only 3.9kB of Code (uncompressed); 1.64kB (yui compressed)
* Well commented sourcecode allows easy user modifications/custom extensions
* Native integration into MooTools (Object.fromXML)

Demo
----
The following Examples require the `JSON.stringify` method (supported by all modern browsers)

* [Example](http://static.andidittrich.de/XmlToJsObject/Example.html)
* [MooTools Example](http://static.andidittrich.de/XmlToJsObject/Example.MooTools.html)
* [Minimal Example](http://static.andidittrich.de/XmlToJsObject/Example.Minimal.html)

Minimal Example
---------------
This is a minimal example how to convert a XML-String into a Javascript Object (Pure Javascript Version)

```html
<head>
...
<!-- Include XmlToJsObject -->
<script type="text/javascript" src="XmlToJsObject.js"></script>

<!-- Example Code -->	
<script type="text/javascript">
	window.onload = (function(){
		// some valid! xml data given as string/xml-node/xml-document
		var testdata = ...

		// covnvert testdata to Js-Object (Smart Mode)
		var dataObject = XmlToJsObject(testdata);
										
		// Display Human-Readable Object
		document.getElementById('output').innerHTML = JSON.stringify(dataObject, null, 4);
	});
</script>
...
</head>
<body>
...
<pre id="output"></pre>
...
```

MooTools Examples
-----------------

How to use
----------
Example, how to use XmlToJsObject with MooTools ([Example.MooTools.html](Example.MooTools.html))

```js
window.addEvent('domready', function(){
	// get local stored testdata
	var testdata1 = document.id('Testdata1').get('text');
	
	// == Example 1 ===============================================
	// covnvert testdata to Js Object (Normal Mode + Smart Mode)
	var dataObject1 = Object.fromXML(testdata1);
	
	// Display Human-Readable Objects
	document.id('output1').set('text', JSON.stringify(dataObject1, null, 4));
	
	// == Example 2 ===============================================
	// get testdata as DOM-Element-Node and covnvert it into Js Object (Normal Mode)
	var domNode = (new DOMParser()).parseFromString(testdata1, 'text/xml').firstChild;
	var dataObject2 = Object.fromXML(domNode, false);
	
	// Display Human-Readable Objects
	document.id('output2').set('text', JSON.stringify(dataObject2, null, 4));
	
	// == Example 3 ===============================================
	// create new xhr request
	var myRequest = new Request({
	    url: 'Resources/Testdata2.xml',
	    method: 'get',
	    onSuccess: function(responseText, responseXMLDocument){
			// directly convert a XML Document
			var dataObject3 = Object.fromXML(responseXMLDocument);
	        
			// Display Human-Readable Objects
			document.id('output3').set('text', JSON.stringify(dataObject3, null, 4));
	    } 
	});
	myRequest.send();
	
	// == Show Example Code ===============================================
	document.id('codeOutput').set('text', document.id('JSCode').get('text').replace(/^\t\t/gm, ''));
	// Highlight Example Code
	document.id('codeOutput').light({language: 'js', theme: 'git'});
});
```

Example.html Code
-----------------
The working example can be found [here](http://static.andidittrich.de/XmlToJsObject/Example.html)
Note: The Example requires MooTools (used to access the DOM Elements); JSON.stringify is supported by all modern browsers

```js
window.addEvent('domready', function(){
	// get local stored xml testdata
	var testdata1 = document.id('Testdata1').get('text');
	var testdata2 = document.id('Testdata2').get('text');

	// covnvert testdata to Js Object (Normal Mode + Smart Mode)
	var dataObject1normal = XmlToJsObject(testdata1, false);
	var dataObject1smart = XmlToJsObject(testdata1, true);
	
	// covnvert testdata to Js Object (Smart Mode default)
	var dataObject2 = XmlStringToJsObject(testdata2);
	
	// Display Human-Readable Objects
	document.id('output1').set('text', JSON.stringify(dataObject1smart, null, 4));
	document.id('output2').set('text', JSON.stringify(dataObject1normal, null, 4));
	document.id('output3').set('text', JSON.stringify(dataObject2, null, 4));
});
```

Available Methods
-----------------

### XmlToJsObject
Pure Javascript Implementation

```js
XmlToJsObject(data [, smartMode=true])
```
**Description:** Converts a XML-String, XMLNode or XMLDocument into a Javascript-Object

**data**
Type: mixed:: ((String)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String], (XMLDocument)[https://developer.mozilla.org/en-US/docs/Web/API/Node], (XMLNode)[https://developer.mozilla.org/en-US/docs/Web/API/Node]
A valid XML-String, XMLNode or XMLDocument Node containing various child nodes and attributes
	
**smartMode**
Type: [Boolean](http://www.w3schools.com/js/js_datatypes.asp)
Optional (default=**true**) - Merge attribute names with node-names

### Object.fromXML (MooTools)
Native MooTools implementation: automatically available when using MooTools on your page!

```js
Object.fromXML(data [, smartMode=true])
```
**Description:** Converts a XML-String, XMLNode or XMLDocument into a Javascript-Object

**data**
Type: mixed:: ((String)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String], (XMLDocument)[https://developer.mozilla.org/en-US/docs/Web/API/Node], (XMLNode)[https://developer.mozilla.org/en-US/docs/Web/API/Node]
A valid XML-String, XMLNode or XMLDocument Node containing various child nodes and attributes
	
**smartMode**
Type: [Boolean](http://www.w3schools.com/js/js_datatypes.asp)
Optional (default=**true**) - Merge attribute names with node-names

	
Tested With
-----------
* Firefox 27.0.1
* Chrome 33.0.1750.117
* Internet Explorer 11.0.9600.16518
* Safari 5.1.7 (Windows)
* Android 4.3 (WebView)


Browser compatibility
-------------
The XmlToJsObject Utility requires the [DOMParser](http://www.w3schools.com/dom/dom_parser.asp) object. If you want to support earlier versions of the InternetExplorer you can write a [fallback](http://www.w3schools.com/dom/dom_parser.asp) using `new ActiveXObject("Microsoft.XMLDOM")` instead of the DOMParser.
Compatibility Reference: [https://developer.mozilla.org/en-US/docs/Web/API/DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)

* Chrome 1.0+
* Safari osx+ios (WebKit) 3.2+
* Internet Explorer 9+
* Firefox 1.7+
* Opera 8+
* Android-Webview 4.3 (Webkit Engine)


License
-------

XmlToJsObject is licensed under [The MIT License (X11)](http://opensource.org/licenses/MIT)
