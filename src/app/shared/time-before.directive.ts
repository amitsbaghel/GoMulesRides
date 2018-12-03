import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive, Input } from "@angular/core";
import { isNull } from "@angular/compiler/src/output/output_ast";

// created by Amit Baghel
export function timebeforeValidator(dateCtrl:string): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value)
            return null
            
        var date= control['parent'].value[dateCtrl].split('/');
        var fullDate=date[2]+"-"+date[0]+"-"+date[1]+"T"+control.value.split('T')[1];
        var dateVar=new Date(fullDate)
        // let hour=parseInt(control.value.split(':')[0])
        return dateVar <= new Date() ? {'timebefore':true} : null;
    };
}


@Directive({
    selector: '[timebefore]',
    providers: [{ provide: NG_VALIDATORS, useExisting: TimeBeforeValidatorDirective, multi: true }]
})
export class TimeBeforeValidatorDirective implements Validator {
    @Input('timebefore') timebefore: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return timebeforeValidator(this.timebefore)(control);
    }
}