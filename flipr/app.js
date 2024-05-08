const inputText = document.getElementById('inputText');
const sourceLangSelect = document.getElementById('sourceLang');
const targetLangSelect = document.getElementById('targetLang');
const translationResult = document.getElementById('translationResult');
const translateBtn = document.getElementById('translateBtn');

// Function to fetch supported languages
function fetchSupportedLanguages() {
    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'x-rapidapi-key': '579c5ec1f3mshe5ff8f0ee1d1b4ap1998bfjsn45c40fff70b7'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Populate sourceLangSelect and targetLangSelect
        data.data.languages.forEach(language => {
            const option = document.createElement('option');
            option.value = language.language;
            option.textContent = language.name;
            sourceLangSelect.appendChild(option);
            targetLangSelect.appendChild(option.cloneNode(true));
        });
    })
    .catch(error => console.error('Error fetching supported languages:', error));
}

// Call fetchSupportedLanguages function to populate the dropdowns
fetchSupportedLanguages();

// Event listener for translate button click
translateBtn.addEventListener('click', translateText);

// Function to translate text
function translateText() {
    const text = inputText.value;
    const sourceLang = sourceLangSelect.value;
    const targetLang = targetLangSelect.value;

    // Fetch translation
    fetch(`https://google-translate1.p.rapidapi.com/language/translate/v2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
            'x-rapidapi-key': '579c5ec1f3mshe5ff8f0ee1d1b4ap1998bfjsn45c40fff70b7'
        },
        body: `q=${encodeURIComponent(text)}&source=${sourceLang}&target=${targetLang}`
    })
    .then(response => response.json())
    .then(data => {
        translationResult.textContent = data.data.translations[0].translatedText;
    })
    .catch(error => console.error('Translation error:', error));
}
