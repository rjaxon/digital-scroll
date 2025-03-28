
class BookText extends BaseView {

    #text;

    constructor(app, app_ui) {
        super('book-text', app, app_ui);


        super.onStateChanged = this.#stateChanged_Text;

    }


    #populateText() {

        let pause = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        };

        this.app.fetchText()
            .then(async (result) => {
                console.log(result);

                let chapter = app.getChapter();
                let element = this.getElement();

                for (let i = 0; i < result.data.length; ++i) {
                    let x = result.data[i];

                    let div = document.createElement('div');
                    div.classList.add('verse');
                    div.classList.add('fade-in-left');

                    let span = document.createElement('span');
                    span.classList.add('verse-number');

                    span.appendChild(document.createTextNode(chapter));
                    span.appendChild(document.createTextNode(':'));
                    span.appendChild(document.createTextNode(x.verse));


                    div.append(span);
                    div.append(document.createTextNode(` ${x.text} `));

                    element.appendChild(div);

                    await pause(500);
                }
            })
            .catch(error => { throw new Error(error); });

    }

    #stateChanged_Text(arg) {


        let states = this.ui.state.states;
        if (arg == states.Text) {

            let state = this.ui.state;
            try {
                this.getElement().innerHTML = '';
                this.#populateText();
                this.show();
                let gridButtons = this.ui.gridButtons;
                let buttons = [];
                if (app.getChapter() > 1) {
                    let previous = Number(app.getChapter()) - 1;
                    buttons.push(
                        {
                            display: `Chapter ${previous}`,
                            action: () => {
                                ui.bibleLocationAsUrlHash(app.getTestamentShort(), app.getBook(), previous, null);
                            }
                        });
                }
                buttons.push(
                    {
                        display: 'Chapter List',
                        action: () => {
                            ui.bibleLocationAsUrlHash(app.getTestamentShort(), app.getBook(), null, null);
                        }
                    });
                if (app.getChapter() < app.getMaxChapter()) {
                    let next = Number(app.getChapter()) + 1;
                    buttons.push(
                        {
                            display: `Chapter ${next}`,
                            action: () => {
                                ui.bibleLocationAsUrlHash(app.getTestamentShort(), app.getBook(), next, null);
                            }
                        });
                }
                gridButtons.setButtons(buttons);

            } catch (error) {
                this.getElement().innerHTML = error;
            }

        }
        else {
            this.hide();
        }
    }

}