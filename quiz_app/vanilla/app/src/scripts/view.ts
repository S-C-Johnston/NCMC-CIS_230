import { Quiz, Quiz_Question } from "./quiz/quiz_data.js";
import { CUSTOM_EVENTS } from "./types.js";

const HEADING_NAME_ID = "quiz_name"
const HEADING_TOPIC_ID = "quiz_topic"
const STYLESHEET = "./quiz/Quiz_Question_Form.css"

function get_answer_id (question: Quiz_Question, answer: string) {
    return `${question.question}${question.answers.indexOf(answer).toString()}`
};

export default class View {
    root: Element;
    state: Quiz;
    constructor(
        state: Quiz
    ) {
        this.root = document.querySelector("#root") ?? document.body;
        this.state = state;
    };

    render(state = this.state, root = this.root) {
        root.appendChild(this.build_form(state));
        this.style(root);
    };

    build_form(state = this.state) {
        const fragment = document.createDocumentFragment();
        const name = fragment.appendChild(document.createElement("h1"));
        name.textContent = state.name;
        name.id = HEADING_NAME_ID;

        const topic = fragment.appendChild(document.createElement("h2"));
        topic.textContent = state.topic;
        topic.id = HEADING_TOPIC_ID;

        const form = fragment.appendChild(document.createElement("form"));
        state.questions.map(question => {
            form.appendChild(this.build_fieldset(question));
        });

        return fragment;
    };

    build_fieldset(question: Quiz_Question) {
        const fragment = document.createDocumentFragment();
        const fieldset = fragment.appendChild(document.createElement("fieldset"));
        fieldset.id = question.question;

        const legend = fieldset.appendChild(document.createElement("legend"));
        legend.textContent = question.question;

        question.answers.map(answer => {
            const answer_div = fieldset.appendChild(document.createElement("div"));

            const radio = answer_div.appendChild(document.createElement("input"));
            radio.type = "radio";
            radio.name = question.question;
            radio.id = get_answer_id(question, answer);
            radio.value = question.answers.indexOf(answer).toString();

            const radio_label = answer_div.appendChild(document.createElement("label"));
            radio_label.textContent = answer;
        });

        return fragment;
    };

    style(root = this.root) {
        const link = document.createElement("link");
        link.href = STYLESHEET;
        link.rel = "stylesheet";
        root.appendChild(link);
    };

    update() {
    };
};
