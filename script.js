const author = document.querySelector('.author');
const quote = document.querySelector('.quote');
const share = document.querySelector('.share');
const tagsWrapper = document.querySelector('.tags_wrapper');

const random = document.querySelector('.random');

function loadQuote() {
  clearQuote();
  fetch(
  "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
,{
  cache:"no-cache"
})
  .then(async (response) => { 
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      quote.textContent = `Извините, запрос упал с кодом ${response.status}`;
      throw -1;
    }

  })
  .then((data) => {
    // Use the data here
    const indexRandom = Math.floor(Math.random()* data.length);
    author.textContent = `${data[indexRandom].author}`;
    quote.textContent = `“${data[indexRandom].quote}”`;
    data[indexRandom].tags.forEach(element => {
        tagsWrapper.innerHTML += `<div class="tag">${element}</div>`;
    });
  })
  .catch((error) => {
    console.log("🚀 ~ loadQuote ~ error:", error);
    // Handle the error here
  });
const r = document.createElement('script')
  r.src="https://media.ethicalads.io/media/client/ethicalads.min.js"
  document.head.appendChild(r);
};

random.addEventListener('click', loadQuote);
function clearQuote() {
  author.textContent = "";
  quote.textContent = "";
  tagsWrapper.childNodes.forEach(element => {
    tagsWrapper.innerHTML = "";
  });
}

share.addEventListener('click', ()  => {
  const text = quote.innerText;
  navigator.clipboard.writeText(text).then (() => {
    alert("Скопировано в буфер обмена");
  });
});
loadQuote();