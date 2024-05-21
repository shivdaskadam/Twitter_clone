async function Login(){
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

    }).then((response) => response.json())
    .then((result)=>{
        if(result.data.loggedIn){
            sessionStorage.setItem("name",result.data.response.name);
            sessionStorage.setItem("id",result.data.response.id);
            location.href = "home.html";
        } else {
            email.value = "";
            password.value = "";
        }
    });

}