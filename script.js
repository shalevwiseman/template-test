const qouteContainer = document.getElementById('quote-container');
const qouteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

// Hide Loading
function complete() {
    qouteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
    // loading();
    // Pick a random qoute
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author is 'unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote lenght, if it's long i want to reduce the size
    if (quote.text.length > 120){
        qouteText.classList.add('long-quote');
    
    } else {
        qouteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    qouteText.textContent = quote.text;
    // complete();
}

// Get Quotes From API
async function getQuotes(){
    // loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();