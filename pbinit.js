var linkroll = 'pinboard_linkroll'; //id target for pinboard list
var pinboard_user = "bcomnes"; //id target for pinboard list
var pinboard_count = 5; //id target for pinboard list
(
    function(){
    var pinboardInit = document.createElement('script');
    pinboardInit.type = 'text/javascript';
    pinboardInit.async = true;
    pinboardInit.src = '/pinboard.js';
    document.getElementsByTagName('head')[0].appendChild(pinboardInit);
  }
  )();