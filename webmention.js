// Global webmention.js object
var webMention = {};
webMention.realHead = document.head;
console.log('Webmention.js initialized');
// webMention.get function for finding objects to interact with.
webMention.get = function(type) {
	console.log('get function just fired');
	// Get a list of all elements with the class of webmention and type
	webMention.elements = document.getElementsByClassName('webmentions ' + type);
	console.log('Elements were found');
	console.log(webMention.elements);
	// Process each element found
	webMention.preProcess();
}
// window.onload = pingback('mode', 'webmentions');

webMention.preProcess = function() {
	console.log('Preprocess was triggered');
	for (var i=0; i < webMention.elements.length; i++) {
		// For a given element, retrieve the URL from its ID and store it
		webMention.elements[i].slug = webMention.elements[i].id;
		console.log('Slugs were ammended');
		console.log(webMention.elements[i].slug);
		// For a given element, create the uniqe 
		webMention.elements[i].postProcess = function(data) {
			console.log('We are attempting to create our object functions');
			this.parent = document.getElementById(this.slug);
			this.placeHolder = this.parent.firstElementChild;
			this.parent.removeChild(this.placeHolder);
			this.mentions = data;
			var that = this;
			console.log(that);
			console.log(that.mentions);
			console.log(that.mentions.links.length);
			for (var j=0; j < this.mentions.links.length; j++) {
				var listItem = document.createElement('LI');
				var linkText = document.createTextNode(this.mentions.links[j].source);
				var linkAnchor = document.createElement('A');
				linkAnchor.href = this.mentions.links[j].source;
				linkAnchor.appendChild(linkText);
				listItem.appendChild(linkAnchor);
				this.parent.appendChild(listItem);
			}
		}
		webMention.insertScript(i);
	}
}



webMention.insertScript = function (i) {
	// Create functon attached to element object 
    var jsonpName = "webMention.elements[" + i + "].postProcess"
    // Generate the API request URL 
    var apiUrl = "http://pingback.me/api/links?target="+ webMention.elements[i].slug + "&jsonp=" + jsonpName
    // Generate the script element to be inserted
    var container = document.createElement('SCRIPT');
    // Set the source of the script container
    container.src = apiUrl;
    document.head.appendChild(container)
    console.log('SCripts have been inserted maybe');
}


webMention.get('links');