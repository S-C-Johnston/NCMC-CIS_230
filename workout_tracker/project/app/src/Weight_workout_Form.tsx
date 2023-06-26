/* eslint-disable react/jsx-pascal-case */
import { useReducer, useState } from "react";
import { WEIGHT_UNITS, Weight } from "./Weight";
import { Weight_workout, Weight_workout_reducer } from "./Workout";
import { Weight_workout_Form_inputs } from "./Weight_workout_Form/inputs";

export function Weight_workout_Form(
    { current_workout = new Weight_workout() }: { current_workout?: Weight_workout; } = {}
) {
    const [_current_workout, dispatch] = useReducer(Weight_workout_reducer, current_workout);
    const FIXED_POINT_DECIMAL_PLACES: number = 2; //For any display wonkiness with JS numbers, use number.toFixed(fixed_point);

    return (
        <section>
            <form action="">
                <div>
                    <Weight_workout_Form_inputs
                    name_and_id="exercise_name"
                    type="text"
                    label=""
                    weight_workout_obj_field={_current_workout?.exercise_name}
                    onchange_dispatch={dispatch}
                    dispatch_type="exercise_name"
                    default_value="exercise name"
                    />
                </div>
                <div>
                    <Weight_workout_Form_inputs
                    name_and_id="sets"
                    type="number"
                    label="Sets: "
                    weight_workout_obj_field={_current_workout?.sets}
                    onchange_dispatch={dispatch}
                    dispatch_type="sets"
                    default_value={0}
                    />
                </div>
                <div>
                    <Weight_workout_Form_inputs
                    name_and_id="repetitions"
                    type="number"
                    label="Repetitions: "
                    weight_workout_obj_field={_current_workout?.repetitions}
                    onchange_dispatch={dispatch}
                    dispatch_type="repetitions"
                    default_value={0}
                    />
                </div>
                <div>
                    <Weight_workout_Form_inputs
                    name_and_id="weight_quantity"
                    type="number"
                    label="Weight: "
                    weight_workout_obj_field={_current_workout?.weight_quantity}
                    onchange_dispatch={dispatch}
                    dispatch_type="weight_quantity"
                    default_value={0}
                    options={{step: 0.1}}
                    />
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
                        value={_current_workout?.weight_unit ?? WEIGHT_UNITS.Kilograms}
                        onChange={(e) => dispatch({ type: "weight_unit", value: e.target.value as WEIGHT_UNITS })}
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