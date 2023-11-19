function text_to_speech(text, dom_audio_source, dom_audio) {
    $.ajax({
        url: 'https://api.fpt.ai/hmi/tts/v5',
        crossDomain: true,
        headers: {
            'api-key': 'WL2OcJRBfQUwTkUAgsf50xXiVcfqoiRH',
            'voice': 'banmai',
            'speed': '0',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        dataType: 'json',
        data: text,
        success: function (data) {
            setTimeout(function () {
                document.querySelector(dom_audio_source).setAttribute("src", data.async)
                // document.querySelector(dom_audio_source);
                document.querySelector(dom_audio).load()

            }, 2000)

        }
    });

}

// let books = document.getElementById("books");
// function renderBooks() {
//     db.collection("vanhoc_books").get().then(querySnapshot => {
//         books.innerHTML = "";
//         querySnapshot.forEach(doc => {
//             console.log("AAA")
//             let booksItem = `
//             <div class="card mt-5" style="width: 15rem;">
//             <div class="ratio" style="--bs-aspect-ratio: 150%;">
//               <img src="${vanhoc_books.doc.cover}" class="card-img-top" alt="...">
//             </div>
//             <div class="card-body">
//               <h5 class="card-title">${vanhoc_books.name}</h5>
//               <p class="card-text">${vanhoc_books.author}</p>
//               <a href="#" class="btn btn-primary">Nghe sách</a>
//             </div>
//           </div>
//           `
//           books.innerHTML += booksItem;

//         })
//     })

// }

// renderBooks();

async function renderBooks(){
    var url = new URL(window.location.href);
    var cate = url.searchParams.get("category");
    let cateRef = db.collection("category").doc(cate);
    let category = await cateRef.get();
    if(category.data()){
        document.getElementsByTagName("title")[0].innerHTML = category.data().name + " - Melodies in Tales";
        let books = await db.collection("books").where('category', '==', cateRef).get();
        booksEle = "";
        for (let i in books.docs) {
            const book = books.docs[i]
            booksEle += `
            <div class="card mt-5" style="width: 15rem;">
            <div class="ratio" style="--bs-aspect-ratio: 150%;">
              <img src="${book.data().poster}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-title text-nowrap">${book.data().title}</h5>
              <p class="card-text text-nowrap">${book.data().author}</p>
              <a href="./book.html?id=${book.id}" class="btn btn-primary">Nghe sách</a>
            </div>
          </div>`;

        }
        document.getElementById("books").innerHTML = booksEle
    }else{
        alert("Thể loại không tồn tại");
        window.location.href = "./index.html"
    }

}


(async function() {
	await renderBooks();
})();

