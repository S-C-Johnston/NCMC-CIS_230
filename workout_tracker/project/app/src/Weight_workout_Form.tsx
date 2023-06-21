import { WEIGHT_UNITS } from "./Weight";
import { Weight_workout } from "./Workout";

export function Weight_workout_Form(
    { current_workout: _current_workout }: { current_workout?: Weight_workout; } = {}) {

    function _current_workout_prop_if_defined(property: string): any {
        const EMPTY_STRING = "";
        if (_current_workout && (property in _current_workout)) {
            return _current_workout[property as keyof typeof _current_workout]
        }
        else {
            return EMPTY_STRING
        }
    }

    return (
        <section>
            <form action="">
                <div>
                    <label htmlFor="sets">Sets: </label>
                    <input
                        type="number"
                        name="sets"
                        id="sets"
                        defaultValue={_current_workout_prop_if_defined("sets")}
                    ></input>
                </div>
                <div>
                    <label htmlFor="repetitions">Repetitions: </label>
                    <input
                        type="number"
                        name="repetitions"
                        id="repetitions"
                        defaultValue={_current_workout_prop_if_defined("repetitions")}
                    ></input>
                </div>
                <div>
                    <label htmlFor="weight_quantity">Weight: </label>
                    <input
                        type="number"
                        name="weight_quantity"
                        id="weight_quantity"
                        defaultValue={_current_workout_prop_if_defined("weight_quantity")}
                    ></input>
                </div>
                <div>
                    <label htmlFor="weight_unit">Unit:</label>
                    <select
                        name="weight_unit"
                        id="weight_unit"
                        defaultValue={_current_workout?.weight_unit}
                    >
                        {
                            Object.values(WEIGHT_UNITS).map((current_unit) => (
                                <option key={current_unit} value={current_unit}>{current_unit}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </section>
    )
}