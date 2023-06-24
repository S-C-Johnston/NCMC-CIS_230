export enum WEIGHT_UNITS {
    Pounds = "LB",
    Kilograms = "KG"
}
enum WEIGHT_CONVERSION {
    KG_TO_LB = 2.204623,
    LB_TO_KG = 0.4535924
}

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
        return new Weight(obj?.quantity, obj?.weight_unit)
    }

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
            weight_in_units = (this.my_quantity * WEIGHT_CONVERSION[unit_conversion as keyof typeof WEIGHT_CONVERSION]);
            // https://stackoverflow.com/a/41970976/20141003
        }

        return weight_in_units;
    };

}
