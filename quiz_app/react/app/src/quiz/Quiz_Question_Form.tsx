import { ChangeEvent, useCallback, useState } from "react";
import { Quiz_Question } from "./quiz_data";

export function Quiz_Question_Form(
    { question }:
        { question: Quiz_Question }
) {
    const [selected_answer, select_answer] = useState<String>();
    const handle_radio_click = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        select_answer(e.target.value);
    }, []);

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
                                onChange={e => handle_radio_click(e)}
                            />
                            <label htmlFor={question.answers.indexOf(answer).toString()}>
                                {answer}
                            </label>
                        </div>
                    ))}
                </fieldset>
            </form>
            <p>Selected answer: {selected_answer}</p>
        </>
    )
}