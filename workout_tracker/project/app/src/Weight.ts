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
        quantity?: number,
        weight_unit?: WEIGHT_UNITS
    ) {
        this.my_quantity = quantity ??= 0;
        this.my_weight_unit = weight_unit ??= WEIGHT_UNITS.Kilograms;
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
        this.my_weight_unit = weight_unit;
    }

    in_units(weight_unit: WEIGHT_UNITS): number {
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
    }

}
