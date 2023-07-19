import { CUSTOM_EVENTS } from "./types.js";

export default class View {
    constructor(
        state = { count: 0 }
    ) {
        this.root = document.querySelector("#root");
        window.addEventListener(CUSTOM_EVENTS["model_update"]().type,
            (e) => this.update(e.detail.state)
        );
        this.state = state;
    };

    render(state = this.state) {
        const count_paragraph = document.createElement("p");
        count_paragraph.textContent = `Count is ${state.count}`;
        this.root.appendChild(count_paragraph);

        const button = document.createElement("button");
        button.textContent = "BUTTON"
        button.addEventListener("click", () =>
            window.dispatchEvent(CUSTOM_EVENTS.button_clicked_event(
                "Button clicked!")
            )
        )
        this.root.appendChild(button)
    };

    update(state) {
        const count_paragraph_handle = document.querySelector("p");
        count_paragraph_handle.textContent = `Count is ${state.count}`;
    };
};
