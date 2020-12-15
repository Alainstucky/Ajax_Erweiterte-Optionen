function myFunction() {
    var navElem = document.querySelector("nav");
    if (navElem.className === "") {
        navElem.className = " responsive";
    } else {
        navElem.className = "";
    }
}