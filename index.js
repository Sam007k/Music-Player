const music_container = document.getElementById("music-container");
const progress_container = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = ["hey", "summer", "ukulele"];

songIndex = 1;

loadSongs(songs[songIndex]);

// loadSongs
function loadSongs(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong() {
  music_container.classList.add("play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  audio.play();
}

// Pause Song
function pauseSong() {
  music_container.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// prevSong
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSongs(songs[songIndex]);

  playSong();
}

// nextSong
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSongs(songs[songIndex]);

  playSong();
}

// Update Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Skip song
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = music_container.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song
prevBtn.addEventListener("click", prevSong);

nextBtn.addEventListener("click", nextSong);

// Time/Song update
audio.addEventListener("timeupdate", updateProgress);

// Click on Progress Bar
progress_container.addEventListener("click", setProgress);

// Song Ends
audio.addEventListener("ended", nextSong);
