import { AbstractControl } from '@angular/forms';

export function ContainsUppercase(control: AbstractControl) {
  
    const value = control.value as string;
    console.log('upper', value)

    const hasUppercase = value.match('[A-Z]');


    if (!hasUppercase) {
        return { containsUppercase: true };
    }

    return null;
}