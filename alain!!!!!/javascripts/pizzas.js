const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4";
const getPizzasURL = "https://tonyspizzafactory.herokuapp.com/api/pizzas";
const postPizzasURL = "https://tonyspizzafactory.herokuapp.com/api/orders";

document.addEventListener('DOMContentLoaded', getPizzas);

function getPizzas() {
    let req = new XMLHttpRequest();
    req.open( 'GET', getPizzasURL, true );
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status == 200) {
            data = JSON.parse( req.responseText );
            displayPizzas( data );
        }
    }
    req.setRequestHeader( 'Authorization', token );
    req.send();


}
let wer = new XMLHttpRequest();
wer.open( 'post', postPizzasURL, true );
wer.onreadystatechange = function () {
    if (wer.readyState === XMLHttpRequest.DONE && req.status == 200) {
        data = JSON.parse( wer.responseText );
        displayPizzas( data );
    }
    else if(wer.readyState === XMLHttpRequest.DONE && req.status == 500){
        console.log("it might be impossible to send any kind if request")
    }
}
wer.setRequestHeader( 'Authorization', token );
wer.send();
function displayPizzas(data) {
    for (let i = 0; i < data.length; i++) {
        //Initialize all elements
        main = document.getElementById('pizzas');
        wrap = document.createElement('div');
        img = document.createElement('img');
        br = document.createElement("br");
        description = document.createElement("div");
        price = document.createElement("span");
        order = document.createElement('span');
        //Adjusting Classes
        order.classList.add('fa');
        order.classList.add("fa-shopping-cart");
        img.classList.add("pizza_img");
        wrap.classList.add("product");
        description.classList.add('description');
        price.classList.add("price");
        //create description
        description.innerHTML += data[i].name + "<br>"
        for (let j = 0; j< data[i].ingredients.length; j++) {
            description.innerHTML += data[i].ingredients[j];
            if (j != data[i].ingredients.length -1) {
                description.innerHTML += ", ";
            }
        }
        price.innerHTML = data[i].prize;
        //implement the attributes
        order.id = data[i].name;
        order.title = "pizza";
        order.addEventListener("click", function () {
            let data = {
                "type": this.title,
                "name": this.id
            };
            postPizzas(data);
        });
        img.alt = "Pizza" + data[i].name;
        img.src = data[i].imageUrl;
        //Appending
        description.append(br);
        description.append(price);
        description.append(order);
        wrap.append(img);
        wrap.append(description);
        main.append(wrap);
    }
}
function postPizzas(data) {
    let req = new XMLHttpRequest();
    req.open('POST', postPizzasURL, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", token);
    req.send(JSON.stringify(data));
}