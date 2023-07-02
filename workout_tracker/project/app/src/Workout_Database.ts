import { openDB, DBSchema } from "idb";
import { nameof } from "./nameof";
import { Weight_workout } from "./Workout";

const DATABASE_VERSION = 1;
const DEFAULT_DATABASE_NAME = "workouts_database";
const DEFAULT_OBJECT_STORE_NAME = "weight_workouts_store";
export const WORKOUT_DB_INDICES = [
    nameof<Weight_workout>("exercise_name"),
    nameof<Weight_workout>("date")
];

export interface workout_db_schema extends DBSchema {
    weight_workouts_store: {
        key: string;
        value: Weight_workout;
        indexes: any;
        //Opting out of type-checking on this one. Can't set indexes
        //programmatically because this is an interface, and it was screwing with my ability to set indices
    }
}

export async function initialize_Workout_Database(
    db_name: string = DEFAULT_DATABASE_NAME,
    db_store_name: string = DEFAULT_OBJECT_STORE_NAME
) {
    const workout_database = await openDB<workout_db_schema>(db_name, DATABASE_VERSION, {
        upgrade(database, oldVersion, newVersion, transaction, event) {
            const store = database.createObjectStore(
                "weight_workouts_store",
                {
                    keyPath: nameof<Weight_workout>("id")
                }
            );

            store.createIndex(WORKOUT_DB_INDICES[0], WORKOUT_DB_INDICES[0]);
            store.createIndex(WORKOUT_DB_INDICES[1], WORKOUT_DB_INDICES[1], { unique: false });
        },
    });

    return workout_database;
}

// https://web.dev/learn/pwa/offline-data/#creating-and-opening-a-database
// https://github.com/jakearchibald/idb