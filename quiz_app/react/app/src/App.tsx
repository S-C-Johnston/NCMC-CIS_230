import React from 'react';
import './App.css';
import { Quiz } from "./quiz/quiz_data";
import general_knowledge from "./general_knowledge_quiz.json";

function App() {

  let my_quiz: Quiz = general_knowledge;
  console.log(`loaded Quiz: ${Object.values(my_quiz)}`);

  return (
    <>
    <ul>
        {my_quiz.questions.map(question => (
          <li key={crypto.randomUUID()}>
            {question.question}
            <form action="">
              <fieldset>
                {question.answers.map(answer => (
                  <>
                    <input
                      type="radio"
                      name={question.question}
                      id={question.answers.indexOf(answer).toString()}
                      value={question.answers.indexOf(answer).toString()}
                    />
                    <label htmlFor={question.answers.indexOf(answer).toString()}>
                      {answer}</label>
                  </>
                ))}
              </fieldset>
            </form>
            {question.correct_answer_index}
          </li>
        ))}
    </ul>
    </>
  );
}

export default App;
