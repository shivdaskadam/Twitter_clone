function loadSearchResult() {

    let dv = document.getElementById('parent');
    dv.innerHTML = "";

    if(sessionStorage.getItem("id")) {
        let id = sessionStorage.getItem("id");
        let name = sessionStorage.getItem("name");
        let search = sessionStorage.getItem("searchKey");
        fetch(`http://localhost:8008/${id}/search?searchKey=${search}`, {
    
        method: "GET",
         
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "client_code" : "client_code"
        }
    
        }).then(async (response) => {
            let parent = document.getElementById("parent");
            let result = await response.json()
            let data = result.data;

            let home = document.createElement('button');
            home.textContent = "Home";
            home.className = "btn btn-primary";
            parent.appendChild(home);
            home.onclick = function () { getHomePage(); };

            let newTweet = document.createElement('buttton');
            newTweet.textContent = "New Tweet";
            newTweet.className = "btn btn-primary";
            parent.appendChild(newTweet);
            newTweet.onclick = function () {createNewTweet(); };
            
            let user = document.createElement('h1');
            user.textContent = name;
            parent.appendChild(user);
            user.onclick = function () { getUserInfo(id,name); };

            let users = data.user;
            let tweets = data.tweet;

            if(users.length>0){
                let userText = document.createElement('h3');
                userText.textContent = "Users";
                parent.appendChild(userText);

                users.forEach(element => {
                    let dv = document.createElement('div');
                    dv.className = "border border-primary"
                    let bre = document.createElement('br');
                    dv.appendChild(bre);
            
                    let name = document.createElement('h4');
                    name.innerHTML = element.name;
                    name.onclick = function () { getUserInfo(element.id,element.name); };
                    dv.appendChild(name);

                    if(element.id != id) {
                        let followButton = document.createElement('button');
                        followButton.id = element.id;
                        followButton.className = "btn btn-primary";
                        if(element.follow==0) {
                            followButton.innerText = "Follow";
                        } else {
                            followButton.innerText = "Following"
                        }
                        followButton.onclick = function () { followUser(element.id,followButton.innerText); };
                        dv.appendChild(followButton);
                    }
            
                    parent.appendChild(dv);
            
                });
            }

            if(tweets.length>0) {
                let tweetText = document.createElement('h3');
                tweetText.textContent = "Tweets";
                parent.appendChild(tweetText);

                tweets.forEach(element => {
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
            }

            if(users.length==0 && tweets.length==0){
                let noResult = document.createElement('h2');
                noResult.textContent = "No results found";
                parent.appendChild(noResult);
            }
        });
    } else {
        console.log("user not logged in")
        location.href = "login.html";
    }
}


function search() {
    let searchKey = document.getElementById("searchkey").value;
    sessionStorage.setItem("searchKey",searchKey);
    loadSearchResult();
}

