import { assert } from "console";
import { WEIGHT_UNITS, Weight } from "./Weight";

test('Weight object should have .in_units()', () => {
    const my_weight = new Weight(5, WEIGHT_UNITS.Kilograms);
    expect(my_weight.in_units(WEIGHT_UNITS.Pounds)).toBeTruthy();
    console.log(`${my_weight.quantity} ${my_weight.weight_unit}: `,my_weight.in_units(WEIGHT_UNITS.Pounds));
});

test('Weight should be able to be instantiated by from_Weight()', () => {
    const weight_a = new Weight(5, WEIGHT_UNITS.Kilograms);
    console.log(weight_a);
    const weight_b = Weight.from_Weight(weight_a);
    console.log(weight_b);
    expect(weight_b).toBeInstanceOf(Weight);
});

test('Weight should be able to be instantiated from an object that has the right properties', () => {
    let weightlike_thing = { quantity: 5, weight_unit: WEIGHT_UNITS.Pounds};
    assert(!((weightlike_thing as Weight) instanceof Weight), 'weightlike_thing is an instance of Weight!');
    expect(weightlike_thing as Weight).not.toBeInstanceOf(Weight);
    console.log(`weightlike_thing is an instance of Weight?: ${weightlike_thing instanceof Weight}`);

    const weight_a = Weight.from_Weight(weightlike_thing as Weight);
    expect(weight_a).toBeInstanceOf(Weight);
    assert(weight_a instanceof Weight, 'weight_a is not an instance of Weight!');
    console.log('weight_a: ', weight_a);


    const weight_b = Weight.from_Weight({quantity: 7} as Weight);
    expect(weight_b).toBeInstanceOf(Weight);
    assert(weight_b instanceof Weight, 'weight_b is not an instance of Weight!');
    console.log('weight_b: ', weight_b);

    console.log('weight_b.weight: ', weight_b.weight);
    const weight_c = Weight.from_Weight(weight_b.weight);
    expect(weight_c).toBeInstanceOf(Weight);
    assert(weight_c instanceof Weight, 'weight_c is not an instance of Weight!');
    expect(weight_c.quantity).toBe(weight_b.quantity);
    assert(weight_c.quantity == weight_b.quantity, 'weight_c.quantity and weight_b.quantity are not soft-equal');
    console.log('weight_c: ', weight_c);

    const weight_d = Weight.from_Weight(weight_a);
    assert(weight_d == weight_a, 'weight_d is not softequal to weight_a');
    assert(weight_d.quantity == weight_a.quantity, 'weight_d and weight_a do not have the same quantity')
    assert(weight_d.weight_unit == weight_a.weight_unit, 'weight_d and weight_a do not have the same weight_unit');

    const weight_e = Weight.from_Weight({quantity: weight_a.in_units(WEIGHT_UNITS.Kilograms), weight_unit: WEIGHT_UNITS.Kilograms} as Weight);
    assert(weight_e.quantity == weight_a.in_units(WEIGHT_UNITS.Kilograms), 'weight_e.quantity does not softequal weight_a as KG');
});