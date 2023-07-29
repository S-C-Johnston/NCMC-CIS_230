import Model from "./model.js";
import { CUSTOM_EVENTS } from "./types.js";
import View from "./view.js";

export default class main {
    _model: Model;
    _view: View;
    constructor() {
        this._model = new Model({});
        this.update_callback = this.update_callback.bind(this);
        //Binding the callback to "this" is necessary because passing the
        //function to _view allows its "this" context to take on the context
        //from which it is called.
        this._view = new View(this._model.state, this.update_callback);
        this._view.render();
    };

    update_callback(e: Event) {
        switch (e.type) {
            case "change": {
                const input = e.target as HTMLInputElement;
                console.log(`Received event ${e} of type ${e.type}`);
                console.log(input.name, input.value)
                if (input.type === "radio") {
                    let newstate = this._model.add_selected_answer(
                        input.name, Number(input.value)
                    );
                    // let fieldset_fragment = this._view.build_fieldset({
                    //     question: newstate.quiz.questions.find(q => q.question === input.name)!,
                    //     selected_answers: newstate.selected_answers,
                    //     is_scored: newstate.is_scored,
                    // });
                    // input.closest(`#${fieldset_fragment.firstElementChild?.id}`)?.replaceWith(fieldset_fragment);
                };
                break;
            };
        };
    };
};

new main();