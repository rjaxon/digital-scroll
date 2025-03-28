
class GridButtons extends BaseView {

    constructor(app, ui) {
        super('grid-buttons', app, ui);

    }
    
    setButtons(buttonsList) {

        if (!buttonsList) {
            this.hide();
            return;
        }


        let parentElement = this.getElement();
        let buttons = parentElement.querySelectorAll('button');

        let start = 0;
        for (let i = 0; i < buttonsList?.length || 0; start = ++i) {
            buttons[i].innerHTML = buttonsList[i].display;
            buttons[i].onclick = buttonsList[i].action;
            buttons[i].classList.remove('hidden');
        }

        for (let i = start; i < buttons.length; ++i) {
            buttons[i].classList.add('hidden');
            buttons[i].onclick = null;
            buttons[i].innerHTML = `Button ${i}`;
        }

        let element = this.getElement();
        if (buttonsList.length > 1) {
            element.classList.remove('grid-column-1');
            element.classList.add('grid-column-2');
        } else {
            element.classList.remove('grid-column-2');
            element.classList.add('grid-column-1');
        }

        this.show();
    }
}