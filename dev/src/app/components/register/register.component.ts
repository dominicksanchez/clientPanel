import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	email:string;
	password:string;

	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		public authService: AuthService,
		public route: Router,
		public flashMessagesService: FlashMessagesService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {

	}

	onSubmit() {
		this.authService.register(this.email, this.password)
		.then((res) => {
			this.toastr.success('New user was registered', 'Success');
			this.route.navigate(['/']);
		})
		.catch((err) => {
			this.toastr.error(err.message, 'Oops!');
		})
	}

}
