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
var XmlToJsObject=(function(c,d){if(typeof(d)=="undefined"){d=true
}var b=(function(j){var f={};if(j.nodeType!=1){return null}if(j.attributes.length>0){if(!d){f._attributes={}}for(var h=0;h<j.attributes.length;h++){var k=j.attributes.item(h);if(!d){f._attributes[k.nodeName]=k.nodeValue}else{f[k.nodeName]=k.nodeValue}}}if(j.hasChildNodes()){var g=j.firstChild;do{if(g.nodeType==3){if(g.nodeValue.replace(/\s*/,"").length==0){continue}if(typeof(f._value)=="undefined"){f._value=g.nodeValue
}else{if(typeof(f._value.push)=="undefined"){f._value=[f._value]}f._value.push(g.nodeValue)}}if(g.nodeType==1){if(typeof(f[g.nodeName])=="undefined"||f[g.nodeName]==null){f[g.nodeName]=b(g)}else{if(typeof(f[g.nodeName].push)=="undefined"){f[g.nodeName]=[f[g.nodeName]]}f[g.nodeName].push(b(g))}}}while((g=g.nextSibling)!=null)}return f});if(typeof(c)=="string"){var e=new DOMParser();c=e.parseFromString(c,"text/xml")
}if(c instanceof Node){var a=c;if(a.nodeType==9){a=a.firstChild;while(a.nodeType!=1&&a.nodeType!=null){a=a.nextSibling}}return b(a)}else{return null}});if(typeof(MooTools)=="object"){Object.extend("fromXML",XmlToJsObject)};