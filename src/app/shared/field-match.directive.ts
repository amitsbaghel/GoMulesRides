import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from "@angular/forms";

// created by Amit Baghel
export function fieldmatchValidator(masterCtrlName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.parent ===undefined)
        return null;
      const masterCtrl = control.parent.get(masterCtrlName);
      return control && masterCtrl && control.value !== masterCtrl.value ? {'mismatched':true} : null;
    };
  }