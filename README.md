This currently needs some work!  Please see https://webmention.herokuapp.com/ for a better clientside JS based webmetion display system.

webmention.js
===============
[Webmention.io](http://webmention.io) makes it easy to receive incoming webmentions and pingbacks on your website or blog.  webmention.js helps you display them on your gh-pages or statically hosted website. 

## Live Examples of this in action:

- http://bret.io/2013/06/24/t4/
- http://bret.io/2013/06/28/indiewebcamp-2013-roundup/ (All the way at the bottom!)
- http://bret.io/pages/inbox/

## How it works

Webmention.js is a set of functions that identify elements on the page with special `id` and `class` properties to generate a request to the [webmention.io jsonp api](https://github.com/aaronpk/webmention.io#jsonp).

### Step one

Load the webmention.js code with your page:

```html
<script src="/js/webmention.js"></script>
```

### Step two

Add an unordered list to your page.  Add the URL of the page you wish to retrieve data about to the `id` and identify that this list should be processed by `webmention.js` and what data it should display by adding `webmention` and `links` or `count` to the `class`.

#### An example in jekyll:

To display a list of links you would include something like this:

```html
<ul class="webmentions links" id="http://{{ site.url }}{{ page.url }}">
	<li>No webmentions were found.</li>
</ul>
```

Note: The list of links expects a single placeholder list item.

To display the total count of webmentions/pingbacks received you would include something like this:

```html
<ul class="webmentions count inline" id="http://{{ site.url }}{{ page.url }}">
	<li><i class="icon-comment"></i></li>
	<li>0</li>
</ul>
```

Note: The mention count expects an icon as the first element (or anything you want), with a second placeholder element which is removed upon processing.  Yes, I know this is lousy.  It will be fixed at some point.

##### Caveats 

JSONP has no support for error handling, so if a page has no mentions pointing to it, the webmention.io api will return a 404 and the callback script will not be fired for the calling element.  This means the default display on our target elements must be as if there is no mention of the page.

This will be addressed when the script is updated to use [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

### Step three

Make sure you API data is publicly accessible.  Right now you have to request this.


### Credits

Thanks for all the help in IRC (#indiewebcamp on freenode!) and to [@aaronpk](https://github.com/aaronpk/) for creating the webmention.io/pingback.me service.  

Think you have a better use for this projects namespace?  Go ahead an use it!  This was primarily an experiment and educational experience for my own benefit.  I would love to get feedback on all the things I did wrong or could do better.

