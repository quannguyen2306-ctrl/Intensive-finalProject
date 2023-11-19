async function isLogin(){
    auth.onAuthStateChanged(async (user) => {
        if(user){
            let doc = await db.collection("users").doc(user.uid).get();
            document.getElementById("loginBtn").parentNode.classList.add("d-none");
            document.getElementById("signupBtn").parentNode.classList.add("d-none");
            document.getElementById("nameBtn").innerHTML = doc.data().name;
            document.getElementById("logoutBtn").addEventListener("click", async function(){
                await auth.signOut()
                location.reload();
            })

        }else{
            document.getElementById("logoutBtn").parentNode.classList.add("d-none");
            document.getElementById("nameBtn").parentNode.classList.add("d-none");
        }
      });
      
}

(async function(){
    await isLogin()
})();