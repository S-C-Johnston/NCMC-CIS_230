import { openDB, DBSchema } from "idb";
import { nameof } from "../util/nameof";
import { Quiz, Quiz_score } from "../quiz/quiz_data";

const DATABASE_VERSION = 1;
const DEFAULT_DATABASE_NAME = "quiz_scores_database";
const DEFAULT_OBJECT_STORE_NAME = "quiz_scores_store";
export const QUIZ_SCORE_DB_INDICES = [
    nameof<Quiz_score>("Date"),
    nameof<Quiz_score>("quiz_name"),
    nameof<Quiz_score>("topic")
];

export interface quiz_score_db_schema extends DBSchema {
    quiz_scores_store: {
        key: string;
        value: Quiz_score;
        indexes: any;
        //Opting out of type-checking on this one. Can't set indexes
        //programmatically because this is an interface, and it was screwing with my ability to set indices
    }
}

export async function initialize_Quiz_score_db(
    db_name: string = DEFAULT_DATABASE_NAME,
    db_store_name: string = DEFAULT_OBJECT_STORE_NAME
) {
    const quiz_scores_database = await openDB<quiz_score_db_schema>(db_name, DATABASE_VERSION, {
        upgrade(database, oldVersion, newVersion, transaction, event) {
            const store = database.createObjectStore(
                "quiz_scores_store",
                {
                    autoIncrement: true
                }
            );

            store.createIndex(QUIZ_SCORE_DB_INDICES[0], QUIZ_SCORE_DB_INDICES[0], { unique: false });
            store.createIndex(QUIZ_SCORE_DB_INDICES[1], QUIZ_SCORE_DB_INDICES[1], { unique: false });
            store.createIndex(QUIZ_SCORE_DB_INDICES[2], QUIZ_SCORE_DB_INDICES[2], { unique: false });
        },
    });

    return quiz_scores_database;
}

// https://web.dev/learn/pwa/offline-data/#creating-and-opening-a-database
// https://github.com/jakearchibald/idb