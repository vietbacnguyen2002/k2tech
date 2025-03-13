// display none
function getStyle(x, styleProp) {
    if (x.currentStyle) {
        var y = x.currentStyle[styleProp];
    }
    else if (window.getComputedStyle) {
        var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    }
    return y;
}
function ftnone(e, div_name) {
    var el = document.getElementById(div_name);
    var display = el.style.display || getStyle(el, 'display');
    el.style.display = (display == 'none') ? 'block' : 'none';
    ftnone.el = el;
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    return false;
}
// link ngoai
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("foxglobal")) {
        const allLinks = document.querySelectorAll("a");
        allLinks.forEach(link => {
            if (link.hostname && link.hostname !== location.hostname) {
                if (!link.hasAttribute("target")) {
                    link.setAttribute("target", "_blank");
                }
                if (!link.getAttribute("rel") || !link.getAttribute("rel").includes("nofollow")) {
                    link.setAttribute("rel", (link.getAttribute("rel") || "") + " nofollow");
                }
            }
        });
    }
});




