import { Weight, WEIGHT_UNITS } from "./Weight";

interface Workout {
    readonly id: Date;
    exercise_name: string;
}

/** Weight_workout_update_action
 * This discriminated union type is designed for use with the react
 * `useReducer()` dispatch function, to define the acceptable input parameters.
 * The inline union syntax `|` allows me to discriminate in the typesystem on
 * the "type" of type to determine what type value should be. With the correct
 * keywords, such as a type assertion, the typesystem will supply errors if the
 * wrong or incomplete parameters are passed or assessed.
 */
export type Weight_workout_update_action = {
    type: "exercise_name",
    value: string
} | {
    type: "weight_unit",
    value: WEIGHT_UNITS
} | {
    type: (
        "sets"
        | "repetitions"
        | "weight_quantity"
    ),
    value: number
}

export function Weight_workout_reducer(
    previous_Weight_workout: Weight_workout,
    action: Weight_workout_update_action
) {
    let current_Weight_workout = new Weight_workout(previous_Weight_workout);
    switch (action.type) {
        case 'exercise_name': {
            current_Weight_workout.exercise_name = action.value;
            break;
        }
        case 'repetitions': {
            current_Weight_workout.repetitions = action.value;
            break;
        }
        case 'sets': {
            current_Weight_workout.sets = action.value;
            break;
        }
        case 'weight_quantity': {
            current_Weight_workout.weight_quantity = action.value;
            break;
        }
        case 'weight_unit': {
            current_Weight_workout.weight_unit = action.value;
            // The whole `as keyof typeof enum` trick is not
            // necessary here, and it doesn't work anyway.
            // keyof typeof is useful when the
            // programmatically accessed .index is the value
            // you're selecting. Here, the value is pulling
            // from the Enum's values, so it'll just index
            // off those fine. It's bizarre, I'm trying not
            // to cross my eyes too hard about it.
            break;
        }
        default: {
            const exhaustive_check: never = action;
            throw new Error(`Unhandled Weight_workout_update_action for type ${exhaustive_check}`);
        }
    }
    return current_Weight_workout;
}

export class Weight_workout implements Workout {
    readonly id: Date;
    private my_sets: number;
    private my_repetitions: number;
    exercise_name: string;
    private my_weight: Weight;
    private my_total_weight: Weight;

    constructor({
        sets = 0,
        repetitions = 0,
        weight = new Weight(),
        exercise_name = "",
        id = new Date()
    }: Partial<Weight_workout> = {}
    ) {
        this.my_sets = sets;
        this.my_repetitions = repetitions;
        this.my_weight = Weight.from_Weight(weight)

        this.my_total_weight = new Weight(
            (this.my_weight.quantity
                * this.my_sets
                * this.my_repetitions),
            this.my_weight.weight_unit
        );

        this.exercise_name = exercise_name ?? "";
        this.id = id ? id : new Date();
    }

    get sets(): number {
        return this.my_sets;
    }

    set sets(new_sets: number) {
        this.my_sets = new_sets;
        this.update_total_weight();
    }

    get repetitions(): number {
        return this.my_repetitions;
    }

    set repetitions(new_repetitions: number) {
        this.my_repetitions = new_repetitions;
        this.update_total_weight();
    }

    set weight_quantity(quantity: number) {
        this.my_weight.quantity = quantity;
        this.update_total_weight();
    }

    get weight_quantity(): number {
        return this.my_weight.quantity;
    }

    set weight_unit(weight_unit: WEIGHT_UNITS) {
        this.my_weight.weight_unit = weight_unit;
        this.update_total_weight();
    }

    get weight_unit(): WEIGHT_UNITS {
        return this.my_weight.weight_unit;
    }

    get weight(): Weight {
        return this.my_weight;
    }

    get total_weight(): Weight {
        return  this.my_total_weight;
    }

    private update_total_weight(): Weight {
        this.my_total_weight.weight_unit = this.weight_unit as WEIGHT_UNITS;
        this.my_total_weight.quantity = (
            this.my_weight.in_units(this.my_total_weight.weight_unit)
            * this.my_sets
            * this.my_repetitions
        );
        return this.my_total_weight;
    }
}