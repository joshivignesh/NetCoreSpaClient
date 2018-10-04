
function log() {
    document.getElementById("results").innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}
    document.getElementById("login").addEventListener("click", login, false);
    document.getElementById("api").addEventListener("click", api, false);
    document.getElementById("Logout").addEventListener("click", Logout, false);

    var config = {
        authority: "http://localhost:7000",
        client_id: "spa",
        redirect_uri: "http://localhost:7003/callback.html",
        response_type: "id_token token",
        scope: "openid profile BlogAPI",
        post_logout_redirect_uri: "http://localhost:7003/index.html"
    };

    var mgr = new Oidc.UserManager(config);

    mgr.getUser().then(function (user) {
        if (user) {
            log("user logged in", user.profile);
        }
        else {
            log("User not logged in ");
        }
    });

    function login() {
        alert('test');
        mgr.siginRedirect();
    }

    function api() {
        mgr.getUser().then(function (user) {
            var url = "http://localhost:7001/api/blogs";

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                log(xhr.status, JSON.parse(xhr.responseText));
            };
            xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
            xhr.send();
        });
    }

    function logout() {
        mgr.sigoutRedirect();
    }

}