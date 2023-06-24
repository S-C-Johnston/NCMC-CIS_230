import { WEIGHT_UNITS, Weight } from "./Weight";
import { Weight_workout } from "./Workout";

test('Weight_workout should be instantiated from object with appropriate properties', () => {
    const Weight_workout_like: Partial<Weight_workout> = {
        sets: 3,
        repetitions: 12,
        weight: { quantity: 40, weight_unit: WEIGHT_UNITS.Pounds } as Weight,
        exercise_name: "Dumbell bench press"
    };
    const Weight_workout_a = new Weight_workout(Weight_workout_like);
    expect(Weight_workout_a).toBeInstanceOf(Weight_workout);
});

test('Weight_workout should be instantiated with a scattering of properties',() => {
    const weight_workout_a = new Weight_workout({
        weight: { quantity: 50 } as Weight,
        id: new Date()
    });
    expect(weight_workout_a).toBeInstanceOf(Weight_workout);
    console.log('weight_workout_a: ',weight_workout_a);
});