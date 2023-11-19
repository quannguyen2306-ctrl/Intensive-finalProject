(async function() {
	await renderNav();
})();

 async function renderNav(){
    let categories = await db.collection("category").get();
    let cateEle = "";
    for (let i in categories.docs) {
        const category = categories.docs[i];
        cateEle += `              <li><a class="dropdown-item" href="./category.html?category=${category.id}">${category.data().name}</a></li>`
    }
    document.getElementById("categoryNavBar").innerHTML = cateEle;
 }