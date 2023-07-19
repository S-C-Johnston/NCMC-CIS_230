import Model from "./model.js";
import { CUSTOM_EVENTS } from "./types.js";
import View from "./view.js";

export default function main() {
    const _model = new Model();
    const _view = new View(_model.state);
    window.addEventListener(CUSTOM_EVENTS.button_clicked_event().type,
        (e) => {
            console.log(e.detail.message);
            _model.increment();
        }
    );
    _view.render();
};

main();