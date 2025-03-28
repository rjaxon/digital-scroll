
class Title extends BaseView {

    #text;

    constructor(app, app_ui) {
        super('title', app, app_ui);


        super.onVisibilityChanged = this.#onVisibilityChanged_Title;
    }

    set text(text) {
        this.#text = text;

        if (!this.isHidden()) {
            let element = this.getElement();
            element.innerHTML = this.#text;
        }
    }

    #onVisibilityChanged_Title() {

        if (!this.isHidden()) {
            let element = this.getElement();
            element.innerHTML = this.#text;
        }
    }
    
}