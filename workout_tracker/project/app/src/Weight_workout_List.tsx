import * as idb from "idb";
import { WORKOUT_DB_INDICES, workout_db_schema } from "./Workout_Database"; 
import { Weight_workout } from "./Workout";
import { Fragment, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { WEIGHT_UNITS, Weight } from "./Weight";

const FIXED_POINT_DECIMAL_PLACES = 2;

type weight_workouts_status = 
    | "loading"
    | "loaded"
    | "undefined"


type Weight_workout_array_update_action = {
    type: "push";
    key: string;
    value: Weight_workout;
} | {
    type: "empty";
};

function Weight_workout_array_reducer(
    weight_workouts: Map<string, Weight_workout>,
    action: Weight_workout_array_update_action
) {
    let _weight_workouts = weight_workouts;
    switch (action.type) {
        case "push": {
            _weight_workouts.set(
                action.key,
                Weight_workout.from_dead_Weight_workout(action.value)
            );
            console.log('pushed: ', action.value);
            break;
        }
        case "empty": {
            _weight_workouts = new Map([]);
            break;
        }
        default: {
            let exhaustive_check: never = action;
            throw new Error(`Unhandled weight_workout_array_update_action: ${exhaustive_check}`);
        }
    };
    return _weight_workouts;
};

export function Weight_workout_List({
    database_handle
}: {
    database_handle: idb.IDBPDatabase<workout_db_schema>
}) {
    const [weight_workouts, dispatch] = useReducer(Weight_workout_array_reducer, new Map());
    const [status, set_status] = useState<weight_workouts_status>("undefined");

    useEffect(() => {
        (async () => {
            set_status("loading")
            const tx = database_handle.transaction("weight_workouts_store", "readonly");
            let cursor = await tx.store.index(WORKOUT_DB_INDICES[1]).openCursor(null,"prev");

            while (cursor) {
                console.log(`found ${cursor.value.id}`);
                dispatch({ type: 'push', key: cursor.value.id, value: cursor.value });
                cursor = await cursor.continue();
            }
            await Promise.all([tx.done]);
            console.log('from Weight_workout_List, recieved tx.done signal');
            set_status("loaded");
        })()
    },
        [database_handle]
    );

    const list_items = Array.from(weight_workouts.values()).map(weight_workout => {
        console.log('should print weight workout: ', weight_workout);
        return (
            <li key={weight_workout.id} >
                <p>Exercise name: {weight_workout.exercise_name}</p>
                <p>Date: {weight_workout.date.toString()}</p>
                <p>Sets: {weight_workout.sets}</p>
                <p>Repetitions: {weight_workout.repetitions}</p>
                <p>Weight: {Number(weight_workout.weight_quantity).toFixed(FIXED_POINT_DECIMAL_PLACES)} {weight_workout.weight_unit}</p>
                <p>Total: {Number(weight_workout.total_weight.quantity).toFixed(FIXED_POINT_DECIMAL_PLACES)} {weight_workout.total_weight.weight_unit}</p>
                <p>---</p>
            </li>
        )
    });

    return (
        <>
            <br />
            <p>---</p>
            <ul className="list-unstyled">
                {status === "loaded" ? list_items : <li> "loading" </li>}
            </ul>
        </>
    );
};