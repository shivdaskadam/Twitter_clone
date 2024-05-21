async function getHomeData(){
    if(sessionStorage.getItem("id")) {
        let id = sessionStorage.getItem("id");
        let name = sessionStorage.getItem("name");
        fetch(`http://localhost:8008/${id}/home`, {
    
        method: "GET",
         
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "client_code" : "client_code"
        }
    
        }).then(async (response) => {
            let parent = document.getElementById("parent");
            let result = await response.json()
            let data = result.data;

            let newTweet = document.createElement('button');
            newTweet.textContent = "New Tweet";
            newTweet.className = "btn btn-primary";
            parent.appendChild(newTweet);
            newTweet.onclick = function () {createNewTweet(); };
            
            let user = document.createElement('h1');
            user.textContent = name;
            parent.appendChild(user);
            user.onclick = function () { getUserInfo(id,name); };

            data.forEach(element => {
            let dv = document.createElement('div');
            dv.className = "border border-primary"
            let bre = document.createElement('br');
            dv.appendChild(bre);

            if(element.retweeterId!=0){
                let retweeter = document.createElement('p');
                retweeter.innerHTML = `${element.retweeter_name} retweeted`
                dv.appendChild(retweeter);
            }
            let name = document.createElement('h4');
            name.innerHTML = element.name;
            name.onclick = function () { getUserInfo(element.userId,element.name); };
            dv.appendChild(name);

            let tweet = document.createElement('p');
            tweet.innerHTML = element.tweet;
            dv.appendChild(tweet);

            let retweetButton = document.createElement('button');
            retweetButton.id = element.id;
            retweetButton.className = "btn btn-primary";
            if(element.reTweeted==0) {  
                retweetButton.innerText = "Retweet";        
            } else {
                retweetButton.innerText = "Retweeted";
            }
            retweetButton.onclick = function () { retweet(element.id,retweetButton.innerText); };
            dv.appendChild(retweetButton);

            parent.appendChild(dv);

            });
        });
    } else {
        console.log("user not logged in")
        location.href = "login.html";
    }
    
}

function search() {
    let searchKey = document.getElementById("searchkey").value;
    sessionStorage.setItem("searchKey",searchKey);
    location.href = "search.html"
}


