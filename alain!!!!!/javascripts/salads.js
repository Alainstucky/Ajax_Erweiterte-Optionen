const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4";
const getSaladsURL = "https://tonyspizzafactory.herokuapp.com/api/salads";
const postSaladsURL = "https://tonyspizzafactory.herokuapp.com/api/orders";

document.addEventListener("DOMContentLoaded", getSalads);

function getSalads() {
    let req = new XMLHttpRequest();
    req.open('GET', getSaladsURL, true);
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            data = JSON.parse(req.responseText);
            displaySalads(data);
        }
    };
    req.setRequestHeader("Authorization", token);
    req.send();
}

function displaySalads(data) {
    for (let i = 0; i < data.length; i++) {
        //Initialize all elements
        main = document.getElementById("salads");
        wrap = document.createElement("div");
        img = document.createElement("img");
        br = document.createElement("br");
        sauce = document.createElement("select");
        description = document.createElement("div");
        price = document.createElement("span");
        french = document.createElement("option");
        italian = document.createElement("option");
        order = document.createElement("span");
        //Add classes
        order.classList.add("fa");
        order.classList.add("fa-shopping-cart");
        img.classList.add("salads_img");
        wrap.classList.add("product");
        description.classList.add("description");
        price.classList.add("price")
        //Create description
        description.innerHTML += data[i].name + "<br>"
        for (let j = 0; j < data[i].ingredients.length; j++) {
            description.innerHTML += data[i].ingredients[j];
            if (j != data[i].ingredients.length - 1) {
                description.innerHTML += ", ";
            }
        }
        french.innerText = "French dressing";
        italian.innerText = "Italian dressing";
        price.innerHTML = data[i].prize;
        //Add attributes
        sauce.name = "sauce";
        sauce.id = "salad_sauce";
        french.value = "French dressing";
        italian.value = "Italian dressing";
        order.id = data[i].name;
        order.title = "salad"
        order.addEventListener("click", function () {
            var data = {
                "type": this.title,
                "name": this.id
            };
            postSalads(data);
        });
        img.alt = data[i].name;
        img.src = data[i].imageUrl;
        //Appending
        sauce.append(french);
        sauce.append(italian);
        description.append(br.cloneNode(true));
        description.append(sauce);
        description.append(br);
        description.append(price);
        description.append(order);
        wrap.append(img);
        wrap.append(description);
        main.append(wrap);
    }
}

function postSalads(data) {
    let req = new XMLHttpRequest();
    req.open('POST', postSaladsURL, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", token);
    req.send(JSON.stringify(data));
}