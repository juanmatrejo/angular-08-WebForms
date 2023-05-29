import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
	selector: 'app-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

	userModel = {
		nombre: '',
		apellido: '',
		correo: '',
		pais: '',
		genero: ''
	};

	countries: any[] = [];

	constructor(private _countryService: CountryService) {
	}

	ngOnInit() {
		this._countryService.getCountries().subscribe(countries => {

			this.countries = countries;
			this.countries.sort((a: any, b: any): number => a.name.localeCompare(b.name));
			// this.countries.sort((a: any, b: any): number => a.name.charCodeAt(0) - b.name.charCodeAt(0));

			this.countries.unshift({
				code: '',
				name: '-- Select an option --'
			});

			console.log(this.countries);
		});
	}

	save(webForm: NgForm) {

		if (webForm.invalid) {

			Object.values(webForm.controls).forEach(control => {
				control.markAsTouched();
			});

			return;
		}

		console.log(webForm);
		console.log(webForm.value);
	}
}
