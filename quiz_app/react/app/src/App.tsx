/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import './App.css';
import { Quiz } from "./quiz/quiz_data";
import general_knowledge from "./general_knowledge_quiz.json";
import { Quiz_Question_Form } from './quiz/Quiz_Question_Form';

function App() {

  let my_quiz: Quiz = general_knowledge;
  console.log(`loaded Quiz: ${Object.values(my_quiz)}`);

  return (
    <>
        {my_quiz.questions.map(question => (
          <Quiz_Question_Form question={question} key={question.question}/>
        ))}
    </>
  );
}

export default App;
