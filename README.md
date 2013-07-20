Pingback.js
===============
[Pingback.me](http://Pingback.me) makes it easy to recive incoming pingbacks and webmentions on your webpage or blog.  Pingback.js helps you display them on your gh-pages or statically hosted website. 

## This project will undergo a namechange soon to reflect the emphasis on [webmentions](http://indiewebcamp.com/webmention) over pingbacks.

## Goals

My initial goals for Pingback.js include its ability to process static elements on your pages and turn them into:

*   The number of webmentions or pingbacks recived for a url.
*   An `<ul>` of URLs that have sent webmentions or pingback to a particular url.

using data collected on the pingback.me servers.

Generate the desired static element using your templating engine with the correct `id` attribute and relevant `class` attribute, and Pingback.js should do the rest.
    
## Project Status

In development.  Most of the initial work will consist of conceptual tests to come up with an initial design.  Nothing is working as of yet.

I am prototyping everything in the [pingback](https://github.com/bcomnes/bcomnes.github.io/tree/pingback) branch of my personal site, and will port that work back to this repository when it is working.


## Live Examples of this in action:

- http://bret.io/2013/06/24/t4/
- http://bret.io/2013/06/28/indiewebcamp-2013-roundup/
