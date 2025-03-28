
class Chapters extends BaseView {

    #init;

    constructor(app, app_ui) {
        super('grid-book-chapters', app, app_ui);


        super.onStateChanged = this.#stateChanged_chapters;
        super.onVisibilityChanged = this.#onVisibilityChanged_chapters;

    }

    #clickHandler;
    #initialtize() {

        let parent = this.getElement();
        let app = this.app;
        let ui = this.ui;
        let onclick = this.#onClick;

        if (!this.#clickHandler) {
            this.#clickHandler = (event) => {
                onclick(event, app, ui);
            };
        }

        let bible = app.getBible();
        let testament = app.getTestament();
        let book = app.getBook();

        let chapters = bible[testament][book];

        let element = this.getElement();
        for (let i = 1; i <= chapters; ++i) {
            let div = document.createElement('div');
            div.classList.add('tile', 'tile-chapter');
            div.setAttribute('data-value', i);
            div.innerHTML = i;
            div.addEventListener('click', this.#clickHandler);
            element.appendChild(div);
        }
    }


    #onClick(event, app, ui) {

        let chapter = event.target.getAttribute('data-value');
        ui.bibleLocationAsUrlHash(app.getTestamentShort(), app.getBook(), chapter, null);

    }

    #clearChapters() {

        const parent = this.getElement();
        const children = parent.querySelectorAll(`.tile-chapter`);

        children.forEach(child => {
            child.removeEventListener('click', this.#clickHandler);
            child.remove();
        });

        this.#clickHandler = null;
    }

    #stateChanged_chapters(arg) {

        let state = ui.state;
        let states = ui.state.states;
        if (arg == states.Chapters) {
            this.show();

            let gridButtons = this.ui.gridButtons;
            let buttons = [];
            buttons.push(
                {
                    display: 'Books',
                    action: () => {
                        ui.bibleLocationAsUrlHash(app.getTestamentShort(), null, null, null);
                    }
                });
            gridButtons.setButtons(buttons);

            this.ui.title.text = this.app.getBook();
            this.ui.title.show();
        } else {
            this.hide();
        }
    }

    #onVisibilityChanged_chapters() {

        if (this.isVisible()) {
            this.#init = false;
            this.#clearChapters();
            if (!this.#init) {
                this.#initialtize();
            }
        }
    }
}