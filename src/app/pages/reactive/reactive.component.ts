import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
	selector: 'app-reactive',
	templateUrl: './reactive.component.html',
	styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

	webForm!: FormGroup;

	constructor(private _fb: FormBuilder, private _validations: ValidationsService) {

		this.createWebForm();
		this.loadData();
		this.createListeners();
	}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.

	}

	get nombreInvalid() {
		return this.webForm.get('nombre')?.invalid && this.webForm.get('nombre')?.touched;
	}

	get apellidoInvalid() {
		return this.webForm.get('apellido')?.invalid && this.webForm.get('apellido')?.touched;
	}

	get correoInvalid() {
		return this.webForm.get('correo')?.invalid && this.webForm.get('correo')?.touched;
	}

	get ciudadInvalid() {
		return this.webForm.get('domicilio.ciudad')?.invalid && this.webForm.get('domicilio.ciudad')?.touched;
	}

	get estadoInvalid() {
		return this.webForm.get('domicilio.estado')?.invalid && this.webForm.get('domicilio.estado')?.touched;
	}

	get usuarioInvalid() {
		return this.webForm.get('usuario')?.invalid && this.webForm.get('usuario')?.touched;
	}

	get password1Invalid() {
		return this.webForm.get('password1')?.invalid && this.webForm.get('password1')?.touched;
	}

	get password2Invalid() {
		const password1 = this.webForm.get('password1')?.value;
		const password2 = this.webForm.get('password2')?.value;

		return (password1 === password2) ? false : true;
	}

	get hobbies() {
		return this.webForm.get('hobbies') as FormArray;
	}

	createWebForm() {

		this.webForm = this._fb.group({
			nombre: ['', [Validators.required, Validators.minLength(2)]],
			apellido: ['', [Validators.required, Validators.minLength(2), this._validations.noTrejo]],
			correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.email]],
			usuario: ['', , this._validations.userExists],
			password1: ['', [Validators.required, Validators.minLength(2)]],
			password2: ['', [Validators.required]],
			domicilio: this._fb.group({
				ciudad: ['', [Validators.required]],
				estado: ['', [Validators.required]],
			}),
			hobbies: this._fb.array([])
		}, {
			validators: this._validations.differentPasswords('password1', 'password2')
		} as AbstractControlOptions);
	}

	loadData() {

		// this.webForm.setValue({
		this.webForm.reset({

			nombre: 'Juan Ma',
			apellido: 'Trejos',
			correo: 'juanma@domain.com',
			password1: 'qwer',
			password2: 'qwer',
			domicilio: {
				ciudad: 'C. Izcalli',
				estado: 'Mexico City'
			}
		});

		['Music', 'Movies', 'fitness'].forEach((value) => this.hobbies.push(this._fb.control(value, Validators.required)));
	}

	createListeners() {

		this.webForm.valueChanges.subscribe(value => { console.log(value); });

		this.webForm.statusChanges.subscribe(status => console.log(status));

		this.webForm.get('nombre')?.valueChanges.subscribe(console.log);
	}

	save() {

		console.log(this.webForm);
		console.log(this.webForm.value);

		if (this.webForm.invalid) {

			console.log('when invalid');
			console.log(this.webForm.status);
			Object.values(this.webForm.controls).forEach(control => {

				if (control instanceof FormGroup) {
					Object.values(control.controls).forEach(control => control.markAsTouched());
				}
				else {
					control.markAsTouched();
				}
			});

			return;
		}

		console.log('when valid');
		console.log(this.webForm.status);
		this.webForm.reset({
			nombre: '',
			apellido: '',
			correo: '',
			domicilio: {
				ciudad: '',
				estado: ''
			}
		});

		this.hobbies.clear();
	}

	addHobby() {
		console.log('add');
		this.hobbies.push(this._fb.control('', Validators.required));
	}

	deleteHobby(idx: number) {
		this.hobbies.removeAt(idx);
	}
}
