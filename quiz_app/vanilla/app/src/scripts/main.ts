import Model from "./model.js";
import { CUSTOM_EVENTS } from "./types.js";
import View from "./view.js";

export default function main() {
    const _model = new Model();
    const _view = new View(_model.state);
    _view.render();
};

main();