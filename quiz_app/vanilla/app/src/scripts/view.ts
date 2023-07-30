import { model_state } from "./model.js";
import { Quiz, Quiz_Question, get_answer_id } from "./quiz/quiz_data.js";
import { CUSTOM_EVENTS } from "./types.js";
import generate_css_safe_id from "./util/generate_css_safe_id.js";

const HEADING_NAME_ID = "quiz_name"
const HEADING_TOPIC_ID = "quiz_topic"
const STYLESHEETS = [
    "./quiz/Quiz_Question_Form.css",
    "./App.css"
];
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
        this.build_form_section = this.curry_fragment_builder_with_id(
            this._build_form_section.bind(this)
        );
        this.build_form = this.curry_fragment_builder_with_id(
            this._build_form.bind(this)
        );
        this.build_score_history_list = this.curry_fragment_builder_with_id(
            this._build_score_history_list.bind(this)
        );
    };

    render(state = this.state, root = this.root) {
        this.add_style(document.head);
        console.log("Building a new element tree!");
        root.replaceChildren(
            this.build_form_section(
                state,
                [
                    this.build_form(state),
                    this.build_score_history_list(state.score_history)
                ])
        );
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
     * @abstract build_form_section is a dummy function prototype which exists
     * primarily to allow typechecking to occur and provide a public interface
     * representing the intended use of the curried private function.
     * @param state
     * @param child_fragments
     * @returns DocumentFragment
     */
    build_form_section(
        state = this.state,
        child_fragments?: DocumentFragment[]
    ): DocumentFragment {
        return new DocumentFragment()
    };

    private _build_form_section(uuid: string, state = this.state, child_fragments?: DocumentFragment[]) {
        const fragment = document.createDocumentFragment();
        const section = fragment.appendChild(document.createElement("section"));
        section.id = uuid ? uuid : "";
        const name = section.appendChild(document.createElement("h1"));
        name.textContent = state.quiz.name;
        name.id = HEADING_NAME_ID;
        name.className = "App";

        const topic = section.appendChild(document.createElement("h2"));
        topic.textContent = state.quiz.topic;
        topic.id = HEADING_TOPIC_ID;
        topic.className = "App";

        child_fragments?.forEach(elem => fragment.appendChild(elem));

        return fragment;
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

        const form = fragment.appendChild(document.createElement("form"));
        form.id = uuid;

        state.quiz.questions.map((question) => {
            form.appendChild(this.build_fieldset({
                question: question,
                selected_answers: state.selected_answers,
                is_scored: state.is_scored
            }));
        });

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "SCORE!";
        button.onclick = e => this.update_callback(e);
        button.className += "Score-button";
        button.disabled = state.is_scored ?? false;

        form.appendChild(button);

        const score = document.createElement("h3");
        score.className = "App";
        score.textContent = `Score: ${state.score?.percentage_correct ?? "?"}`;
        form.appendChild(score);

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

    /**
     * @abstract build_score_history_list is a dummy function prototype which exists primarily
     * to provide typechecking and a public interface to the intended use of the
     * curried function. It should be reassigned in the constructor.
     * @param state
     * @returns DocumentFragment
     */
    build_score_history_list(score_history = this.state.score_history): DocumentFragment {
        return new DocumentFragment();
    };

    private _build_score_history_list(uuid: string, score_history = this.state.score_history) {
        const fragment = document.createDocumentFragment();
        if (!score_history) {
            return fragment;
        }

        const ul = fragment.appendChild(document.createElement("ul"));
        ul.id = uuid;
        Array.from(score_history.entries()).map(([key, value]) => {
            let li = ul.appendChild(document.createElement("li"));
            li.id = generate_css_safe_id(key.toString());
            li.appendChild(document.createElement("p"))
                .textContent = `Date: ${value.Date.toString()}`;
            li.appendChild(document.createElement("p"))
                .textContent = `Quiz name: ${value.quiz_name}`;
            li.appendChild(document.createElement("p"))
                .textContent = `Quiz topic: ${value.topic}`;
            li.appendChild(document.createElement("p"))
                .textContent = `Quiz score: ${value.percentage_correct}`;
        });

        return fragment;
    };

    add_style(root = this.root) {
        STYLESHEETS.forEach(stylesheet => {
            const link = document.createElement("link");
            link.href = stylesheet;
            link.rel = "stylesheet";
            root.appendChild(link);
        });
    };

    update() {
    };
};
