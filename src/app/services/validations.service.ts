import { Injectable, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
	[s: string]: boolean
}

@Injectable({
	providedIn: 'root'
})
export class ValidationsService {

	constructor() { }

	noTrejo(control: FormControl): ErrorValidate | null {

		if (control.value?.toLowerCase() === 'trejo') {
			return {
				noTrejo: true
			}
		}

		return null
	}

	differentPasswords(pass1Name: string, pass2Name: string) {

		return (formGroup: FormGroup) => {

			const pass1Control = formGroup.controls[pass1Name];
			const pass2Control = formGroup.controls[pass2Name];

			if (pass1Control.value === pass2Control.value) {
				pass2Control.setErrors(null);
			}
			else {
				pass2Control.setErrors({ differentPasswords: true });
			}
		}
	}

	userExists(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> | any {

		if (!control.value) {

			return Promise.resolve(null);
		}

		return new Promise((resolve, reject) => {

			setTimeout(() => {

				if (control.value === 'strider') {

					resolve({ exists: true });
				}
				else {

					resolve(null);
				}
			}, 2000);
		});
	}
}
