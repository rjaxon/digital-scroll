
class BaseView {

    #id;
    #app;
    #ui;

    onStateChanged;
    onVisibilityChanged;

    constructor(containerId, app, ui) {
        this.#id = containerId;
        this.#app = app;
        this.#ui = ui;
    }

    get id() {
        return this.#id;
    }

    get app() {
        return this.#app;
    }

    get ui() {
        return this.#ui;
    }

    getElement() {
        return document.getElementById(this.#id);
    }

    notify(message, arg) {
        if (message === 'STATE_CHANGE' && this.onStateChanged) {
            this.onStateChanged(arg);
        }
    }

    isHidden() {
        return this.getElement().classList.contains('hidden');
    }

    isVisible() {
        return !this.isHidden();
    }

    hide() {
        if (!this.isHidden()) {
            this.getElement().classList.add('hidden');

            if (this.onVisibilityChanged) {
                this.onVisibilityChanged();
            }
        }
    }

    show() {
        if (this.isHidden()) {
            this.getElement().classList.remove('hidden');

            if (this.onVisibilityChanged) {
                this.onVisibilityChanged();
            }
        }
    }
}