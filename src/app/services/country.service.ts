import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CountryService {

	constructor(private _http: HttpClient) {
	}

	getCountries() {

		return this._http.get('https://restcountries.com/v3.1/all')
			.pipe(
				map((response: any) => {
					return response
						.map((country: any) => {
							return {
								code: country.cca3,
								name:  `${country.name.common} - ( ${country.cca3} ) - ${country.name.official}`
							}
						})
				})
			);
	}
}
