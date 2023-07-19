export const CUSTOM_EVENTS = {
    model_update: (state) => {
        const _event = new CustomEvent(
            "model_update",
            {
                detail: {
                    state
                }
            }
        );
        return _event;
    },
    button_clicked_event: (message) => {
        const _event = new CustomEvent(
            "button_clicked",
            {
                detail: {
                    message: message
                }
            }
        );
        return _event;
    }
};