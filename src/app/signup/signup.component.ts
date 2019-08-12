import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup;
	router: Router;
	submitted = false;
	success = false;
	ret = false;
	email = '';
	username = '';
	password = '';
	form: Observable<any[]>;

	constructor(private formBuilder: FormBuilder, public db: AngularFireDatabase, public location: Location) {
		this.form = db.list('form').valueChanges();
	}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			email: [ '', Validators.required ],
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});
	}

	onsubmit() {
		this.submitted = true;

		if (this.signupForm.invalid) {
			console.log('invalid');
			return;
		}
		this.success = true;

		this.db.list('User').push({ email: this.email });
		this.email = '';

		this.db.list('User').push({ username: this.username });
		this.username = '';

		this.db.list('User').push({ password: this.password });
		this.password = '';
		this.location.back();
	}
}
