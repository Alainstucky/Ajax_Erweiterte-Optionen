function getToken() {

    let credentials = {
        "email": "webg@ffhs.ch",
        "password": "WebG_HS2017@FFHS"
    }
    let tokenURL = 'https://tonyspizzafactory.herokuapp.com/api/auth';

    var getToken = new XMLHttpRequest();
    getToken.open('POST', tokenURL, true);
    getToken.onreadystatechange = function () {
        if (getToken.readyState === XMLHttpRequest.DONE && getToken.status === 200) {
            data = JSON.parse(getToken.responseText);
            return data.token;
        }
    };
    getToken.setRequestHeader('Content-type', 'application/json');
    getToken.send(JSON.stringify(credentials));

}
