import { model_state } from "./model.js";
import { Quiz, Quiz_Question, get_answer_id } from "./quiz/quiz_data.js";
import { CUSTOM_EVENTS } from "./types.js";
import generate_css_safe_id from "./util/generate_css_safe_id.js";

const HEADING_NAME_ID = "quiz_name"
const HEADING_TOPIC_ID = "quiz_topic"
const STYLESHEET = "./quiz/Quiz_Question_Form.css"
const CORRECT_ANSWER_HILIGHT_COLOR = "lightgreen"

export default class View {
    root: Element;
    state: model_state;
    update_callback: (event: Event) => any
    constructor(
        state: model_state,
        update_callback: (event: Event) => any
    ) {
        this.root = document.querySelector("#root") ?? document.body;
        this.state = state;
        this.update_callback = update_callback;
        this.build_form = this.curry_fragment_builder_with_id(this._build_form.bind(this));
    };

    render(state = this.state, root = this.root) {
        console.log("Building a new element tree!");
        root.replaceChildren(this.build_form(state));
        this.add_style(root);
    };

    curry_fragment_builder_with_id(
        fn_to_curry: (uuid: string, ...rest: any[]) => DocumentFragment
    ) {
        const uuid = generate_css_safe_id(crypto.randomUUID());
        return function(...args: any[]) {
            return fn_to_curry(uuid, ...args)
        };
    };

    /**
     * @abstract build_form is a dummy function prototype which exists primarily
     * to provide typechecking and a public interface to the intended use of the
     * curried function
     * @param state
     * @returns DocumentFragment
     */
    build_form(state = this.state): DocumentFragment {
        return new DocumentFragment();
    };

    private _build_form(uuid:string, state = this.state) {
        console.log(`Building new form!`)
        const fragment = document.createDocumentFragment();
        const name = fragment.appendChild(document.createElement("h1"));
        name.textContent = state.quiz.name;
        name.id = HEADING_NAME_ID;

        const topic = fragment.appendChild(document.createElement("h2"));
        topic.textContent = state.quiz.topic;
        topic.id = HEADING_TOPIC_ID;

        const form = fragment.appendChild(document.createElement("form"));
        form.id = uuid;

        state.quiz.questions.map((question) => {
            form.appendChild(this.build_fieldset({
                question: question,
                selected_answers: state.selected_answers,
                is_scored: state.is_scored
            }));
        });

        return fragment;
    };

    build_fieldset({
        question,
        selected_answers,
        is_scored
    }: {
        question: Quiz_Question;
        selected_answers?: Map<string, number>;
        is_scored?: boolean;
    }) {
        const selected_answer_index = selected_answers?.has(question.question)
            ?  selected_answers.get(question.question)
            : null;
        const fragment = document.createDocumentFragment();
        const fieldset = fragment.appendChild(document.createElement("fieldset"));
        fieldset.id = generate_css_safe_id(question.question);

        const legend = fieldset.appendChild(document.createElement("legend"));
        legend.textContent = question.question;

        question.answers.map(answer => {
            const answer_div = fieldset.appendChild(document.createElement("div"));
            if ((is_scored ?? false)
                &&
                question.correct_answer_index === question.answers.indexOf(answer)
            ) {
                answer_div.style.backgroundColor = CORRECT_ANSWER_HILIGHT_COLOR;
            };

            const radio = answer_div.appendChild(document.createElement("input"));
            radio.type = "radio";
            radio.name = question.question;
            radio.id = get_answer_id(question, answer);
            radio.value = question.answers.indexOf(answer).toString();
            radio.disabled = (is_scored ?? false);
            // radio.onchange = (e) => this.update_callback(e);
            radio.addEventListener("change", e => this.update_callback(e));
            radio.checked = (selected_answer_index === question.answers.indexOf(answer));

            const radio_label = answer_div.appendChild(document.createElement("label"));
            radio_label.htmlFor = radio.id;
            radio_label.textContent = answer;
        });

        return fragment;
    };

    add_style(root = this.root) {
        const link = document.createElement("link");
        link.href = STYLESHEET;
        link.rel = "stylesheet";
        root.appendChild(link);
    };

    update() {
    };
};
