export enum WEIGHT_UNITS {
    Pounds = "LB",
    Kilograms = "KG"
}
enum WEIGHT_CONVERSION {
    KG_TO_LB = 2.204623, /* KG:LB 2.204523*/
    LB_TO_KG = 0.4535924 /* LB:KG 0.4535924 */
}

const FIXED_POINT_DECIMAL_PLACES: number = 2; //For any display wonkiness with JS numbers, use number.toFixed(fixed_point);

export class Weight {
    private my_weight_unit: WEIGHT_UNITS;
    private my_quantity: number;

    constructor(
        quantity: number = 0,
        weight_unit: WEIGHT_UNITS = WEIGHT_UNITS.Kilograms
    ) {
        this.my_quantity = quantity;
        this.my_weight_unit = weight_unit;
    }

    static from_Weight(obj: Weight): Weight{
        const quantity = (obj?.quantity ?? obj.my_quantity ?? 0);
        const weight_unit: WEIGHT_UNITS = (obj?.weight_unit ?? obj.my_weight_unit ?? WEIGHT_UNITS.Kilograms);
        return new Weight(quantity, weight_unit);
    };

    static from_dead_Weight(input_Weight: Weight): Weight {
        return new Weight(input_Weight.my_quantity, input_Weight.my_weight_unit)
    };

    get weight(): Weight {
        return this;
    }

    get quantity(): number {
        return this.my_quantity;
    }

    set quantity(quantity: number) {
        this.my_quantity = quantity;
    }

    get weight_unit(): WEIGHT_UNITS {
        return this.my_weight_unit;
    }

    set weight_unit(weight_unit: WEIGHT_UNITS) {
        this.my_quantity = this.in_units(weight_unit);
        this.my_weight_unit = weight_unit;
    }

    public in_units(weight_unit: WEIGHT_UNITS): number {
        let weight_in_units: number;
        if (weight_unit === this.my_weight_unit) {
            weight_in_units = this.my_quantity;
        }
        else {
            let unit_conversion: string = `${this.my_weight_unit}_TO_${weight_unit}`;
            weight_in_units = Number((this.my_quantity *
                WEIGHT_CONVERSION[unit_conversion as keyof typeof WEIGHT_CONVERSION])
                .toFixed(FIXED_POINT_DECIMAL_PLACES));
            // https://stackoverflow.com/a/41970976/20141003
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
            // This is for a workout tracker; nobody should even care about precision on the dumbells that they're lifting more than 0.01
        }

        return weight_in_units;
    };

}
