import "./Quiz_Question_Form.css"
import { ChangeEvent } from "react";
import { Quiz_Question } from "./quiz_data";

function get_answer_id (question: Quiz_Question, answer: string) {
    return `${question.question}${question.answers.indexOf(answer).toString()}`
};

export function Quiz_Question_Form(
    {
        question,
        radio_callback,
        is_scored,
    }:
        {
            question: Quiz_Question;
            radio_callback: (e: ChangeEvent<HTMLInputElement>) => void;
            is_scored: boolean;
        }
) {

    return (
        <>
            <form action="">
                <fieldset>
                    <legend>{question.question}</legend>
                    {question.answers.map(answer => (
                        <div
                            key={answer}
                            style={is_scored &&
                                question.correct_answer_index === question.answers.indexOf(answer)
                                ? { backgroundColor: "lightgreen" }
                                : {}
                            }
                        >
                            <input
                                type="radio"
                                name={question.question}
                                id={get_answer_id(question, answer)}
                                value={question.answers.indexOf(answer).toString()}
                                onChange={e => radio_callback(e)}
                                disabled={is_scored}
                            />
                            <label
                                htmlFor={get_answer_id(question, answer)}
                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                </fieldset>
            </form>
        </>
    );
};