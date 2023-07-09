interface Quiz_Question {
    question: string;
    answers: string[];
    correct_answer_index: number;
};

export interface Quiz {
    name: string;
    topic: string;
    questions: Quiz_Question[];
};