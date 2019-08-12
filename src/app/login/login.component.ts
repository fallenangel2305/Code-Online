import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	success = false;
	username = '';
	retUsername = '';
	password = '';
	retPassword = '';
	form: Observable<any[]>;

	constructor(private formBuilder: FormBuilder, public db: AngularFireDatabase) {
		this.form = db.list('form').valueChanges();
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});
	}

	onsubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}
		this.success = true;

		console.log(this.username);
		console.log(this.password);
	}
}
