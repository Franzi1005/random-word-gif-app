let initialButton = document.querySelector("#initial-button");

initialButton.addEventListener("click", getWord);

function getWord() {
  let apiUrl = "https://random-word-api.herokuapp.com/word";
  axios.get(apiUrl).then(displayWord).then(searchGif);
}

function displayWord(response) {
  let word = response.data[0];
  let wordResult = document.querySelector("#word-result");
  wordResult.innerHTML = `Your word is ${word}`;
}

function searchGif(word) {
  let apiKey = "4EKhSnBxhdLZ1jXoGXi9SnpsrCeFYIBQ";
  let gifApiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${word}&rating=g`;
  axios.get(gifApiUrl).then(showGif);
}

function showGif(response) {
  let gif = response.data.data.images.original.url;
  let gifResult = document.querySelector("#gif-result");
  gifResult.innerHTML = `<img src="${gif}" alt="gif">`;

  //consolelog(gif).;
}
