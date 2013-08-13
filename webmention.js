// Global webmention.js object
var webMention = {};
webMention.get = function() {
    webMention.elements = document.getElementsByClassName('webmentions');
    if ( webMention.elements ) {
        webMention.preProcess();
    }
}

webMention.preProcess = function() {
    for (var i = 0; i < webMention.elements.length; i++) {
        webMention.elements[i].slug = webMention.elements[i].id;
        webMention.elements[i].postProcess = webMention.postProcess;
        webMention.insertScript(i);
    }
}

webMention.insertScript = function(i) {
    var jsonpName = "webMention.elements[" + i + "].postProcess";
    var apiUrl = "http://pingback.me/api/links?target=" + webMention.elements[i].slug + "&jsonp=" + jsonpName;
    var container = document.createElement('SCRIPT');
    container.src = apiUrl;
    document.head.appendChild(container);
}

webMention.postProcess = function(data) {
            this.parent = document.getElementById(this.slug);
            if ( webMention.hasClass(this.parent, 'count') ) {
                this.placeHolder = this.parent.firstElementChild.nextElementSibling;
                this.parent.removeChild(this.placeHolder);
                webMention.showCount(this.parent, data);
            }
            if ( webMention.hasClass(this.parent, 'links') ) {
                this.placeHolder = this.parent.firstElementChild;
                this.parent.removeChild(this.placeHolder);
                webMention.listLinks(this.parent, data);
            }
        }

webMention.listLinks = function(parentElement, apiData) {
    for (var j = 0; j < apiData.links.length; j++) {
                var listItem = document.createElement('LI');
                var linkText = document.createTextNode(apiData.links[j].source + " on " + apiData.links[j].verified_date );
                var linkAnchor = document.createElement('A');
                linkAnchor.href = apiData.links[j].source;
                linkAnchor.appendChild(linkText);
                listItem.appendChild(linkAnchor);
                parentElement.appendChild(listItem);
            }
        }
webMention.showCount = function(parentElement, apiData) {
    var listItem = document.createElement('LI');
    var linkText = document.createTextNode(apiData.links.length);
    listItem.appendChild(linkText);
    parentElement.appendChild(listItem);
}

webMention.listAll = function() {
    for (var j = 0; j < apiData.links.length; j++) {
        
    }
    
}

// Bastardization of http://jsfiddle.net/cR9dB/2/ TODO: Unserstand this code :/
// I think it came out of or was inspired by jquery
webMention.hasClass = function (element, selector) {
    var className = ' ' + selector + ' ';
    var rclass = /[\t\r\n\f]/g;

    return element.nodeType === 1 && (' ' + element.className + ' ')
    .replace(rclass, ' ')
    .indexOf(className) >= 0;      
    }

webMention.get();