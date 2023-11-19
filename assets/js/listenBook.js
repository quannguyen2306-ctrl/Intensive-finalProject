let bookPoster = document.getElementById("bookPoster")
let bookAuthor = document.getElementById("bookAuhtor")
let bookTitle = document.getElementById("bookTitle")
let listenBtn = document.getElementById("readBook")
let content = document.getElementById("content")

async function renderChoseBook(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    console.log(id)
    let book = await db.collection("books").doc(id).get();
    if(book){
        document.getElementsByTagName("title")[0].innerHTML = book.data().title + " - Melodies in Tales";
        document.getElementById("bookTitle").innerHTML = book.data().title
        document.getElementById("bookAuthor").innerHTML = book.data().author
        document.getElementById("bookPoster").src = book.data().poster
        let audioEle = "";
        
        for (let i in book.data().content) {
            let audio = book.data().content[i];
            let link = await storage.ref(audio.mp3).getDownloadURL();
            audioEle = `<li class="list-group-item"><audio src="${link}" controls /></li>`;
        }
        document.getElementById("listAudio").innerHTML = audioEle;
    }else{
        alert("Sách không tồn tại");
        window.location.href = "./index.html"
    }
    
}

(async function(){
    await renderChoseBook()
})();

async function listen(){


}