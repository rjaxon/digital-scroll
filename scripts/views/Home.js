
class Home extends BaseView {

    #init;

    constructor(app, app_ui) {
        super('grid-home', app, app_ui);

        super.onStateChanged = this.#stateChanged_gridHome;
        super.onVisibilityChanged = this.#onVisibilityChanged_Home;

        this.#init = false;
    }

    #stateChanged_gridHome(arg) {

        let gridButtons = this.ui.gridButtons;
        let states = this.ui.state.states;
        if (arg == states.Home) {
            this.show();
            gridButtons.setButtons(null);

            ui.title.hide();
        }
        else {
            this.hide();
        }
    }

    #initize() {

        let parent = this.getElement();
        let tiles = parent.querySelectorAll('.tile');

        tiles.forEach(s => {

            s.addEventListener('click', (event) => {
                this.#onTileClick(event, this.app, this.ui);
            });
        });

        this.#init = true;
    }

    #onTileClick(event, app, ui) {

        let element = event.target;
        let testament = element.getAttribute('data-value');

        let t;
        if (testament === 'New Testament') {
            t = 'new';
        } else if (testament === 'Old Testament') {
            t = 'old';
        }
        ui.bibleLocationAsUrlHash(t, null, null, null);

    }

    #onVisibilityChanged_Home() {

        if (!this.isHidden()) {

            if (!this.#init) {
                this.#initize();
            }
        }
    }
}