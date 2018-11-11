import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive, Input } from "@angular/core";

// created by Amit Baghel
export function greaterthanValidator(masterCtrlName: string): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {
      let masterCtrlValue=masterCtrlName
      if(isNaN(parseInt(masterCtrlName)))
        masterCtrlValue= control['parent'].value[masterCtrlName];
      return control && parseInt(control.value) > parseInt(masterCtrlValue) ? {'greaterthan':true} : null;
    };
  }

  @Directive({
    selector: '[greaterthan]',
    providers: [{provide: NG_VALIDATORS, useExisting: GreaterThanValidatorDirective, multi: true}]
  })
  export class GreaterThanValidatorDirective implements Validator {
    @Input('greaterthan') greaterthan: string;
   
    validate(control: AbstractControl): {[key: string]: any} | null {
      return this.greaterthan ? greaterthanValidator(this.greaterthan)(control): null;
    }
  }