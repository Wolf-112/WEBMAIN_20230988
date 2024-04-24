document.getElementById("search.btn").addEventListener('click', search_message);


function googleSearch() {
    const searchTerm = document.getElementById("search_input").value;
    const googleSearchUrl = 'https://www.google.com/sarch?q=${encodeURIComponent(searchTerm)}';
    window.open(googleSearchUrl, "_blank");
    return false;
}