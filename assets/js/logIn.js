
let userEmail = document.getElementById("userEmail").value;
let userPassword = document.getElementById("userPassword").value;
let loginBtn = document.getElementById("login")

function login() {

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.alert("Success")
            window.location.href="./user.html" 
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("Error : " + errorMessage)
        });

    }

loginBtn.addEventListener("click", login())

