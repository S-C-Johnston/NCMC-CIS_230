import generate_css_safe_id from "../util/generate_css_safe_id.js";

const NUMERIC_FIXED_DECIMAL_PLACES = 2;

export interface Quiz_score {
    quiz_name: string;
    topic: string;
    Date: Date;
    percentage_correct: string;
};

export interface Quiz_Question {
    question: string;
    answers: string[];
    correct_answer_index: number;
};

export interface Quiz {
    name: string;
    topic: string;
    questions: Quiz_Question[];
};


export function score_Quiz(
    quiz: Quiz,
    selected_answers: Map<string, number>
) {
    const answer_count = quiz.questions.length;
    let correct_answers = 0;
    quiz.questions.forEach(element => {
        if (selected_answers.has(element.question)
            && selected_answers.get(element.question) === element.correct_answer_index
        ) {
            correct_answers++;
        };
    });
    const score = (correct_answers / answer_count).toFixed(NUMERIC_FIXED_DECIMAL_PLACES);
    return score;
};

export function get_answer_id (question: Quiz_Question, answer: string) {
    return `${generate_css_safe_id(question.question)}${question.answers.indexOf(answer).toString()}`
};
