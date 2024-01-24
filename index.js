let initialButton = document.querySelector("#initial-button");

initialButton.addEventListener("click", getWordAsync);

function displayWord(response) {
  let word = response.data[0];
  let wordResult = document.querySelector("#word-result");
  wordResult.innerHTML = `Your word is <br><strong>${word}</strong>`;
}

function showGif(response) {
  console.log(response.data.data[0].images);
  let gif = response.data.data[0].images.fixed_height.url;
  let gifResult = document.querySelector("#gif-result");
  gifResult.innerHTML = `<img src="${gif}" alt="gif">`;
}

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
    let queryWord = responseWord.data[0];
    let responseGif = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${queryWord}`
    );
    showGif(responseGif);
  } catch (error) {
    console.log(error);
    console.error("oops, error! MÖÖP, MÖÖP, MÖÖP!");
    let gifResult = document.querySelector("#gif-result");
    gifResult.innerHTML = `<h2>Shoot, nothing found for your search word! This app sucks!</h2>`;
  }
}
