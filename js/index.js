// variable store
let songContainer = document.getElementById("song-container"),
  songDiv = "",
  songLyrics = document.getElementById("song-lyrics"),
  errorMessage = document.getElementById("error-message"),
  searchText = document.getElementById("search-field"),
  spinner = document.getElementById("spinner");

// search input enter button action
searchText.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("search-btn").click();
  }
});

// search song from api
const searchSong = () => {
  toggleSpinner(true);
  const url = `https://api.lyrics.ovh/suggest/${searchText.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySong(data.data))
    .catch((error) =>
      displayError("Something Went Wrong!! Please try again later!")
    );
  searchText.value = "";
  spinner.style.display = "none";
};

// Display song
const displaySong = (song) => {
  songContainer.innerHTML = "";
  song.map((singleSong) => {
    songDiv += `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${singleSong.title}</h3>
                <p class="author lead">
                    <img class="author_img" src="${singleSong.artist.picture}" alt="Artist Pic"/>
                    Album by 
                    <span>${singleSong.artist.name}</span>                    
                </p>
                <audio controls src="${singleSong.preview}"></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${singleSong.artist.name}','${singleSong.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
  });
  songContainer.innerHTML = songDiv;
  toggleSpinner(false);
};

// Get lyrics from api
const getLyrics = (artist, title) => {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((response) => response.json())
    .then((data) => displayLyrics(data.lyrics))
    .catch((error) =>
      displayError("Something Went Wrong!! Please try again later!")
    );
};

// Display single lyrics
const displayLyrics = (lyrics) => {
  console.log(lyrics);
  if (lyrics) {
    songLyrics.innerHTML = lyrics;
  } else {
    songLyrics.innerHTML = "No Lyrics";
  }
};

// display error message
const displayError = (message) => {
  errorMessage.innerText = message;
};

// Show spinner function
const toggleSpinner = (show) => {
  if (show) {
    spinner.classList.add("d-block");
  } else {
    spinner.classList.add("d-none");
  }
};
