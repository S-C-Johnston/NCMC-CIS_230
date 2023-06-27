import { Weight_workout_update_action } from "../Workout"

export function Weight_workout_Form_inputs({
    name_and_id,
    type,
    default_value,
    label,
    weight_workout_obj_field,
    onchange_dispatch,
    dispatch_type,
    options
}: {
    name_and_id: string,
    type: "number" | "text",
    default_value: unknown,
    label: string,
    weight_workout_obj_field: any,
    onchange_dispatch(dispatch_action: Weight_workout_update_action): void,
    dispatch_type: Weight_workout_update_action["type"],
    options?: {}
}
) {
    return (
        <>
            <label
                htmlFor={name_and_id}
                className="form-label"
            >{label ?? ""}</label>
            <input
                name={name_and_id}
                id={name_and_id}
                className="form-control"
                type={type}
                placeholder={default_value as string}
                value={weight_workout_obj_field}
                onChange={e => onchange_dispatch({ type: dispatch_type, value: e.target.value } as Weight_workout_update_action)}
                {...options}
            />
        </>
    )
}