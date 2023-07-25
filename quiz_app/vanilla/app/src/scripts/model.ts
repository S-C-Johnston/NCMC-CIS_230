import { Quiz, Quiz_Question, Quiz_score } from "./quiz/quiz_data.js";
import { general_knowledge } from "./general_knowledge_quiz.js";

export type model_state = {
    quiz: Quiz;
    is_scored?: boolean;
    score?: Quiz_score;
    selected_answers?: Map<string, number>;
};

export default class Model {
    state: model_state;
    constructor({
        quiz = general_knowledge as Quiz
    }: {
        quiz?: Quiz;
    }) {
        this.state = { quiz };
        this.state.is_scored = false;
        this.state.selected_answers = new Map<string, number>(null);
    };

    add_selected_answer(question: string, answer_index: number) {
        console.log("About to add to selected_answers");
        this.state.selected_answers!.set(question, answer_index);
        console.log("Added: ", this.state.selected_answers!.get(question));
        return this.state;
    };

};
