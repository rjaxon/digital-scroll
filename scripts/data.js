
let data = (function () {


    let bible_books = {
        "Old Testament": {
            "Genesis": 50,
            "Exodus": 40,
            "Leviticus": 27,
            "Numbers": 36,
            "Deuteronomy": 34,
            "Joshua": 24,
            "Judges": 21,
            "Ruth": 4,
            "1 Samuel": 31,
            "2 Samuel": 24,
            "1 Kings": 22,
            "2 Kings": 25,
            "1 Chronicles": 29,
            "2 Chronicles": 36,
            "Ezra": 10,
            "Nehemiah": 13,
            "Esther": 10,
            "Job": 42,
            "Psalms": 150,
            "Proverbs": 31,
            "Ecclesiastes": 12,
            "Song of Solomon": 8,
            "Isaiah": 66,
            "Jeremiah": 52,
            "Lamentations": 5,
            "Ezekiel": 48,
            "Daniel": 12,
            "Hosea": 14,
            "Joel": 3,
            "Amos": 9,
            "Obadiah": 1,
            "Jonah": 4,
            "Micah": 7,
            "Nahum": 3,
            "Habakkuk": 3,
            "Zephaniah": 3,
            "Haggai": 2,
            "Zechariah": 14,
            "Malachi": 4
        },
        "New Testament": {
            "Matthew": 28,
            "Mark": 16,
            "Luke": 24,
            "John": 21,
            "Acts": 28,
            "Romans": 16,
            "1 Corinthians": 16,
            "2 Corinthians": 13,
            "Galatians": 6,
            "Ephesians": 6,
            "Philippians": 4,
            "Colossians": 4,
            "1 Thessalonians": 5,
            "2 Thessalonians": 3,
            "1 Timothy": 6,
            "2 Timothy": 4,
            "Titus": 3,
            "Philemon": 1,
            "Hebrews": 13,
            "James": 5,
            "1 Peter": 5,
            "2 Peter": 3,
            "1 John": 5,
            "2 John": 1,
            "3 John": 1,
            "Jude": 1,
            "Revelation": 22
        }
    };

    let cache = {};
    async function fetchJsonData(url) {

        let promise = new Promise((resolve, reject) => {
            // Simulating an asynchronous operation (e.g., fetching data)
            //let isSuccess = true; // You can change this to `false` to test the rejection


            if (cache[url]) {
                console.log('returning cached');
                resolve(cache[url]);
                return;
            }

            console.log('fetching....');

            //fetch(url, {
            //    method: 'GET',
            //    mode: 'no-cors'  // Disable CORS for the request
            //})
            fetch(url)
                .then(response => {
                    // Check if the response is OK (status code 200-299)
                    if (!response.ok) {
                        // throw new Error('Network response was not ok ' + response.statusText);
                        reject('Network response was not ok ' + response.statusText);
                    }
                    // Return the response as JSON
                    return response.json();
                })
                .then(data => {
                    // Handle the data (you can process or display it here)
                    //console.log('Fetched data:', data);

                    if (!cache[url]) {
                        cache[url] = data;
                    }

                    resolve(data);
                })
                .catch(error => {
                    // Handle errors (e.g., network errors, JSON parsing errors)
                    //console.error('There was a problem with the fetch operation:', error);
                    reject(`There was a problem with the fetch operation:  ${error}`);
                });
        });

        return promise;
    }


    function fetchChapter(_version, testament, _book, chapter) {

        let version = _version.toLowerCase();
        let book = _book.replace(' ', '').toLowerCase();
        let url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${book}/chapters/${chapter}.json`;
        console.log(url);

        return fetchJsonData(url);
        //return fetchJsonData('./data/malachi-4.json');
    }

    let public = {};

    public.bible = {};
    public.bible = bible_books;

    public.fetchChapter = fetchChapter;

    return public;
})();