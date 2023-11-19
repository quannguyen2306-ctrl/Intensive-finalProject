function voice (){
    let btn_voices = document.getElementsByClassName("btn-voice");
let audio = document.createElement("audio");
audio.setAttribute("id","voice")
// audio.setAttribute("controls","")
audio.setAttribute("type","audio/mpeg");
// audio.setAttribute("style","display:none;");
audio.setAttribute("autoplay","true")
audio.setAttribute("muted","muted")
audio.src = "https://firebasestorage.googleapis.com/v0/b/melodies-in-tales.appspot.com/o/audio%2Fmaster%2Ftrangchu_btn.mp3?alt=media&token=52df7029-1b60-477a-8ba6-d71815472712"
document.body.appendChild(audio);
audio.pause()


for (let i = 0; i < btn_voices.length; i++) {
    let btn_voice = btn_voices[i];
    (async function () {
        let id = btn_voice.getAttribute("data-id");
        let value = btn_voice.getAttribute("data-value");
        if (id != null && value != null) {
            let audio = await db.collection("audio").doc(id).get();
            if (audio.data()) {

            } else {
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
                    data: value,
                    success: function (data) {
                        fetch(data.async).then(async res => {
                            return res.blob();
                        }).then(async blob => {
                            //uploading blob to firebase storage
                            snapshot = await storage.ref("/audio/master/").child(id + ".mp3").put(blob);
                            let path = snapshot.ref.fullPath;
                            await db.collection("audio").doc(id).set({
                                audio: "/"+path,
                                text: value
                            });
                        }).catch(err => {
                            console.log(err)
                        })
                    },
                });
            }

        }
    })();

    btn_voice.addEventListener('mouseover', async function () {
        let id = btn_voice.getAttribute("data-id");
        // console.log(id)
        let doc = await db.collection("audio").doc(id).get();
        if (doc.data()) {
            let pathReference = storage.ref(doc.data().audio);
            let url = await pathReference.getDownloadURL();
            
            document.getElementById("voice").src = url;
            await document.getElementById("voice").setAttribute("muted","false")
            await document.getElementById("voice").play()
        }
    });
}
}

voice();