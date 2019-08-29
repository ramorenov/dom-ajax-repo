const artistSearch = document.getElementById("artist");
const titleSearch = document.getElementById("title");
const lyricBtn = document.getElementById("lyricbtn");
const lyricField = document.getElementById("api-result");

function lyricPromise(artist = "coldplay", title = "clocks") {
  let reposPromise = fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
  //console.log(reposPromise.then(response => response.json()));
  return reposPromise.then(response => response.json());
}

function renderData(promise) {
  promise.then(lyric => {
    lyricField.innerHTML = `<p class="lyric"> 
                ${lyric.lyrics.replace(/\n/g, "<br>")}
      </p>`;
  });
  promise.catch(fail => {
    lyricField.innerHTML = `<p class="lyric"> 
                lyric not found
      </p>`;
  });
}

lyricBtn.addEventListener("click", function() {
  prom = lyricPromise(artistSearch.value, titleSearch.value);
  renderData(prom);
  event.preventDefault();
});
