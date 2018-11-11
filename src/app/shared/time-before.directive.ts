import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive, Input } from "@angular/core";
import { isNull } from "@angular/compiler/src/output/output_ast";

// created by Amit Baghel
export function timebeforeValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value)
            return null
        let hour=parseInt(control.value.split(':')[0])
        return hour <= new Date().getHours() ? {'timebefore':true} : null;
    };
}

@Directive({
    selector: '[timebefore]',
    providers: [{ provide: NG_VALIDATORS, useExisting: TimeBeforeValidatorDirective, multi: true }]
})
export class TimeBeforeValidatorDirective implements Validator {
    // @Input('timebefore') timebefore: number;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return timebeforeValidator()(control);
    }
}