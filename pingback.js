function doSomething() {
    var parentUl = document.getElementsByClassName('pingback_count')
    for (var i = 0 ; i < parentUl.length ; i ++)
    {
        function parentUlElement(i){
            return parentUl[i];
        }
        var li1 = document.createElement("li");
        var li1_content = parentUlElement(i).id;
        var li_textNode = document.createTextNode(li1_content)
        console.log(li1_content);
        li1.appendChild(li_textNode);
        var oldChildUl = parentUlElement(i).getElementsByTagName('li')[0];
        parentUlElement(i).replaceChild(li1,oldChildUl);
    }
}