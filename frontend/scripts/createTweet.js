function createTweet(){
    let id = sessionStorage.getItem("id");
    let name = sessionStorage.getItem("name");
    let tweet = document.getElementById("tweet");

    fetch(`http://localhost:8008/${id}/tweet`, {

    method: "POST",
        
    body: JSON.stringify({
        tweet: tweet.value,
    }),
        
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "client_code" : "client_code"
    }

    }).then(async (response) => {
        let result = await response.json()
        console.log(await result);
        if(result.success){
            sessionStorage.setItem("userInfo",id);
            sessionStorage.setItem("userName",name);
            location.href = "user.html"
        } else {
            tweet.value = "";
        }
    });
    

}
