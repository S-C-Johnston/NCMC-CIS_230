/* eslint-disable react/jsx-pascal-case */
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Quiz, score_Quiz } from "./quiz/quiz_data";
import general_knowledge from "./general_knowledge_quiz.json";
import { Quiz_Question_Form } from './quiz/Quiz_Question_Form';
import * as IDB from "idb"; // because I'm lazy
import { initialize_Quiz_score_db, quiz_score_db_schema } from './database/score_tracking_database';
import Quiz_score_history_list from './stats/Quiz_score_history_list';

function App() {
    let my_quiz: Quiz = general_knowledge;
    console.log(`loaded Quiz: ${Object.values(my_quiz)}`);

    const quiz_scores_db_handle = useRef<IDB.IDBPDatabase<quiz_score_db_schema> | null>(null);
    const [database_attached, set_database_attached] = useState<boolean>(false)
    useEffect(() => {
        (async () => {
            quiz_scores_db_handle.current = await initialize_Quiz_score_db()
            console.log(`Database attached!`);
            set_database_attached(true);
        })()
    }, [])

    const [is_scored, set_is_scored] = useState(false);
    const [final_score, set_final_score] = useState<string>();
    const handle_score_click = useCallback(() => {
        set_final_score(score_Quiz(my_quiz, selected_answers));
        set_is_scored(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**  This whole callback is invoked every time one of the members of the
    *  dependency array changes. The invocation guard just avoids that whole
    *  shebang until the conditions we need to be true, are. This technique is
    *  a little clunkier than I want, but absolutely avoids any weird async
    *  race conditions that I was experiencing earlier. I *wanted* all this to
    *  be part of the handle_score_click callback defined above, but there was
    *  just no way to guarantee that the callback would be fired, as an event
    *  handler for user input, when and only when the database was attached. This
    *  will fire, guaranteed, after both is_scored is changed, and after the
    *  database handle is attached.
    */
    useEffect(() => {
        if (!(database_attached && is_scored)) {
            // console.log(`database attached: ${database_attached} && is_scored: ${is_scored}`);
            return;
        };
        console.log(`database attached, should get transaction!`);
        const tx = quiz_scores_db_handle.current!.transaction("quiz_scores_store", "readwrite");
        console.log(`About to add Quiz score to idb!`);
        tx.store.put({
            Date: new Date(),
            quiz_name: my_quiz.name,
            topic: my_quiz.topic,
            percentage_correct: final_score!
        })
            .then(response => {
                console.log(`Added Quiz score to idb! ${response}`)
            })
            .catch(error => {
                console.log(`Something when wrong trying to add Quiz score to the idb!`)
                console.log(`${error}`);
            })
            .finally(() => console.log(`A database operation happened and finished`));
    },
        [
            database_attached,
            final_score,
            my_quiz,
            is_scored
        ]);

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
            {database_attached
                ? <Quiz_score_history_list database_handle={quiz_scores_db_handle.current!} />
                : "Database loading..."
            }
        </section>
    );
};

export default App;
