/* eslint-disable react/jsx-pascal-case */
import React, { ChangeEvent, useCallback, useState } from 'react';
import './App.css';
import { Quiz, score_Quiz } from "./quiz/quiz_data";
import general_knowledge from "./general_knowledge_quiz.json";
import { Quiz_Question_Form } from './quiz/Quiz_Question_Form';

function App() {

  let my_quiz: Quiz = general_knowledge;
  console.log(`loaded Quiz: ${Object.values(my_quiz)}`);

  const [is_scored, set_is_scored] = useState(false);
  const [final_score, set_final_score] = useState<string>();
  const handle_score_click = useCallback(() => {
    set_final_score(score_Quiz(my_quiz, selected_answers));
    set_is_scored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selected_answers, select_answer] = useState<Map<string, number>>(new Map());
  const handle_radio_click = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    select_answer(
      selected_answers =>
        selected_answers.set(e.target.name, Number(e.target.value))
    );
    console.log(selected_answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h1 className="App">{my_quiz.name}</h1>
      <h2 className="App">{my_quiz.topic}</h2>
      {my_quiz.questions.map(question => (
        <Quiz_Question_Form
          question={question}
          radio_callback={handle_radio_click}
          is_scored={is_scored}
          key={question.question}
        />
      ))}
        <button
          className="Score-button"
          type="button"
          onClick={handle_score_click}
          disabled={is_scored}
        >
          SCORE!
        </button>
      <h3 className="App">Score: {is_scored ? final_score : "?"}</h3>
    </section>
  );
};

export default App;
