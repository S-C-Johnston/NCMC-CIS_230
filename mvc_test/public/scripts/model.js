import { CUSTOM_EVENTS } from "./types.js";

export default class Model {
    constructor(
        count = 0
    ) {
        this.state = { count: count };
    };

    increment(){
        this.state.count++;
        console.log("Incrementing!");
        window.dispatchEvent(CUSTOM_EVENTS.model_update(this.state));
    };
};