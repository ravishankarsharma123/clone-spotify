console.log("hello ji");



async function getSongs( ) {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    
    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML=response;
    let as = div.getElementsByTagName("a")
    let songs= []
    for (let index = 0; index < as.length; index++ ){
        const element = as[index]
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs

    
}

async function main(){
    // list the all songs
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        
                <img class="invert" src="./music-2-fill.svg" alt="">
                <div class="info">
                  <h3>${song.replaceAll("%20"," ")}</h3>
                  <p>Song Artist</p>
                </div>
                <div class="playnow">
                  <span>Play now </span>
                  <img class="invert" src="./play-large-line.svg" alt="">
                </div>
              
              </li>`
        
       
    }


    // for (let index = 0; index < songs.length; index++) {
    //     const element = songs[index];
    //     let li = document.createElement("li");
    //     li.innerHTML = element;
    //     songUL[0].appendChild(li)
    // }

    // play the  first song
    var audio = new Audio(songs[1]);
    // audio.play();




    // audio.addEventListener("loadeddata", ()=> {
    //     let duration = audio.duration;
    //     console.log(duration)
    // });

    audio.addEventListener('timeupdate', () => {
        console.log(audio.duration, audio.currentSrc,`Current Time: ${audio.currentTime.toFixed(2)} seconds`);
    });
}

main()
