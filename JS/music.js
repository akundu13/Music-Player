const music=document.querySelector("audio");
const play=document.getElementById("play");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const img=document.querySelector("img");
const title=document.getElementById("title");
const artist=document.getElementById("artist");

let progress=document.getElementById("progress");
let current_time=document.getElementById("current_time");
let total_duration=document.getElementById("total_duration");
let progress_div=document.getElementById("progress_div");


let isPlaying=false;
//for play
const playMusic=function()
{
    isPlaying=true;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};

//for pause
const pauseMusic=function()
{
    isPlaying=false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");

};

//for checking whether music is play or not
play.addEventListener("click",function()
{
    isPlaying?pauseMusic():playMusic();
});



        //creating an array of an object

        const songs=
        [

            {
                poster:"img1",
                title:"Believer",
                artist:"Imagine Dragons"
            },

            {
                poster:"img2",
                title:"Hall of Fame",
                artist:"The Script"
            },

            {
                poster:"img3",
                title:"Stronger",
                artist:"Kelly Clarkson"
            }
        ];

//for changing the music data

const loadSong=function(songs)
        {
            title.textContent=songs.title;
            artist.textContent=songs.artist;

            music.src="songs/"+songs.title+".mp3";
            img.src="images/"+songs.poster+".jpg";
        };

        let songsIndex=0;

        const nextSong=function()
        {
        
            songsIndex=(songsIndex+1)%songs.length;
            loadSong(songs[songsIndex]);
            playMusic();
        };

       const prevSong=function()
        {
            songsIndex=(songsIndex-1+songs.length)%songs.length;
            loadSong(songs[songsIndex]);
            playMusic();
        };

//Progress Work
music.addEventListener("timeupdate",(event)=>
{

    const{ currentTime, duration}=event.srcElement;
    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}%`;

    //Set Songs Timing
        //Update Total Duration
        const durationMin=Math.floor(duration/60);
        const durationSec=Math.floor(duration%60);
        let total_dur=`${durationMin}:${durationSec}`;
        if(duration)
        {
            total_duration.textContent=`${total_dur}`;
        }
     
       //Update Current Time
       let currentTimeMin=Math.floor(currentTime/60);
       let currentTimeSec=Math.floor(currentTime%60);
       
       if(currentTimeSec < 10)
       {
        currentTimeSec=`0${currentTimeSec}`;
      
       }
       let total_cur=`${currentTimeMin}:${currentTimeSec}`;
       current_time.textContent=`${total_cur}`;


});

//Add progress bar functionality
progress_div.addEventListener("click",(event)=>
{
    //const duration=music.duration;
    const{duration}=music;
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=move_progress;
});

//if song end then automatically the next sond will be start 
music.addEventListener("ended",nextSong);


next.addEventListener("click",nextSong);       
prev.addEventListener("click", prevSong);

