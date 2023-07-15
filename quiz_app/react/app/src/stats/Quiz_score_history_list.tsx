import { IDBPDatabase } from "idb"
import { useEffect, useReducer, useState } from "react"
import { QUIZ_SCORE_DB_INDICES, quiz_score_db_schema } from "../database/score_tracking_database"
import { Quiz_score } from "../quiz/quiz_data";

enum QUIZ_SCORE_HISTORY_STATUS {
    loading = "loading",
    undefined = "undefined",
    loaded = "loaded",
};

type quiz_score_history_action = {
    type: "Insert";
    key: number;
    value: Quiz_score;
} | {
    type: "Clear";
};

function quiz_score_history_reducer(
    current_quiz_score_history: Map<number, Quiz_score>,
    action: quiz_score_history_action
) {
    let _quiz_score_history = current_quiz_score_history;
    switch (action.type) {
        case "Insert": {
            _quiz_score_history.set(action.key, action.value);
            break;
        }
        case "Clear": {
            _quiz_score_history.clear();
            break;
        }
        default: {
            const exhaustive_check: never = action;
            console.log(`Unsupported actionf or quiz_score_history_reducer ${exhaustive_check}`);
        };
    };
    return _quiz_score_history;
};

export default function Quiz_score_history_list({
    database_handle
}: {
    database_handle: IDBPDatabase<quiz_score_db_schema>
}
) {
    const [quiz_score_history, dispatch] = useReducer(quiz_score_history_reducer, new Map());
    const [status, set_status] = useState<QUIZ_SCORE_HISTORY_STATUS>(QUIZ_SCORE_HISTORY_STATUS.undefined)

    useEffect(() => {
        (async () => {
            set_status(QUIZ_SCORE_HISTORY_STATUS.loading);
            const tx = database_handle.transaction("quiz_scores_store", "readonly");
            let cursor = await tx.store.index(QUIZ_SCORE_DB_INDICES[0]).openCursor(null, "prev");

            while (cursor) {
                console.log(`found ${Object.values(cursor.value)} with key ${cursor.primaryKey}`);
                dispatch({
                    type: "Insert",
                    key: cursor.primaryKey as unknown as number,
                    value: cursor.value
                });
                cursor = await cursor.continue();
            }
            await Promise.all([tx.done]);
            console.log('from Quiz_score_history_list, recieved tx.done signal');
            set_status(QUIZ_SCORE_HISTORY_STATUS.loaded);

        })()
    }, [database_handle]);

    const score_list = Array.from(quiz_score_history.entries()).map(([key, value]) => (
        <li key={key} >
            <p>Date: {value.Date.toString()}</p>
            <p>Quiz name: {value.quiz_name}</p>
            <p>Quiz topic: {value.topic}</p>
            <p>Quiz score: {value.percentage_correct}</p>
        </li>
    ));

    return (
        <ul>
            {status === QUIZ_SCORE_HISTORY_STATUS.loaded
                ? score_list
                : ""
            }
        </ul>
    )
};