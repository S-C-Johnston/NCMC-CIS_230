import { Weight, WEIGHT_UNITS } from "./Weight";

interface Workout {
    readonly id: Date;
    exercise_name: string;
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
        this.update_total_weight();
        return this.my_weight;
    }

    get total_weight(): Weight {
        this.update_total_weight()
        return  this.my_total_weight;
    }

    private update_total_weight(): Weight {
        this.my_total_weight.weight_unit = this.my_weight.weight_unit;
        this.my_total_weight.quantity = (
            this.my_weight.in_units(this.my_total_weight.weight_unit)
            * this.my_sets
            * this.my_repetitions
        );
        return this.my_total_weight;
    }
}