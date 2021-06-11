let username = document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let signUpBtn = document.getElementById("signUpBtn");

signUpBtn.addEventListener("click", function () {
    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            let uid = user.uid;
            console.log("1111")
            db.collection("users").doc(uid).set({
                name: username.value,
                email: email.value
            }).then(function(docRef) {
                console.log("Document written with ID: ");
                alert("Sign Up for users: " + username.value + " successfull")
                window.location.href = "./user.html"
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage)
            // ..
        });

})


