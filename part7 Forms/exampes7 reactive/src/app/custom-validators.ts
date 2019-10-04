import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
    static invalidProjectName(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Test') {
            return { 'invalidProjectName': true }
        } else {
            return null;
        }
    }

    static asyncInvalidEmail(control: FormControl): Promise<any> | Observable<any> {

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Test@wp.pl') {
                    resolve({ 'invalidEmail': true });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
        return promise;
    }
}