import { Quiz, Quiz_Question, Quiz_score, score_Quiz } from "./quiz/quiz_data.js";
import { general_knowledge } from "./general_knowledge_quiz.js";
import { QUIZ_SCORE_DB_INDICES, initialize_Quiz_score_db, quiz_score_db_schema } from "./database/score_tracking_database.js";
import { IDBPDatabase } from "../../node_modules/idb/build/index.js";

export type model_state = {
    quiz: Quiz;
    is_scored?: boolean;
    score?: Quiz_score;
    selected_answers?: Map<string, number>;
};

export default class Model {
    state: model_state;
    quiz_scores_db_handle_ready: Promise<IDBPDatabase<quiz_score_db_schema>>;
    // https://stackoverflow.com/a/45070748
    // Given that the model inherently relies on the availability of the
    // database handle, this pattern works great.

    constructor({
        quiz = general_knowledge as Quiz
    }: {
        quiz?: Quiz;
    }) {
        this.state = { quiz };
        this.state.is_scored = false;
        this.state.selected_answers = new Map<string, number>(null);

        this.quiz_scores_db_handle_ready = initialize_Quiz_score_db();
        this.quiz_scores_db_handle_ready
            .then(result => console.log(`Database handle attached! ${result}`))
            .catch(error => console.log(`Some error occurred! ${error}`));
    };

    add_selected_answer(question: string, answer_index: number) {
        console.log("About to add to selected_answers");
        this.state.selected_answers!.set(question, answer_index);
        console.log("Added: ", this.state.selected_answers!.get(question));
        return this.state;
    };

    score_quiz() {
        this.state.score = {
            Date: new Date(),
            quiz_name: this.state.quiz.name,
            topic: this.state.quiz.topic,
            percentage_correct: score_Quiz(this.state.quiz, this.state.selected_answers!)
        };
        this.state.is_scored = true;
        this.quiz_scores_db_handle_ready.then((db_handle) => {
            console.log(`database attached, should get transaction!`);
            const tx = db_handle.transaction("quiz_scores_store", "readwrite");
            console.log(`About to add Quiz score to idb!`);
            tx.store.put(this.state.score!)
                .then(response => {
                    console.log(`Added Quiz score to idb! ${response}`)
                })
                .catch(error => {
                    console.log(`Something when wrong trying to add Quiz score to the idb!`)
                    console.log(`${error}`);
                })
                .finally(() => console.log(`A database operation was attempted`));
        });
        return this.state;
    };

};
