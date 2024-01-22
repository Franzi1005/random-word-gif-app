let initialButton = document.querySelector("#initial-button");

initialButton.addEventListener("click", getWordAsync);

/* function getWord() {
  let apiUrlWord = "https://random-word-api.herokuapp.com/word";
  axios
    .get(apiUrlWord)
    .then(displayWord)
    .catch(console.log("sorry, we didn't find a word"))
    .then(searchGif)
    .catch(console.log("sorry, this request failed"));
} */

function displayWord(response) {
  let word = response.data;
  let wordResult = document.querySelector("#word-result");
  wordResult.innerHTML = `Your word is ${word}`;
}

/* function searchGif(word) {
  let apiKey = "4EKhSnBxhdLZ1jXoGXi9SnpsrCeFYIBQ";
  let gifApiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${word}&rating=g`;
  axios.get(gifApiUrl).then(showGif);
} */

function showGif(response) {
  console.log(response.data.data[0].images.downsized.url);
  let gif = response.data.data[0].images.downsized.url;
  let gifResult = document.querySelector("#gif-result");
  gifResult.innerHTML = `<img src="${gif}" alt="gif">`;
}

// async await

debugger;

async function getWordAsync(event) {
  event.preventDefault();
  let responseWord;
  try {
    responseWord = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );
    displayWord(responseWord);
  } catch (error) {
    console.log(error);
    console.error("oops, error! MÖÖP, MÖÖP!");
  }

  try {
    let apiKey = "4EKhSnBxhdLZ1jXoGXi9SnpsrCeFYIBQ";
    let responseGif = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${responseWord}`
    );
    showGif(responseGif);
  } catch (error) {
    console.log(error);
    console.error("oops, error! MÖÖP, MÖÖP, MÖÖP!");
    let gifResult = document.querySelector("#gif-result");
    gifResult.innerHTML = `<h2>Shoot, nothing found for your search word! This app sucks!</h2>`;
  }
}
