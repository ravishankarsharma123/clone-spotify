console.log("hello ji");


let currentSong = new Audio()

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

const playMusic = (track,pause=false)=>{
    // let audio = new Audio("/songs/"+track)
    currentSong.src = "/songs/"+track
    if(!pause){
        currentSong.play()
        play.src = "./pause-large-line.svg"
    }
    
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20"," ")
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    
}

async function main(){

    // list the all songs
    let songs = await getSongs()
    playMusic(songs[1],true)
    // console.log(songs)


    //  show all song in the playlist

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

    // Attach add event listner to eatch song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
        
    });

    // Attach add event listner to play next and previous button
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "./pause-large-line.svg"
        }
        else{
            currentSong.pause()
            play.src = "./play-large-line.svg"
        }
    });

    // Attach add event listner to play next and previous button
    next.addEventListener("click", ()=>{
        let currentSongIndex = songs.indexOf(currentSong.src.split("/songs/")[1])
        if(currentSongIndex < songs.length-1){
            playMusic(songs[currentSongIndex+1])
        }
        else{
            playMusic(songs[0])
        }
    });

    // Attach add event listner to play next and previous button
    previous.addEventListener("click", ()=>{
        let currentSongIndex = songs.indexOf(currentSong.src.split("/songs/")[1])
        if(currentSongIndex > 0){
            playMusic(songs[currentSongIndex-1])
        }
        else{
            playMusic(songs[songs.length-1])
        }
    }
    );



    // listen to the time update event
        currentSong.addEventListener("timeupdate", () => {
        let duration = currentSong.duration;
        let currentTime = currentSong.currentTime;
    
        // Convert duration to minutes and seconds
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;
    
        // Convert currentTime to minutes and seconds
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    
        document.querySelector(".songtime").innerHTML = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
        document.querySelector(".circle").style.left = `${(currentTime/duration)*100}%`
    });

    
    
    
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        const seekbar = e.target.getBoundingClientRect();
        const offsetX = e.offsetX;
        const width = seekbar.width;
        const percentage = (offsetX / width) * 100;
        document.querySelector(".circle").style.left = percentage + "%";
        currentSong.currentTime = (currentSong.duration * percentage) / 100;
    });


      





}

main()











// for (let index = 0; index < songs.length; index++) {
//     const element = songs[index];
//     let li = document.createElement("li");
//     li.innerHTML = element;
//     songUL[0].appendChild(li)
// }




// play the  first song
// var audio = new Audio(songs[1]);
// audio.play();



// song  total durtion
// audio.addEventListener("loadeddata", ()=> {
//     let duration = audio.duration;
//     console.log(duration)
// });
            // real time read duration
// audio.addEventListener('timeupdate', () => {
//     console.log(audio.duration, audio.currentSrc,`Current Time: ${audio.currentTime.toFixed(2)} seconds`);
// });