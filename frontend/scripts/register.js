async function register(){
    let email = document.getElementById("registerEmail");
    let password = document.getElementById("registerPassword");
    let name = document.getElementById("registerName");
    fetch("http://localhost:8008/register", {

    method: "POST",
     
    body: JSON.stringify({
        email: email.value,
        password : password.value,
        name : name.value
    }),
     
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "client_code" : "client_code"
    }

    }).then(async (response) => {
        let result = await response.json()
        console.log(result);
        if(result.success){
            location.href = "home.html";
        } else {
            email.value = "";
            password.value = "";
            name.value = "";
        }
    });

}