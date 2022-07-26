function getList() {

    let userId = sessionStorage.getItem("userInfo")
    let userName = sessionStorage.getItem("userName");
    let listType = sessionStorage.getItem("listType");
    let id = sessionStorage.getItem("id");
    fetch(`http://localhost:8008/${id}/followList/${userId}/${listType}`, {

    method: "GET",
        
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "client_code" : "client_code"
    }

    }).then(async (response) => {
        let parent = document.getElementById("parent");
        let result = await response.json()
        let data = result.data;

        let home = document.createElement('buttton');
        home.textContent = "Home";
        home.className = "btn btn-primary";
        parent.appendChild(home);
        home.onclick = function () {getHomePage(); };

        let user = document.createElement('h1');
        user.textContent = userName;
        parent.appendChild(user);

        let followers = document.createElement('h3');
        followers.textContent = listType;

        data.forEach(element => {
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
    });

}
