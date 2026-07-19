function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "admin@gmail.com" && password === "123456") {

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("msg").innerHTML = "Wrong Email or Password";
        document.getElementById("msg").style.color = "red";

    }
}
