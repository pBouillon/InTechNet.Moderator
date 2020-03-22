import { AbstractControl } from '@angular/forms';

export function ContainsDigit(control: AbstractControl) {
  
    const value = control.value as string;
    console.log('digit', value)

    const hasDigit = value.match('[0-9]');

    if (!hasDigit) {
        return { containsDigit: true };
    }

    return null;
}