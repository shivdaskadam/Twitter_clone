function userInfo() {
    let userId = sessionStorage.getItem("userInfo")
    let userName = sessionStorage.getItem("userName");
    if(sessionStorage.getItem("id")) {
        let id = sessionStorage.getItem("id");
        let name = sessionStorage.getItem("name");
        fetch(`http://localhost:8008/${id}/info/${userId}`, {

        method: "GET",
            
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "client_code" : "client_code"
        }

        }).then(async (response) => {
            let parent = document.getElementById("parent");
            let result = await response.json()
            let data = result.data.tweets;

            let home = document.createElement('buttton');
            home.textContent = "Home";
            home.className = "btn btn-primary";
            parent.appendChild(home);
            home.onclick = function () {getHomePage(); };

            if (userId==id) {
                let newTweet = document.createElement('buttton');
                newTweet.textContent = "New Tweet";
                newTweet.className = "btn btn-primary float-end";
                parent.appendChild(newTweet);
                newTweet.onclick = function () {createNewTweet(); };
            }

            let user = document.createElement('h1');
            user.textContent = userName;
            parent.appendChild(user);
            user.onclick = function () { getUserInfo(userId,userName); };

            if(userId!=id) {
                let followButton = document.createElement('button');
                followButton.id = userId;
                followButton.className = "btn btn-primary";
                console.log(result.data.followResult);
                if(result.data.followResult[0].follow==0) {
                    followButton.innerText = "Follow";
                } else {
                    followButton.innerText = "Following"
                }
                followButton.onclick = function () { followUser(userId,followButton.innerText); };
                parent.appendChild(followButton);
            }

            let bre = document.createElement("br");
            parent.appendChild(bre)

            let btndv = document.createElement('div');
            btndv.className = "btn-group";

            let followers = document.createElement('buttton');
            followers.textContent = "Followers";
            followers.className = "btn btn-primary";
            btndv.appendChild(followers);
            followers.onclick = function () {getFollowList("Followers"); };

            let following = document.createElement('buttton');
            following.textContent = "Following";
            following.className = "btn btn-primary";
            btndv.appendChild(following);
            following.onclick = function () {getFollowList("Following"); };

            parent.appendChild(btndv);

            data.forEach(element => {
            let dv = document.createElement('div');
            dv.className = "border border-primary"
            let bre = document.createElement('br');
            dv.appendChild(bre);

            if(element.retweeterId!=0) {
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
    }

}

function retweet(tweetId,type){
    if(type=='Retweet') {
        type = 'retweet';
    } else {
        type = 'undoRetweet'
    }
    let id = sessionStorage.getItem("id");
    fetch(`http://localhost:8008/${id}/tweet/${tweetId}/${type}`, {

    method: "POST",
     
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "client_code" : "client_code"
    }

    }).then(async (response) => {
        let result = await response.json()
        console.log(await result);
        if(await result.success){
            let retweetButton = document.getElementById(tweetId);
            if(type=='retweet') {
                retweetButton.innerText = "Retweeted";
            } else {
                retweetButton.innerText = "Retweet";
            }
            console.log(`${type} Successfully`)
        } else {
            console.log(`error in ${type}`)
        }
    });
}


function getUserInfo(id,name) {
    sessionStorage.setItem("userInfo",id);
    sessionStorage.setItem("userName",name);
    location.href = "user.html";
}

function getFollowList(listType) {
    sessionStorage.setItem("listType",listType);
    location.href = "follow.html";
}

function getHomePage(){
    location.href = "home.html";
}

function createNewTweet(){
    location.href = "newTweet.html"
}

function followUser(followingId,followType) {
    let type = "";
    if(followType=="Follow"){
        type = "follow";
    } else {
        type = "unfollow"
    }
    let id = sessionStorage.getItem("id");
    fetch(`http://localhost:8008/${id}/${type}/${followingId}`, {

    method: "POST",
     
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "client_code" : "client_code"
    }

    }).then(async (response) => {
        let result = await response.json()
        console.log(await result);
        if(await result.success){
            let followButton = document.getElementById(followingId);
            if(type=="follow"){
                followButton.innerText = "Following";
            } else {
                followButton.innerText = "Follow";
            }
            console.log(`${type} user successfully`)
        } else {
            console.log(`error in ${type}`)
        }
    });
}