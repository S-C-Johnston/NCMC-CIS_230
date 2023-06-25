import { useState } from "react";
import { WEIGHT_UNITS, Weight } from "./Weight";
import { Weight_workout } from "./Workout";

export function Weight_workout_Form(
    { current_workout = new Weight_workout() }: { current_workout?: Weight_workout; } = {}
) {
    const [_current_workout, set_current_workout] = useState(new Weight_workout(current_workout));
    const FIXED_POINT_DECIMAL_PLACES: number = 2; //For any display wonkiness with JS numbers, use number.toFixed(fixed_point);

    function update_exercise_name(e: React.ChangeEvent<HTMLInputElement>) {
        return set_current_workout(previous => {
            previous.exercise_name = e.target.value;
            return new Weight_workout(previous)
        });
    };

    function update_sets(e: React.ChangeEvent<HTMLInputElement>) {
        return set_current_workout(previous => {
            previous.sets = e.target.value as unknown as number;
            return new Weight_workout(previous);
        });
    };

    function update_repetitions(e: React.ChangeEvent<HTMLInputElement>) {
        return set_current_workout(previous => {
            previous.repetitions = e.target.value as unknown as number;
            return new Weight_workout(previous);
        });
    };

    function update_weight_quantity(e: React.ChangeEvent<HTMLInputElement>) {
        return set_current_workout(previous => {
            previous.weight_quantity = e.target.value as unknown as number;
            return new Weight_workout(previous);
        });
    };

    function update_weight_unit(e: React.ChangeEvent<HTMLSelectElement>) {
        return set_current_workout(previous => {
            previous.weight_unit = e.target.value as WEIGHT_UNITS;
            // The whole `as keyof typeof enum` trick is not
            // necessary here, and it doesn't work anyway.
            // keyof typeof is useful when the
            // programmatically accessed .index is the value
            // you're selecting. Here, the value is pulling
            // from the Enum's values, so it'll just index
            // off those fine. It's bizarre, I'm trying not
            // to cross my eyes too hard about it.
            return new Weight_workout(previous);
        });
    };

    return (
        <section>
            <form action="">
                <div>
                    <label
                        htmlFor="exercise_name"
                        className="form-label"
                    >
                        <input
                            name="exercise_name"
                            id="exercise_name"
                            className="form-control"
                            type="text"
                            value={_current_workout?.exercise_name}
                            placeholder="exercise name"
                            onChange={e => update_exercise_name(e)}
                        />
                    </label>
                </div>
                <div>
                    <label
                        htmlFor="sets"
                        className="form-label"
                    >Sets: </label>
                    <input
                        name="sets"
                        id="sets"
                        className="form-control"
                        type="number"
                        value={_current_workout?.sets ?? 0}
                        onChange={(e) => update_sets(e)}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor="repetitions"
                        className="form-label"
                    >Repetitions: </label>
                    <input
                        name="repetitions"
                        id="repetitions"
                        className="form-control"
                        type="number"
                        value={_current_workout?.repetitions ?? 0}
                        onChange={(e) => update_repetitions(e)}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor="weight_quantity"
                        className="form-label"
                    >Weight: </label>
                    <input
                        name="weight_quantity"
                        id="weight_quantity"
                        className="form-control"
                        type="number"
                        step="0.1"
                        value={_current_workout?.weight_quantity ?? 0}
                        onChange={(e) => update_weight_quantity(e)}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor="weight_unit"
                        className="form-label"
                    >Unit: </label>
                    <select
                        name="weight_unit"
                        id="weight_unit"
                        className="form-select"
                        defaultValue={_current_workout?.weight_unit ?? WEIGHT_UNITS.Kilograms}
                        onChange={(e) => update_weight_unit(e)}
                    >
                        {
                            Object.values(WEIGHT_UNITS).map((current_unit) => (
                                <option key={current_unit} value={current_unit}>{current_unit}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <p>
                        Total weight: {Number(_current_workout.total_weight.quantity.toFixed(FIXED_POINT_DECIMAL_PLACES))} {_current_workout.total_weight.weight_unit}
                    </p>
                </div>
            </form>
        </section>
    )
}