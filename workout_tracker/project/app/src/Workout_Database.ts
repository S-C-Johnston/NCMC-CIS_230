import { openDB } from "idb";

const DATABASE_VERSION = 1;
const DEFAULT_DATABASE_NAME = "workouts"

export async function initialize_Workout_Database(db_name: string = DEFAULT_DATABASE_NAME) {
    const database = openDB(db_name, DATABASE_VERSION,

    );
}

// https://web.dev/learn/pwa/offline-data/#creating-and-opening-a-database
// https://github.com/jakearchibald/idb