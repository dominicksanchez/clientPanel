import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email:string;
	password:string;
	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		public flashMessagesService: FlashMessagesService,
		public router: Router,
		public authService: AuthService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
	}

	onSubmit() {
		this.authService.login(this.email, this.password)
		.then(() => {
			this.toastr.success('You are logged in', 'Success');
			this.router.navigate(['/']);
		})
		.catch((err) => {
			this.toastr.error(err.message, 'Oops!');
		});
	}
}
