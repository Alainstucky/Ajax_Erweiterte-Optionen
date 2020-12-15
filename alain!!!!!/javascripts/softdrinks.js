const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4";
const getSoftdrinksURL = "https://tonyspizzafactory.herokuapp.com/api/softdrinks";
const postSoftdrinksURL = "https://tonyspizzafactory.herokuapp.com/api/orders";

document.addEventListener("DOMContentLoaded", getSoftdrinks);

function getSoftdrinks() {
    let req = new XMLHttpRequest();
    req.open('GET', getSoftdrinksURL, true);
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            data = JSON.parse(req.responseText);
            displaySoftdrinks(data);
        }
    };
    req.setRequestHeader("Authorization", token);
    req.send();
}

function displaySoftdrinks(data) {
    for (var i = 0; i < data.length; i++) {
        //Initialize all elements
        main = document.getElementById("softdrinks");
        wrap = document.createElement("div");
        img = document.createElement("img");
        br = document.createElement("br");
        description = document.createElement("div");
        price = document.createElement("span");
        volume = document.createElement("select");
        option = document.createElement("option");
        order = document.createElement("span");
        //Add classes
        order.classList.add("fa");
        order.classList.add("fa-shopping-cart");
        description.classList.add("description");
        img.classList.add("softdrinks_img");
        wrap.classList.add("product");
        price.classList.add("price")
        //Create description
        description.innerHTML += data[i].name;
        option.innerText = data[i].volume;
        price.innerHTML = data[i].prize;
        //Add attributes
        order.title = "softdrink"
        order.id = data[i].name;
        order.addEventListener("click", function () {
            var data = {
                "type": this.title,
                "name": this.id
            };
            postSoftdrinks(data);
        });
        img.alt = data[i].name;
        img.src = data[i].imageUrl;
        //Appending
        volume.append(option);
        description.append(br.cloneNode(true));
        description.append(volume);
        description.append(br);
        description.append(price);
        description.append(order);
        wrap.append(img);
        wrap.append(description);
        main.append(wrap);
    }
}

function postSoftdrinks(data) {
    let req = new XMLHttpRequest();
    req.open('POST', postSoftdrinksURL, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", token);
    req.send(JSON.stringify(data));
}