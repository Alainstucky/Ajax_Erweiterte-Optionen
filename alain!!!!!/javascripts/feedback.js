const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4";
const postFeedbackURL = "https://tonyspizzafactory.herokuapp.com/api/feedback";

function postFeedback(data) {
    let req = new XMLHttpRequest();
    req.open('POST', postFeedbackURL, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", token);
    req.send(JSON.stringify(data));
}




function prepareFeedback() {
    if (validateForm()) {
        form = document.forms["feedbackForm"];
        form.elements["email"].value;
        let data = {
            "pizzaRating": form["pizzaq"].value,
            "prizeRating": form["prizeq"].value,
            "name": form["name"].value,
            "email": form["email"].value,
            "feedback": form["yourOpinion"].value
        }
        postFeedback(data)
    }
    else return;
}

var err, temp, interval;

function validateForm() {
    let form = document.forms["feedbackForm"];
    //Give internal error code if necessary
    if (form["pizzaq"].value == "") err = "pizza";
    else if (form["prizeq"].value == "") err = "prize";
    else if (form["name"].value == "") err = "name";
    else if (!isEmail(form["email"].value)) err = "email";
    else if (!enoughCharacters(form["yourOpinion"].value)) err = "text";
    else {
        deleteListener();
        return true;
    }
    //Error hasn't changed, we can return false without adjusting anything
    if (temp == err) return false;
    else {
        deleteListener();
        temp = err;
        addListener();
        switch (err) {
            case "pizza":
                elem = document.getElementById("pizzaqValidation");
                br = document.createElement("br");
                msg = document.createTextNode("Please select an option!")
                elem.appendChild(msg);
                elem.appendChild(br);
                return false;
            case "prize":
                elem = document.getElementById("prizeqValidation");
                br = document.createElement("br");
                msg = document.createTextNode("Please select an option!")
                elem.appendChild(msg);
                elem.appendChild(br);
                return false;
            case "name":
                elem = document.getElementById("nameValidation");
                br = document.createElement("br");
                msg = document.createTextNode("Please enter your name!")
                elem.appendChild(msg);
                elem.appendChild(br);
                return false;
            case "email":
                elem = document.getElementById("emailValidation");
                br = document.createElement("br");
                msg = document.createTextNode("Please enter a valid email address!")
                elem.appendChild(msg);
                elem.appendChild(br);
                return false;
            case "text":
                elem = document.getElementById("textValidation");
                br = document.createElement("br");
                msg = document.createTextNode("Please enter at least 50 Characters!")
                elem.appendChild(msg);
                elem.appendChild(br);
                return false;
            default:
                console.log("Something went wrong");
                return false;
        }
    }

}

function isEmail(email) {
    let regex = /\S+@\S+\.\S+/
    return regex.test(email);
}

function enoughCharacters(str) {
    if (str.length < 50) {
        return false;
    }
    else
        return true;
}

//Resets all error display elements
function clearError() {
    document.getElementById("pizzaqValidation").innerText = "";
    document.getElementById("prizeqValidation").innerText = "";
    document.getElementById("nameValidation").innerText = "";
    document.getElementById("emailValidation").innerText = "";
    document.getElementById("textValidation").innerText = "";
}

//Adds change listener to current input that doesn't validate
function addListener() {
    let rad, elem;
    switch (err) {
        case "pizza":
            rad = document.forms["feedbackForm"]["pizzaq"];
            for (i = 0; i < rad.length; i++) {
                rad[i].addEventListener("change", handler);
            }
            break;
        case "prize":
            rad = document.forms["feedbackForm"]["prizeq"];
            for (i = 0; i < rad.length; i++) {
                rad[i].addEventListener("change", handler);
            }
            break;
        case "name":
            elem = document.getElementById("name");
            elem.addEventListener("change", handler);
            break;
        case "email":
            elem = document.getElementById("email");
            elem.addEventListener("change", handler);
            break;
        case "text":
            elem = document.getElementById("yourOpinion");
            elem.addEventListener("change", handler);
            break;
        default:
            return;
    }
    //Executes validateForm every 500ms
    interval = setInterval(validateForm, 500);
}

//Change event handler
function handler() {
    validateForm();
}

//Deletes currently active event listener (because error was fixed)
function deleteListener() {
    let rad, elem;
    switch (temp) {
        case "pizza":
            rad = document.forms["feedbackForm"]["pizzaq"];
            for (i = 0; i < rad.length; i++) {
                rad[i].removeEventListener("change", handler);
            }
            break;
        case "prize":
            rad = document.forms["feedbackForm"]["prizeq"];
            for (i = 0; i < rad.length; i++) {
                rad[i].removeEventListener("change", handler);
            }
            break;
        case "name":
            elem = document.getElementById("name");
            elem.removeEventListener("change", handler);
            break;
        case "email":
            elem = document.getElementById("email");
            elem.removeEventListener("change", handler);
            break;
        case "text":
            elem = document.getElementById("yourOpinion");
            elem.removeEventListener("change", handler);
            break;
        default:
            return;
    }
    //Stops regular function execution
    clearInterval(interval);
    clearError();
}

