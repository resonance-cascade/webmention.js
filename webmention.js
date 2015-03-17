// Global webmention.js object
var webMention = {}
webMention.get = function () {
  webMention.elements = document.getElementsByClassName('webmentions')
  if (webMention.elements) {
    webMention.preProcess()
  }
}

webMention.preProcess = function () {
  for (var i = 0; i < webMention.elements.length; i++) {
    webMention.elements[i].slug = webMention.elements[i].id
    webMention.elements[i].postProcess = webMention.postProcess
    webMention.insertScript(i)
  }
}

webMention.insertScript = function (i) {
  var jsonpName = 'webMention.elements[' + i + '].postProcess'
  var apiUrl = 'http://webmention.io/api/links?target=' + webMention.elements[i].slug + '&jsonp=' + jsonpName
  var container = document.createElement('SCRIPT')
  container.src = apiUrl
  document.head.appendChild(container)
}

webMention.postProcess = function (data) {
  this.parent = document.getElementById(this.slug)
  if (webMention.hasClass(this.parent, 'count')) {
    this.placeHolder = this.parent.firstElementChild.nextElementSibling
    this.parent.removeChild(this.placeHolder)
    webMention.showCount(this.parent, data)
  }
  if (webMention.hasClass(this.parent, 'links')) {
    this.placeHolder = this.parent.firstElementChild
    this.parent.removeChild(this.placeHolder)
    webMention.listLinks(this.parent, data)
  }
}

webMention.generateItem = function (index, apiData, callback) {
  var listItem = document.createElement('LI') // Create the list item
  // Create the text of the post
  var source = apiData.links[index].source || null
  var content = apiData.links[index].data.content || null
  var name = apiData.links[index].data.name || content || source

  if (apiData.links[index].data.author) {
    var avatar = apiData.links[index].data.author.photo || null
    var authorUrl = apiData.links[index].data.author.url || null
    var authorName = apiData.links[index].data.author.name || null
  }

  var hcardImg = document.createElement('IMG')
  hcardImg.width = 48
  hcardImg.src = avatar
  hcardImg.className = 'img-circle'

  var authorLink = document.createElement('A')
  authorLink.innerText = authorName
  authorLink.href = authorUrl
  var linkText = document.createTextNode(' ' + name)

  var linkContainer = document.createElement('DIV')

  var dateURL = document.createTextNode(apiData.links[index].verified_date)
  // Create the link element
  var linkAnchor = document.createElement('A')
  // Set the href of the linkAnchor
  linkAnchor.href = apiData.links[index].data.url
  linkContainer.appendChild(authorLink)
  linkContainer.appendChild(linkText)
  // Put the link text in
  linkAnchor.appendChild(dateURL)
  // Put the link into the list item
  listItem.appendChild(hcardImg)
  listItem.appendChild(linkContainer)
  listItem.appendChild(linkAnchor)

  callback(listItem)
}

webMention.listLinks = function (parentElement, apiData) {
  for (var j = 0; j < apiData.links.length; j++) {
    webMention.generateItem(j, apiData, function (listItem) {
      parentElement.appendChild(listItem)
    })
  }
}

webMention.showCount = function (parentElement, apiData) {
  var listItem = document.createElement('LI')
  var linkText = document.createTextNode(apiData.links.length)
  listItem.appendChild(linkText)
  parentElement.appendChild(listItem)
}

webMention.listAll = function () {
  for (var j = 0; j < apiData.links.length; j++) {
  }

}

// Bastardization of http://jsfiddle.net/cR9dB/2/
// I think it came out of or was inspired by jquery
webMention.hasClass = function (element, selector) {
  var className = ' ' + selector + ' '
  var rclass = /[\t\r\n\f]/g

  return element.nodeType === 1 && (' ' + element.className + ' ')
      .replace(rclass, ' ')
      .indexOf(className) >= 0
}

webMention.get()
