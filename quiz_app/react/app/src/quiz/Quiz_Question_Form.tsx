import { ChangeEvent, useCallback, useState } from "react";
import { Quiz_Question } from "./quiz_data";

export function Quiz_Question_Form(
    { question }:
        { question: Quiz_Question }
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