
class Books extends BaseView {

    #oldTestament;
    #newTestament;

    constructor(app, app_ui) {
        super('grid-books', app, app_ui);

        super.onStateChanged = this.#stateChanged_books;
        super.onVisibilityChanged = this.#onVisibilityChanged_books;

        this.#oldTestament = new OldTestament(app, app_ui);
        this.#newTestament = new NewTestament(app, app_ui);

    }

    #stateChanged_books(arg) {

        let state = this.ui.state;
        let states = state.states;
        if (arg == states.Books) {
            ui.title.text = app.getTestament();
            ui.title.show();

            let gridButtons = this.ui.gridButtons;
            this.show();
            gridButtons.setButtons([
                {
                    display: 'Home',
                    action: () => {
                        //history.back(); /* state.pop();*/
                        ui.bibleLocationAsUrlHash(null, null, null, null);
                    }
                },
                //{
                //    display: 'Cancel',
                //    action: () => {
                //        state.clear();
                //        setState(states.Home);
                //    }
                //}
            ]);
        }
        else {
            this.hide();
        }
    }

    #onVisibilityChanged_books() {
        if (!this.isHidden()) {
            if (app.getTestament() == "Old Testament") {
                this.#oldTestament.show();
                this.#newTestament.hide();
            } else if (app.getTestament() == "New Testament") {
                this.#oldTestament.hide();
                this.#newTestament.show();
            }
        }
    }
}


class OldTestament extends BaseView {

    #init;


    constructor(app, app_ui) {
        super('grid-books-old-testament', app, app_ui);
        super.onVisibilityChanged = this.#onVisibilityChanged_books;
    }

    #initize() {

        let parent = this.getElement();


        let bible = app.getBible();
        let testament = bible["Old Testament"];

        for (key in testament) {

            let div = document.createElement('div');
            div.classList.add('tile');
            div.innerHTML = key;
            div.setAttribute('data-value', key.replace(' ', '').toLowerCase());

            div.addEventListener('click', (event) => {
                this.#onTileClick(event, this.app, this.ui);
            });

            parent.appendChild(div);
        }

        this.#init = true;
    }

    #onTileClick(event, app, ui) {

        let element = event.target;
        ui.bibleLocationAsUrlHash(app.getTestamentShort(), element.innerHTML, null, null);

    }

    #onVisibilityChanged_books() {
        if (!this.isHidden()) {
            if (!this.#init) {
                this.#initize();
            }
        }
    }
}


class NewTestament extends BaseView {

    #init;

    constructor(app, app_ui) {
        super('grid-books-new-testament', app, app_ui);
        super.onVisibilityChanged = this.#onVisibilityChanged_books;
    }

    #initize() {

        let parent = this.getElement();


        let bible = app.getBible();
        let testament = bible["New Testament"];

        for (key in testament) {

            let div = document.createElement('div');
            div.classList.add('tile');
            div.innerHTML = key;

            div.addEventListener('click', (event) => {
                this.#onTileClick(event, this.app, this.ui);
            });

            parent.appendChild(div);
        }

        this.#init = true;
    }

    #onTileClick(event, app, ui) {

        let element = event.target;
        ui.bibleLocationAsUrlHash(app.getTestamentShort(), element.innerHTML, null, null);
    }

    #onVisibilityChanged_books() {
        if (!this.isHidden()) {
            if (!this.#init) {
                this.#initize();
            }
        }
    }
}