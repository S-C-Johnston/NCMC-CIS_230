import { Quiz } from "./quiz/quiz_data.js";
import { general_knowledge } from "./general_knowledge_quiz.js";

export default class Model {
    state: Quiz;
    constructor(
        state: Quiz = general_knowledge as Quiz
    ) {
        this.state = state;
    };
};