import { AbstractControl } from '@angular/forms';

export function ContainsLowercase(control: AbstractControl) {
  
    const value = control.value as string;
    console.log('lower', value)

    const hasLowercase = value.match('[a-z]');


    if (!hasLowercase) {
        return { containsLowercase: true };
    }

    return null;
}