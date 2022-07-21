async function Login(){
    console.log("login")
    let email = document.getElementById("loginName");
    let password = document.getElementById("loginPassword");
    fetch("http://localhost:8008/login", {

    method: "POST",

    body: JSON.stringify({
        email: email.value,
        password : password.value
    }),

    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "client_code" : "client_code"
    }

    }).then(async (response) => {
        let result = await response.json()
        console.log(result);
        if(result.data.loggedIn){
            location.href = "home.html";
        } else {
            email.value = "";
            password.value = "";
        }
    });

} 