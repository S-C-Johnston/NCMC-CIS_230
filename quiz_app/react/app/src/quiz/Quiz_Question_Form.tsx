import { ChangeEvent } from "react";
import { Quiz_Question } from "./quiz_data";

export function Quiz_Question_Form(
    {
        question,
        radio_callback,
    }:
        {
            question: Quiz_Question;
            radio_callback: (e: ChangeEvent<HTMLInputElement>) => void;
        }
) {

    return (
        <>
            <form action="">
                <fieldset>
                    <legend>{question.question}</legend>
                    {question.answers.map(answer => (
                        <div key={answer}>
                            <input
                                type="radio"
                                name={question.question}
                                id={question.answers.indexOf(answer).toString()}
                                value={question.answers.indexOf(answer).toString()}
                                onChange={e => radio_callback(e)}
                            />
                            <label htmlFor={question.answers.indexOf(answer).toString()}>
                                {answer}
                            </label>
                        </div>
                    ))}
                </fieldset>
            </form>
        </>
    )
}