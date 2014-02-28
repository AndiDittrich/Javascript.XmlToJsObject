XmlToJsObject
===========

XmlToJsObject is a free, easy-to-use, utility to convert XML-Documents/XML-Strings to Javacript-Objects

Features
--------

* Easy XML to JS-Object conversion like JSON to JS-Object
* Supports XML-Documents (from AJAX/XHR Requests) as well as XML-Strings
* Smart-Mode automatically merges nodes+attributes for a much easier handling of config files
* Written in Pure-Javascipt (standalone - no framework like jQuery or MooTools required!)
* Ultra lightweight: only 3.3kB of Code (uncompressed)
* Well commented sourcecode allows easy user modifications/custom extensions

Demo
----
A example/demo page is available [here](http://static.andidittrich.de/XmlToJsObject/Example.html)

### XML Content

![Complex XML File](/Screenshots/ComplexXmlData.jpg)

==>

### Converted JS-Object
![Converted JS Object](/Screenshots/SimpleJsObject.jpg)

How to use
----------
This is a minimal example how to convert a XML-String into a Javascript Object

```html
<head>
...
<!-- Include XmlToJsObject -->
<script type="text/javascript" src="XmlToJsObject.js" ></script>

<script type="text/javascript">
	...
	// some valid! xml data
	var xmlString = ...
	
	// convert it into a js-object using the default "Smart-Mode"
	var jsObject = XmlStringToJsObject(xmlString);

	// show the content
	console.log(jsObject);
</script>
...
</head>
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
	var dataObject1normal = XmlStringToJsObject(testdata1, false);
	var dataObject1smart = XmlStringToJsObject(testdata1, true);
	
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

```js
XmlToJsObject(xmlNode [, smartMode=true])
```
**Description:** Converts a XMLDocument Node into a Javascript-Object

**xmlNode**
Type: [DOM Node](http://www.w3schools.com/dom/dom_node.asp)
A DOM Node Object containing various child nodes and attributes
	
**smartMode**
Type: [Boolean](http://www.w3schools.com/js/js_datatypes.asp)
Optional (default=**true**) - Merge attribute names with node-names

### XmlStringToJsObject

```js
XmlStringToJsObject(xmlStringData [, smartMode=true])
```
**Description:** Converts a XML String directly into a Javascript-Object

**xmlStringData**
Type: [String](http://www.w3schools.com/js/js_obj_string.asp)
A string containing valid XML

**smartMode**
Type: [Boolean](http://www.w3schools.com/js/js_datatypes.asp)
Optional (default=**true**) - Merge attribute names with node-names
	

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
