const BASE_URL = "http://localhost:3000"
const GIFAPI = 'https://api.tenor.com/v1/search?limit=30&locale=en_GB&media_filter=minimal&q='

const logDebug = (message, data = {}) => {
  console.log(`${message} ${JSON.stringify(data)}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const gifContainer = document.querySelector("#gif-container");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value;
    loadGifs(searchTerm).then((gifs) => displayGifs(gifs));
  });

  const loadGifs = (searchTerm) => {
    return fetch(`${GIFAPI}${searchTerm}`)
      .then(res => res.json())
      .then((json) => json.results);
  };

  const displayGifs = (gifs) => {
    gifContainer.innerHTML = "";
    for (const i in gifs) {
      displayGif(gifs[i]);
      if (i % 3 === 0) {
        const sep = document.createElement("div");
        sep.classList.add("w-100");
        gifContainer.append(sep);
      }
    }
  }

  const displayGif = (gif) => {
    const gifCol = document.createElement("div");
    gifCol.classList.add("col");
    gifContainer.append(gifCol);

    const gifImg = document.createElement("img");
    gifImg.src = gif.media[0].gif.url;
    gifImg.classList.add("gif-img");
    gifCol.append(gifImg);
  }
});
