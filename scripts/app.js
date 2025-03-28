
let app = (function (_data) {

    let data = _data;


    const versions = [
        "en-asv",
        "en-bsb",
        "en-dra",
        "en-engbrent",
        "en-fbv",
        "en-gnv",
        "en-kjv"
    ];

    let version = versions[0];
    let testament;
    let book;
    let chapter;


    function getVersion() {
        return version;
    }

    function setVersion(value) {
        version = value;
    }

    function getTestament() {
        return testament;
    }

    function setTestament(value) {

        if (!data.bible[value]) {
            throw Error(`setTestment: ${value} is invalid. Use {Old Testament || New Testament}`);
        }

        testament = value;
    }

    function getTestamentShort() {
        return getTestament().substring(0, 3).toLowerCase();
    }

    function getBook() {
        return book;
    }

    function setBook(value) {

        if (!data.bible[getTestament()][value]) {
            throw Error(`setBook: ${value} not found in ${getTestament()}`);
        }

        book = value;
    }

    function getChapter() {
        return chapter;
    }

    function getMaxChapter() {
        return data.bible[getTestament()][getBook()];
    }

    function setChapter(value) {

        let max = getMaxChapter();
        if (value < 0 || max < value) {
            throw Error(`setChapter: ${value} is outside chapter range for ${getBook()}. Use ${1}-${max}`);
        }

        chapter = value;
    }

    function getBible() {
        return data.bible;
    }

    function fetchText() {

        return data.fetchChapter(getVersion(), getTestament(), getBook(), getChapter());
    }

    let public = {};

    public.versions = versions;

    public.getVersion = getVersion;
    public.setVersion = setVersion;

    public.getTestament = getTestament;
    public.setTestament = setTestament;
    public.getTestamentShort = getTestamentShort;

    public.getBook = getBook;
    public.setBook = setBook;

    public.getChapter = getChapter;
    public.setChapter = setChapter; 
    public.getMaxChapter = getMaxChapter; 
    

    public.fetchText = fetchText;

    public.getBible = getBible;

    return public;
})(data);