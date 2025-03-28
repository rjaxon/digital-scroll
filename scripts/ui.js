

let helpers_ui = (function () {

    function removeAllChildElementsWithClass(parentElement, className, onRemove) {

        const children = parentElement.querySelectorAll(`.${className}`);

        children.forEach(child => {
            if (onRemove) {
                onRemove(child);
            }
            child.remove();
        });
    }

    function findElementByAttributeValue(parentElement, attribute, value) {

        const matchingElements = parentElement.querySelectorAll(`[${attribute}="${value}"]`);

        if (matchingElements.length > 0) {
            return matchingElements[0];
        }

        return null;
    }

    function findElementsByAttribute(parentElement, attribute) {

        const matchingElements = parentElement.querySelectorAll(`[${attribute}]`);
        return matchingElements;
    }

    let public = {};

    public.removeAllChildElementsWithClass = removeAllChildElementsWithClass;
    public.findElementByAttributeValue = findElementByAttributeValue;
    public.findElementsByAttribute = findElementsByAttribute;

    return public;

})();


let base_ui = (function () {


    let observers = [];


    let state = [];
    state.states = null;
    state.stateNames = null;
    state._pop = Array.prototype.pop;
    state.pop = function () {
        let val = this._pop();

        if (val && observers && this.peek) {
            observers.forEach(o => o.notify('STATE_CHANGE', this.peek()));
        }

        this.printStack();

        return val;
    }
    state._push = Array.prototype.push;
    state.push = function (val) {

        this._push(val);

        if ((val != null || vall != undefined) && observers && this.peek) {
            observers.forEach(o => o.notify('STATE_CHANGE', this.peek()));
        }

        this.printStack();

        return this.length;
    }

    if (!state.clear) {
        state.clear = function () {
            this.length = 0;
        }
    }

    if (!state.peek) {

        state.peek = function () {
            if (this.length == 0) {
                return null;
            }

            return this[this.length - 1];
        }
    }

    if (!state.printStack) {
        state.printStack = function () {
            let names = [];
            this.forEach(x => {
                names.push(`${x}:${this.stateNames?.[x] || '-'}`);
            })
            console.log(names.join(', '));
        }
    }

    function setState(newState) {

        if (state.peek() != newState) {
            let isValid = false;
            for (key in state.states) {
                if (state.states[key] == newState) {
                    isValid = true;
                    break;
                }
            }
            if (!isValid) {
                throw new Exception(`Unhandled state (${newState})`);
            }

            state.push(newState);
        }
    }

    function addObserver(observer) {
        observers.push(observer);
    }

    let public = {};
    public.state = state;
    public.setState = setState;
    public.addObserver = addObserver;

    return public;

})();


let ui = (function (_app, _ui) {

    let app = _app;

    //let states = {
    //    Home: 0,
    //    Testament: 1,
    //    Books: 2
    //    Chapter: 3,
    //    Text: 4
    //};
    let states = {};

    let stateNames = [
        "Home",
        "Testament",
        "Books",
        "Chapters",
        "Text"
    ];

    stateNames.forEach((x, i) => {
        states[x] = i
    });

    _ui.state.states = states;
    _ui.state.stateNames = stateNames;

    function bibleLocationAsUrlHash(testament, book, chapter, verse) {
        let params = [];

        //if (testament) {
        //    // old || new
        //    params.push(`testament=${testament}`);
        //}
        //if (book) {
        //    params.push(`book=${book}`);
        //}
        //if (chapter) {
        //    params.push(`chapter=${chapter}`);
        //}
        //if (verse) {
        //    params.push(`verse=${verse}`);
        //}

        params.push(app.getVersion());
        if (testament) {
            // old || new
            params.push(`${testament}`);
        }
        if (book) {
            params.push(`${book}`);
        }
        if (chapter) {
            params.push(`${chapter}`);
        }
        if (verse) {
            params.push(`${verse}`);
        }

        let v = params.join('/');

        this.setHash(v);
    }

    function setHash(value) {
        window.location.hash = value;
    }

    function handleHashChange(_hash) {
        if (!_hash) {
            console.log('hash is empty');
            return false;
        }

        try {
            let params = {};
            let hash = _hash.substring(1, _hash.length);
            //let tuples = hash.split('&');
            //tuples.forEach(t => {
            //    let split = t.split('=');
            //    if (split.length > 1) {
            //        params[split[0]] = split[1];
            //    } else {
            //        params[split[0]] = 0;
            //    }
            //});

            //console.log(params);

            let path = hash.split('/');
            let length = path.length;
            if (length > 0) {
                params.version = path[0];

                if (length > 1) {
                    params.testament = path[1];
                }
                if (length > 2) {
                    params.book = path[2];
                }
                if (length > 3) {
                    params.chapter = path[3];
                }
            }


            if (params.testament?.toLowerCase() == 'old') {
                app.setTestament('Old Testament');
            } else if (params.testament?.toLowerCase() == 'new') {
                app.setTestament('New Testament');
            }

            if (params.book) {
                try {
                    app.setBook(decodeURI(params.book));
                } catch (error) {
                    params.book = null;
                    console.log(error);
                }
            }

            if (params.chapter) {
                try {
                    app.setChapter(decodeURI(params.chapter));
                } catch (error) {
                    params.chapter = null;
                    console.log(error);
                }
            }


            let ui = _ui;
            if (params.version && !params.testament && !params.book && !params.chapter && !params.verse) {
                ui.state.clear();
                ui.setState(states.Home);
            }
            else if (params.version && params.testament && !params.book && !params.chapter && !params.verse) {
                ui.state.clear();
                ui.setState(states.Home);
                ui.setState(states.Books);
            }
            else if (params.version && params.testament && params.book && !params.chapter && !params.verse) {
                ui.state.clear();
                ui.setState(states.Home);
                ui.setState(states.Books);
                ui.setState(states.Chapters);
            }
            else if (params.version && params.testament && params.book && params.chapter && !params.verse) {
                ui.state.clear();
                ui.setState(states.Home);
                ui.setState(states.Books);
                ui.setState(states.Chapters);
                ui.setState(states.Text);
            }


        } catch (error) {
            console.log('handleHashChange error', error);
            throw Error(error);
            return false;
        }


        return true;
    }

    function onhashchange() {
        if (!handleHashChange(window.location.hash)) {
            ui.state.clear();
            ui.setState(states.Home);
        }
    }

    let gridButtons = new GridButtons(app, this);
    let title = new Title(app, this);
    function onload() {
        console.log('onload', data.bible);


        this.addObserver(new Home(app, this));
        this.addObserver(new Books(app, this));
        this.addObserver(new Chapters(app, this));
        this.addObserver(new BookText(app, this));


        window.addEventListener('hashchange', onhashchange);

        if (!handleHashChange(window.location.hash)) {
            this.state.clear();
            this.setState(states.Home);
        }
    }


    let public = _ui;

    public.gridButtons = gridButtons;
    public.title = title;

    public.onload = onload;
    public.setHash = setHash;
    public.bibleLocationAsUrlHash = bibleLocationAsUrlHash;



    return public;

})(app, base_ui);

