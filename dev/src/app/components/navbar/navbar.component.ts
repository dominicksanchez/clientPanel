import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { SettingsService } from '../../services/settings.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	isLoggedIn: boolean;
	loggedInUser: string;
	showRegister: boolean;
	showFirst: boolean;

	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		private authService: AuthService,
		private router: Router,
		private flashMessagesService: FlashMessagesService,
		private settingsService: SettingsService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	ngOnInit() {
		this.authService.getAuth().subscribe(auth => {
			if(auth) {
				this.isLoggedIn = true;
				this.loggedInUser = auth.email
			}else {
				this.isLoggedIn = false;
			}

			this.showRegister = this.settingsService.getSettings().allowRegistration;
		});

		this.showFirst = true;
	}

	onLogoutClick() {
		this.authService.logout();
		this.toastr.success('You are logged out', 'Success');
		this.router.navigate(['/login']);
	}
}
